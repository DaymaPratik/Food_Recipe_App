/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import MealsOfSameCategoiresPage from './Pages/MealsOfSameCategoiresPage'
import DetailsPage from './Pages/DetailsPage'
import  { LikedRecipesContext } from './context/LikedRecipesContextProvider'
import Navbar from './Componenets/Navbar'
import SearchBoxResultPage from './Pages/SearchBoxResultPage'
import LikedRecipesListPage from './Pages/LikedRecipesListPage'
import SideBar from './Componenets/SideBar'


function AppRouter() {
  const{isSideBarVisible,setIsSideBarVisible}=useContext(LikedRecipesContext);
 
  return (
 
     <BrowserRouter>
     <main className='w-full h-fit relative'>
     <Navbar/>
    {isSideBarVisible && <SideBar/>}
   <Routes>
       <Route path='/' element={<HomePage/>}/>
       <Route path="/meals/category/:categoryType" element={<MealsOfSameCategoiresPage/>}/>
       <Route  path='/meals/category/details/:mealId' element={<DetailsPage/>}/>
       <Route path='/meals/likedRecipes' element={<LikedRecipesListPage/>}/>
       <Route path='/meal/category/:searchInput' element={<SearchBoxResultPage/>}/>
   </Routes>
     </main>
   </BrowserRouter>
  
  )
}

export default AppRouter