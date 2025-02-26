/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import HomeCover from '../Componenets/HomeCover'
import HomeMealsCategoriesListBox from '../Componenets/HomeMealsCategoriesListBox'
import { LikedRecipesContext } from '../context/LikedRecipesContextProvider'

function HomePage() {
  const{setIsSideBarVisible}=useContext(LikedRecipesContext);
  useEffect(()=>{
    window.scrollTo(0, 0);
    setIsSideBarVisible(false)}
    ,[])
  return (
   <main className='h-fit relative w-full box-border'>
     
   <HomeCover/>
   <HomeMealsCategoriesListBox/>
   </main>
  )
}

export default HomePage