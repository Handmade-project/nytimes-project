import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import MoveHome from "../routeBtn/MoveHome";
import MoveClip from '../routeBtn/MoveClip';


export default function Header() {
  const [visible, setVisible] =  useState(false)

  function click (){
    setVisible(prev => !prev)
  }

return (

  <header className="bg-gray-50 flex items-center ">
  <div className="px-4 py-8 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
    <div>
      <div className="flex items-center justify-between flex-1 gap-8 sm:justify-end">   
        <div className="absolute top-5 right-10 flex gap-4">

<div className="relative inline-block text-left">

  <div onClick={click}> 
  <button type="button" >
  <FontAwesomeIcon icon={faBars} className="-mr-0.5 ml-0.5 h-5 w-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="currentColor" aria-hidden="true">
   <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
   </FontAwesomeIcon>   
   </button>
  </div>
  
  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
      <div>
      {visible &&
       (
      <nav>
      <span className="text-gray-700 hover:text-sky-400 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1"><MoveHome/></span>
      <span className="text-gray-700 hover:text-sky-400 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1"><MoveClip/></span>
      </nav>
      ) }
    </div>
  </div>

        </div>
        </div>
      </div>
    </div>

    <div className="mt-8" >
      <h1 className="text-5xl font-bold text-gray-900 sm:text-5xl font-headerFont">
        The Handmade Times
      </h1>
    </div>
    
<div className="flex justify-center"> 

  </div>
  </div>
</header>


)}
