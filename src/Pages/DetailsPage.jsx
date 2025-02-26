/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LikedRecipesContext } from "../context/LikedRecipesContextProvider";
import AOS from "aos";
import "aos/dist/aos.css";



function DetailsPage() {
  const { mealId } = useParams();
  const [mealDetailObject, setMealDetailObject] = useState({});
 const{setIsSideBarVisible}=useContext(LikedRecipesContext);
  useEffect(() => {
    setIsSideBarVisible(false)
    window.scrollTo(0, 0);
    AOS.refresh();  
    AOS.init({
      duration: 500, 
      easing: "ease-in-out",
      once:false
    });   
    const getMealDetailsFunction = async () => {
      try {
        const mealDetailedData = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        console.log(mealDetailedData.data.meals[0]);
        setMealDetailObject(mealDetailedData.data.meals[0]);
      } catch (error) {
        console.log("Error while gettingthe meals details", error);
      }
    };
    getMealDetailsFunction();
  }, []);
  let mealIngiridientKeysArray = Object.keys(mealDetailObject);

  return (
    <main className="pt-15 font-mono overflow-x-hidden">
       <h1
            className="text-[30px] md:text-[40px] lg:text-[50px] relative bg-gradient-to-r from-[#ff0000] to-[#000642] bg-clip-text  font-black
     text-transparent uppercase h-fit text-center py-3 w-[100%] tracking-[3px]  md:tracking-[7px] my-5" data-aos="fade-left"
          >{mealDetailObject.strMeal}
        </h1>
      <section
        className="max-md:flex-col justify-center items-center flex relative w-[100%]"   
      >
        <section
          className={`bg-no-repeat my-5 w-[90%] sm:w-[60%] md:w-[45%] lg:w-[50%] flex justify-center items-center min-h-[50vh] md:min-h-[60vh]
             h-fit rounded-[40%]`}
          style={{
            backgroundImage: `url(${mealDetailObject.strMealThumb})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
          data-aos="fade-right"
        ></section>
    
        <section
        data-aos="fade-left"
        className="w-[90%] md:w-[55%] lg:w-[45%] bg-center bg-cover bg-fixed flex items-center
         justify-center rounded-[40px] relative mx-2  h-fit
           bg-[url('https://images.unsplash.com/photo-1530714457710-6bf1899c1d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
       
          <section
            className="text-[12px] xs:text-[15px] sm:text-[20px] h-fit lg:text-[25px] font-mono p-5 font-semibold bg-gradient-to-r text-center from-[#05213bd0] 
           to-[#190639e0] text-white  w-[90%] sm:w-fit rounded-[20px] my-5 shadow-[0px_0px_10px_1px_black] mx-auto  z-10"
          >
           
           {
            mealDetailObject.strCategory && 
            <p>
            <span
              className="text-transparent uppercase font-bold tracking-wider bg-gradient-to-r
               from-pink-500 to-violet-500 
          bg-clip-text border-b-4 px-5 rounded-[30px]"
            >
              - Meal Category -
            </span>
            <br />
            <span className="text-[20px] sm:text-[25px] bg-gradient-to-r from-[#fe4c4ce2] to-[#f1fdbe] bg-clip-text 
   text-transparent ">
              {mealDetailObject.strCategory}
            </span>
          </p>
           }
           {
            mealDetailObject.strTags &&
            <p>
              <span className="text-transparent uppercase font-bold tracking-widest bg-gradient-to-r from-pink-500
               to-violet-500 bg-clip-text border-b-4 px-5 border-[#f51479] rounded-[30px]">
              - Meal Tags -
              </span>
              <br />
              <span className="text-[20px] sm:text-[25px] bg-gradient-to-r from-[#fe4c4ce2] to-[#f1fdbe] bg-clip-text 
      text-transparent "> {mealDetailObject.strTags}</span>
            </p>
           
           }
           {
            mealDetailObject.strArea && 
            <p>
            <span className="text-transparent uppercase font-bold tracking-widest bg-gradient-to-r from-pink-500
             to-violet-500 bg-clip-text border-b-4 px-5 border-[#f51479e7] rounded-[30px]">
            - Meal Area -
            </span>
            <br />
            <span className="text-[20px] sm:text-[25px] bg-gradient-to-r from-[#fe4c4ce2] to-[#f1fdbe] bg-clip-text 
    text-transparent "> {mealDetailObject.strArea}</span>
          </p>
           }
            
            {
              mealDetailObject.strSource && 
              <p className="h-fit break-words">
              <span className="text-transparent uppercase font-bold tracking-widest bg-gradient-to-r from-pink-500
               to-violet-500 bg-clip-text border-b-4 px-5 border-[#f51479e7] rounded-[30px]">
               - Meal Source -
              </span>
              <br />
              <span className="text-[15px] bg-gradient-to-r from-[#fe4c4ce2] to-[#f1fdbe] bg-clip-text 
      text-transparent ">
        <a href={`${mealDetailObject.strSource}`} target="_blank" className="hover:text-white transition ease-in-out duration-150" >{mealDetailObject.strSource}</a>
      </span>
            </p>
            }
           
          </section>
        </section>
      </section>


      <section className="list-plus-heading-box">
         <h6  className="text-[15px] xs:text-[18px] md:text-[27px] lg:text-[35px] uppercase bg-gradient-to-r from-[#ff0000] to-[#000642] bg-clip-text 
     font-extrabold text-transparent text-center py-4 w-[100%] tracking-normal xs:tracking-[2px] md:tracking-[7px]"
     data-aos="fade-left">
      -- Ingidients List Given Below --</h6>
            <ul className="text-[10px] min-[350px]:text-[14px] md:text-[17px] lg:text-[20px] grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-5 p-5 lg:p-10 w-full  bg-center bg-cover bg-fixed
           bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-blurred-gradient-background-in-bright-rainbow-colors-colorful-rainbow-gradient-image_15684346.jpg')]
            h-full " data-aos="fade-left">
            
              {mealIngiridientKeysArray
                .filter((keyItem) => {
                  return (
                    keyItem.startsWith("strIngredient") &&
                    mealDetailObject[keyItem] &&
                    mealDetailObject[keyItem].trim !== ""
                  );
                })
                .map((keyItem, i) => {
                  const index = keyItem.replace("strIngredient", "");

                  const mealString = `${
                    mealDetailObject[`strMeasure${index}`]
                  } 
                   -
                  ${mealDetailObject[keyItem]}`;
                  return (
                    <li
                      key={i}
                      className="p-2 bg-gradient-to-r from-[#05213bd0] 
           to-[#190639e0] text-white
                       shadow-[0px_0px_3px_2px_black] tracking-wider font-semibold"
                       data-aos="fade-left"
                       data-aos-delay={i*100}
                       data-aos-duration={500 + i * 50}
                    >
                      {mealString}
                    </li>
                  );
                })}
            </ul>
         </section>




      <section className=" ">
        <h6 
        data-aos="fade-left"
        className="text-[15px] xs:text-[18px] md:text-[27px] lg:text-[35px] uppercase bg-gradient-to-r from-[#ff0000] to-[#000642] bg-clip-text 
     font-extrabold text-transparent text-center py-4 w-[100%] tracking-normal xs:tracking-[2px] md:tracking-[7px]">-- Instructions are Given Below --</h6>
      <p
      data-aos="fade-left"  
      className="text-[12px] xs:text-[15px] sm:text-[20px] md:text-[22px] lg:text-[24px] font-bold text-center p-2 xs:p-5 md:p-10 w-[100%]  bg-center bg-cover bg-fixed
           bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-blurred-gradient-background-in-bright-rainbow-colors-colorful-rainbow-gradient-image_15684346.jpg')]">
     <span className="bg-gradient-to-r  from-[#05213bd0] 
           to-[#190639e0] w-full h-full top-0 left-0 text-[white] tracking-wider">{mealDetailObject.strInstructions}</span>
      </p>
      </section>
    </main>
  );
}

export default DetailsPage;


