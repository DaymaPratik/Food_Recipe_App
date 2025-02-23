/* eslint-disable no-unused-vars */
import React ,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './AppRouter.jsx'
import LikedRecipesContextProvider from './context/LikedRecipesContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <LikedRecipesContextProvider>
    <AppRouter />
    </LikedRecipesContextProvider>
  </StrictMode>,
)
