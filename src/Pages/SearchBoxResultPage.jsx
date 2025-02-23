/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { LikedRecipesContext } from '../context/LikedRecipesContextProvider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SearchedPageCover from '../Componenets/SearchedPageCover';

function SearchBoxResultPage() {
    const {setSearchedInput,likedRecipesArray,setLikedRecipesArray,setIsSideBarVisible}=useContext(LikedRecipesContext);
    const [searchedResultsArray,setSearchedResultsArray]=useState([]);
    const [showGetDetailsButton,setShowGetDetailsButton]=useState(false);
    const [index,setIndex]=useState(null);
    const navigate=useNavigate();
    const {searchInput}=useParams();
     useEffect(()=>{ setIsSideBarVisible(false)},[])
    useEffect(()=>{
       const getSerachEdResultFunction=async()=>{
        try {
            const searchedResult=await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`) 
            setSearchedResultsArray(searchedResult?.data?.meals);
            setSearchedInput('');
        } catch (error) {
         setSearchedInput([]);
          console.log("Error in dispalying search input results",error);
        }
       }
       getSerachEdResultFunction();
    },[searchInput])

    const addToLikedRecipiesFunction=(item)=>{
        setLikedRecipesArray([...likedRecipesArray,item]);
       localStorage.setItem('liked-recipes-list',JSON.stringify(likedRecipesArray));
    }
  return (
    <>
    <SearchedPageCover searchedResultsArray={searchedResultsArray} setSearchedResultsArray={setSearchedResultsArray}/>
    {
     !searchedResultsArray
     ?
    <main className="h-screen flex flex-col w-full box-border justify-center items-center text-center text-[30px]">
    <p className="text-red-500 font-semibold">😔 Oops! No results found for {searchInput}</p>
    <p className="text-lg text-gray-700 mt-3">Try searching for something else or explore popular categories below! 🍕🥗</p>

    {/* Suggested Categories */}
    <div className="mt-6 flex gap-4 flex-wrap items-center justify-center">
      {["Chicken", "Vegan", "Pasta", "Dessert","Pork","Lamb","Vegetarian","Goat","Breakfast"].map((category) => (
        <Link
          key={category}
          to={`/meals/category/${category.toLowerCase()}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full transition text-lg"
        >
          {category} Recipes
        </Link>
      ))}
    </div>
  </main>
     :
     <main className='h-fit w-full md:w-[95vw]'>
     <h3 className='text-[20px] xs:text-[25px] md:text-[30px] lg:text-[35px] relative bg-gradient-to-r
         from-[#ff0000] to-[#000642] bg-clip-text  font-black
     text-transparent uppercase h-fit text-center py-3 w-[100%] tracking-[3px] md:tracking-[7px] my-5'>{`Meals Releated to the ${searchInput}`}</h3>
     <section className='h-full w-full grid grid-cols-1  min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 
         lg:gap-10 p-5 lg:p-10' >
         {searchedResultsArray?.map((item,idx)=>{
              return (
                 <div  key={idx} className='text-[18px] hover:underline flex flex-col justify-between items-center
                                         hover:shadow-[0px_0px_10px_3px_black] hover:scale-[103%] transition ease-in duration-150 py-4 h-fit min-h-[350px] 
                                         font-semibold shadow-[0px_0px_3px_1px_black] rounded-[5px]' >
                                    
                                   <Link to={`/meals/category/details/${item.idMeal}`}
                                    className='relative  w-full block h-[95%] hover:text-red-500'
                                             onMouseEnter={()=>{
                                               setShowGetDetailsButton(true);
                                               setIndex(idx)
                                             }}
                                             onMouseLeave={()=>{setShowGetDetailsButton(false)}}
                                            >
                                            {
                                            (showGetDetailsButton && idx===index)
                                            && 
                                            <div className='absolute h-full flex flex-col  justify-center items-center 
                                                     w-full bg-[#09090990] text-white'>
                                            <p className='w-fit p-2 text-white '>Get Details</p>
                                            </div>
                                            }
                                              
                                                    <img src={item.strMealThumb} alt=""
                                                     className='h-[100%] w-[250px] mx-auto py-3 '/>
                                                    <h4 className='py-2 text-[15px] xs:text-[18px] lg:text-[22px] text-center'>{item.strMeal}</h4>
                                              
                                            
                                            </Link>
                                    <div className='hover:bg-red-500 rounded-[15px] border-2 border-red-500 hover:text-white transition duration-150
                                    ease-in-out block w-fit px-6 mt-4 py-2 mx-auto h-[5%]'
                                    onClick={()=>{addToLikedRecipiesFunction(item)}}
                                    >
                                     <button>Like</button>
                                 </div>
                                 
                           </div>
                
              )
         })}
     </section>
     </main> 

    }
    </>
  )
}

export default SearchBoxResultPage