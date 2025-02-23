/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { LikedRecipesContext } from '../context/LikedRecipesContextProvider'
import { useNavigate, useParams } from 'react-router-dom';

function SearchedPageCover({searchedResultsArray,setSearchedResultsArray}) {
  const {searchedInput,setSearchedInput,notValidInput,setNotValidInput}=useContext(LikedRecipesContext);
  const navigate=useNavigate();
  const {searchInput}=useParams();
  useEffect(()=>{
    setSearchedInput('');
    setNotValidInput(false);
  },[])
  const submitInputForm=(e)=>{
    e.preventDefault();
    if(searchedInput){
      navigate(`/meal/category/${searchedInput}`);
   }
   else{
       setNotValidInput(true);

   }
}
// {` ${searchedResultsArray ? 'min-h-screen' : 'min-h-[80vh] justify-end' } 
  return (
    <main className='min-h-[70vh] h-fit md:min-h-screen
    items-center relative w-full box-border top-0 bg-fixed flex flex-col justify-center 
    bg-[url("https://images.pexels.com/photos/7890015/pexels-photo-7890015.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")]
    bg-cover bg-center bg-no-repeat'>
      <section className='absolute h-full flex flex-col  justify-center items-center 
      w-full bg-[#130a0a70] text-white'>
       
        {searchedResultsArray 
        ?  
       <h3 className='text-[20px] sm:text-[25px] md:text-[30px] text-center lg:text-[35px] font-semibold py-3 '> 
       Getting Dishes Related to <span className='text-[#ff0000] font-bold'>{searchInput}</span> Dishes... 🍽️
      </h3>
      
        :
         <h3 className='text-[20px] sm:text-[25px] md:text-[30px] text-center lg:text-[35px] font-semibold py-3 text-center'>
           <span className='font-black text-red-500 '> 😔 Oops! </span>
          No results found for <span className='text-red-500 underline'>{searchInput}</span>. <br /><span className='text-yellow-400'> Try searching for another dish!</span>
        </h3>
        }
        
        <h5 className='text-[17px] text-center sm:text-[20px] md:text-[25px] lg:text-[30px] font-semibold py-3 '>
        {searchedResultsArray?.length > 0  
    ? `Find delicious meals tailored for ${searchInput} lovers!`
    : `Check your spelling or explore popular categories below! 🍕🥗🍛`
  }
        </h5>
        <form action="" className='text-[14px] xs:text-[18px] md:text-[25px] mx-auto gap-0  flex
         justify-center items-center w-[100%] xs:w-[90%] lg:w-[80%] p-2 md:p-5'>
            <input type="text"
             placeholder='Find Your Meal.....' 
             className='w-[85%] md:w-[70%] xl:w-[85%] p-2 bg-[#100f0fad] text-white rounded-l-[10px]
              focus:outline-none' 
             required
              value={searchedInput}
             onChange={(e)=>{setSearchedInput(e.target.value)}}
             />
           <button  className='bg-blue-400 px-5 py-2 text-white rounded-r-[10px]  cursor-pointer
            hover:bg-[#0000ff80] transition duration-150 ease-in-out '
             onClick={(e)=>{submitInputForm(e)}}>Search</button>
        </form>
        {
        notValidInput && 
        <p className='text-[30px] my-4 uppercase font-semibold bg-gradient-to-r text-center rounded-[5px] shadow-[0px_0px_10px_2px_black] from-[#fbfb35ed] 
           to-[#ff1f1ff0] p-2 px-4'>
            <span className='font-black text-[40px]'>Oops!</span> <br />
         --  Please Enter something to search  --
         </p>
       }
       </section>
    </main>
  )
}

export default SearchedPageCover
