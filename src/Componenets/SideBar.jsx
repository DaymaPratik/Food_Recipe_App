/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LikedRecipesContext } from '../context/LikedRecipesContextProvider';
import { FaSearch } from "react-icons/fa";

function SideBar() {
    const {setNotValidInput}=useContext(LikedRecipesContext);
    const [navbarSearchedInput,setNavbarSearchedInput]=useState("");
    const navigate=useNavigate();
  
    const submitInputForm=(e)=>{
      e.preventDefault();
      if(navbarSearchedInput){
        navigate(`/meal/category/${navbarSearchedInput}`);
        setNavbarSearchedInput('');
     }
     else{
         setNotValidInput(true);
     }
  }
  return (
    <section className='w-fit h-fit fixed top-20 right-3 rounded-[5px] shadow-[0px_0px_30px_1px_black] z-100 bg-[#100f0fc4] p-5'>
         <div className='flex flex-col  justify-center gap-5  items-center text-[12px] xs:text-[15px] sm:text-[20px]'>
            <Link to={'/meals/likedRecipes'} className='mx-1 lg:mx-3'>
            <button className='bg-blue-600 rounded-[5px] cursor-pointer hover:bg-blue-800 transition ease-in duration-150 text-white font-semibold px-5 py-2 '>Liked Recipes</button>
            </Link>
            <Link to={'/'} className='mx-1 lg:mx-3'>
            <button className='bg-blue-600 rounded-[5px] hover:bg-blue-800 cursor-pointer transition ease-in duration-150 text-white font-semibold px-5 py-2  '>Home</button>
            </Link>
            <form action="" className='flex items-center justify-center text-white w-[100%]'>
            <input type="text"
             placeholder='Search for pasta, pizza, or desserts...' 
             className='p-2 bg-gradient-to-r from-[#57fff9e1] to-[#fc5d5dd4]  focus:outline-none text-black w-[100%] text-[13px] md:text-[17px] 
             rounded-l-[5px] border-none' 
             required
              value={navbarSearchedInput}
             onChange={(e)=>{setNavbarSearchedInput(e.target.value)}}
             />
           <button  className='bg-blue-600 hover:bg-blue-800 transition ease-in cursor-pointer duration-150 px-3 py-2 text-white rounded-r-[5px]
            border-none'
             onClick={(e)=>{submitInputForm(e)}}>
             <span className='max-lg:hidden'> Search</span>
             <span className='lg:hidden h-full text-[22px] md:text-[25px]'><FaSearch/></span>
            </button>
        </form>
        </div>
    </section>
  )
}

export default SideBar