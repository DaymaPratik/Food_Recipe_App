//  allcategories:https://www.themealdb.com/api/json/v1/1/categories.php;
//  searchedmeal:https://www.themealdb.com/api/json/v1/1/search.php?s=pizza
//  oncategoryclick: https://www.themealdb.com/api/json/v1/1/filter.php?c=Desser
//  onmealClick:https://www.themealdb.com/api/json/v1/1/lookup.php?i=52792

import axios from "axios";



export const getAllFoodCategories=async()=>{
    try {
    const data=await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
    return data;
    } catch (e) {
       return e; 
    }
}