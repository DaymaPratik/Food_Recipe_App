/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LikedRecipesContext } from '../context/LikedRecipesContextProvider';
import SameCategoryCover from '../Componenets/SameCategoryCover';

function MealsOfSameCategoiresPage() {
  const [mealsOfSameCategoryArray,setMealsOfSameCategoryArray]=useState([]);
  const [showGetDetailsButton,setShowGetDetailsButton]=useState(false);
  const navigate=useNavigate();
  const [index,setIndex]=useState(null);
  const {categoryType}=useParams();
  const { setIsSideBarVisible,setSearchedInput,likedRecipesArray,setLikedRecipesArray}=useContext(LikedRecipesContext);
   useEffect(()=>{ setIsSideBarVisible(false)},[])

  const addToLikedRecipiesFunction=(item)=>{
    setLikedRecipesArray([...likedRecipesArray,item]);
   localStorage.setItem('liked-recipes-list',JSON.stringify(likedRecipesArray));
}
  useEffect(()=>{
    localStorage.setItem('liked-recipes-list',JSON.stringify(likedRecipesArray));
    setSearchedInput("");
       const getMealsOfSameCategoryFunction=async()=>{
        try {
          const mealsOfSameCategoryData=await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryType}`)
          setMealsOfSameCategoryArray(mealsOfSameCategoryData.data.meals);
        } catch (error) {
          console.log("Error while getting the meals of same category" ,error);
        }
       }
       
       getMealsOfSameCategoryFunction();
  },[likedRecipesArray])
  
  return (
    <main>
      {/* COVER SECTION  */}
      <SameCategoryCover categoryType={categoryType}/>
      {/* MEALS OF SAME CTAEGORIES BOX  */}
      <main className='h-fit w-full md:w-[95vw] mx-auto  text-center '>
      <h2 className='text-[20px] xs:text-[25px] md:text-[30px] lg:text-[35px] relative bg-gradient-to-r
         from-[#ff0000] to-[#000642] bg-clip-text  font-black
     text-transparent uppercase h-fit text-center py-3 w-[100%] tracking-[3px] md:tracking-[7px] my-5'>Meals related to {categoryType} Category</h2>
      <section className='h-full w-full grid grid-cols-1  min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 
         lg:gap-10 p-5 lg:p-10'>
       {mealsOfSameCategoryArray.map((item,idx)=>{
            return (
                       
                  <div  key={idx} className='text-[18px] hover:underline flex flex-col justify-between items-center
                                      shadow-[0px_0px_2px_1px_black] hover:scale-[103%] transition ease-in duration-150 py-4 min-h-full h-fit   
                                      font-semibold hover:shadow-[0px_0px_10px_3px_red] rounded-[5px]' >
                   
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
                           <div className='flex justify-center items-center absolute w-full h-full 
                            bg-[#b733338a] z-20'>
                           <p className='w-fit p-2 text-white'>Get Details</p>
                           </div>
                           }
                             
                                   <img src={item.strMealThumb} alt=""
                                    className='h-[100%] w-[250px] mx-auto py-3 '/>
                                   <h4 className='py-2 text-[15px] xs:text-[18px] lg:text-[22px]'>{item.strMeal}</h4>
                             
                           
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
    </main>
  )
}

export default MealsOfSameCategoiresPage