/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { LikedRecipesContext } from "../context/LikedRecipesContextProvider";
import { Link } from 'react-router-dom';
import HomeCover from '../Componenets/HomeCover';
import LikedPageCover from '../Componenets/LikedPageCover';

function LikedRecipesListPage() {
  const {likedRecipesArray,setLikedRecipesArray,setIsSideBarVisible}=useContext(LikedRecipesContext);
  const [showGetDetailsButton,setShowGetDetailsButton]=useState(false);
  const [index,setIndex]=useState(null);
    useEffect(()=>{setIsSideBarVisible(false)},[])
  const deleteLikedRecipiesFunction=(index)=>{
   const newArray=likedRecipesArray.filter((item,idx)=>{
        return idx != index;
   })
   setLikedRecipesArray(newArray);
  }
  useEffect(()=>{
   localStorage.setItem('liked-recipes-list',JSON.stringify(likedRecipesArray));
  },[likedRecipesArray])
  return (
   <main className='w-full'>
   <LikedPageCover/>

     <main className='h-fit w-full md:w-[95vw]mx-auto text-center '>
      <h2 className='text-[20px] xs:text-[25px] md:text-[30px] lg:text-[35px] relative bg-gradient-to-r
         from-[#ff0000] to-[#000642] bg-clip-text  font-black
     text-transparent uppercase h-fit text-center py-3 w-[100%] tracking-[3px] md:tracking-[7px] my-5'>Your Liked Meals List</h2>
      <section className='h-full w-full grid grid-cols-1  min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 
         sm:gap-10 p-5 sm:p-10'>
       {likedRecipesArray.map((item,idx)=>{
            return (   
                  <div  key={idx} className='text-[18px] hover:underline flex flex-col justify-between items-center
                                     shadow-[0px_0px_3px_1px_black] hover:scale-[103%] transition ease-in duration-150 py-4 h-fit min-h-[350px] 
                                      font-semibold  hover:shadow-[0px_0px_10px_3px_#f9f919]' >
                   
                  <Link to={`/meals/category/details/${item.idMeal}`}
                   className='relative  w-full block h-[95%] '
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
                            bg-[#f9f91c80] z-20'>
                           <p className='w-fit p-2 text-black'>Get Details</p>
                           </div>
                           }
                             
                                   <img src={item.strMealThumb} alt=""
                                    className='h-[100%] w-[250px] mx-auto py-3 '/>
                                   <h4 className='py-2'>{item.strMeal}</h4>
                             
                           
                           </Link>
                   <div className='hover:bg-red-500 rounded-[15px] border-2 border-red-500 hover:text-white transition duration-150
                   ease-in-out block w-fit px-6 mt-4 py-2 mx-auto h-[5%]'
                   onClick={()=>{deleteLikedRecipiesFunction(idx)}}
                   >
                    <button>Delete</button>
                </div>
                
          </div>
                 
            )
       })}
    </section>
    </main>
   </main>
  )
}

export default LikedRecipesListPage