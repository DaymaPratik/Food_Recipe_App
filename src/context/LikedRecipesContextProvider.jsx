/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState } from 'react'
// eslint-disable-next-line react-refresh/only-export-components
export const LikedRecipesContext=createContext();
function LikedRecipesContextProvider({children}) {
    const [likedRecipesArray,setLikedRecipesArray]=useState(()=>{
      const localData=JSON.parse(localStorage.getItem('liked-recipes-list'))
      return localData  || []
    });
    const [searchedInput,setSearchedInput]=useState("");
    const [notValidInput,setNotValidInput]=useState(false);
    const [isSideBarVisible,setIsSideBarVisible]=useState(false);
    const showSideBarFunction=()=>{
      setIsSideBarVisible(!isSideBarVisible);
    }
  return (
    <LikedRecipesContext.Provider value={{notValidInput,setNotValidInput,
    likedRecipesArray,setLikedRecipesArray,searchedInput,setSearchedInput,isSideBarVisible,showSideBarFunction,setIsSideBarVisible}}>
        {children}
    </LikedRecipesContext.Provider>
  )
}

export default LikedRecipesContextProvider