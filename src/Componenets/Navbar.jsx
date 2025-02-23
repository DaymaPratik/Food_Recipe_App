/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { LikedRecipesContext } from '../context/LikedRecipesContextProvider'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { MdOutlineMenuBook } from "react-icons/md";

function Navbar() {
  const {isSideBarVisible,showSideBarFunction,setNotValidInput}=useContext(LikedRecipesContext);
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
    <nav className=' py-2 px-5 lg:px-10 flex justify-between items-center z-130 fixed bg-[#100f0fc4] w-full box-border'>
        <Link to={'/'}>
        <img src="https://png.pngtree.com/png-vector/20230224/ourmid/pngtree-kitchen-logo-png-image_6615814.png" alt="" className='w-[60px] md:hidden transition ease-in-out duration-100 rounded-[5px] 
         hover:shadow-[0px_0px_5px_1px_orange] p-2'/>
        <h2 className='font-semibold text-[24px] lg:text-[27px] text-white cursor-pointer hover:text-[#74fde8ec] transition ease-in-out duration-150 max-md:hidden'>Food Recipe App</h2>
        </Link>



        <div className='md:hidden text-[40px] text-[#20d6fa] cursor-pointer transition ease-in-out duration-100 rounded-[5px] 
         hover:shadow-[0px_0px_5px_1px_#20d6fa] p-2'
        onClick={showSideBarFunction}
        >
            <MdOutlineMenuBook/>
        </div>




        <div className='flex justify-center max-md:hidden w-[85%] md:w-[73%] 2xl:w-[50%]  items-center text-[12px] md:text-[15px] 
        lg:text-[18px]'>
            <Link to={'/meals/likedRecipes'} className='mx-1 lg:mx-3'>
            <button className='bg-blue-600 rounded-[5px] cursor-pointer hover:bg-blue-800 transition ease-in duration-150 text-white font-semibold px-5 py-2 '>Liked Recipes</button>
            </Link>
            <Link to={'/'} className='mx-1 lg:mx-3'>
            <button className='bg-blue-600 rounded-[5px] hover:bg-blue-800 cursor-pointer transition ease-in duration-150 text-white font-semibold px-5 py-2  '>Home</button>
            </Link>
            <form action="" className='flex items-center justify-center text-white w-[50%]'>
            <input type="text"
             placeholder='Search for pasta, pizza, or desserts...' 
             className='p-2 bg-gradient-to-r from-[#57fff9e1] to-[#fc5d5dd4]  focus:outline-none text-black w-[80%] text-[13px] md:text-[17px] 
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
    </nav>
  )
} 

export default Navbar