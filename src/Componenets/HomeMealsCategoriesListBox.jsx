/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function HomeMealsCategoriesListBox() {
    const [categories,setCategories]=useState([]);
      const [showGetDetailsButton,setShowGetDetailsButton]=useState(false)
      const [index,setIndex]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{           
        const getMealsByCategoriesFunction=async()=>{
            try {
                const mealsData=await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
                setCategories(mealsData.data.categories)
            } catch (error) {
                console.log("Error while getting the meals data of the same category",error);
            }
        }
        getMealsByCategoriesFunction();
       
    },[])
  return (
        <main className='h-fit w-full md:w-[95vw] box-border mx-auto text-center my-10'>
        <h1 className='text-[20px] xs:text-[25px] md:text-[30px] lg:text-[35px] relative bg-gradient-to-r
         from-[#ff0000] to-[#000642] bg-clip-text  font-black
     text-transparent uppercase h-fit text-center py-3 w-[100%] tracking-[3px] md:tracking-[7px] my-5'>
      Find The Meal Recipe From The Given Categories</h1>
         <section className='h-full w-full grid  grid-cols-1 min-[350px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 
         sm:gap-10 p-5 sm:p-10'>
       {categories.map((item,idx)=>{
            return (
            <div  key={idx} className='text-[20px] font-semibold rounded-[15px] cursor-pointer 
            shadow-[0px_0px_10px_1px_black]  hover:shadow-[0px_0px_10px_3px_#14262196] 
            hover:scale-[103%] transition ease-in duration-150  h-fit w-[95%] mx-auto' >
                <Link to={`/meals/category/${item.strCategory}`}
                 className='relative w-full block h-[100%] hover:text-red-500'
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
                 bg-[#bdfbea96] z-20 text-black rounded-[15px] '>
                <p className='w-fit p-2 '>Get Similar Dishes</p>
                </div>
                }
                
                 
                  <img src={item.strCategoryThumb} alt="" className='h-[100%] w-[250px] mx-auto py-3 '/>
                  <h4 className='py-2'>{item.strCategory}</h4>
                 
                </Link>
                
            </div>

               
            )
       })}
    </section>
         </main>
  )
}

export default HomeMealsCategoriesListBox