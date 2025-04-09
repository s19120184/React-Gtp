import "./HamburgerMenuItem.css";

import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";

import { menuRoutes } from "../../router/router";
import SideBarMenuItem from "./SideBarMenuItem";




export default function MenuHamburgesa() {
  
   const [isvisible, setIsVisible] = useState(false);
   
    const handleSetVisible=(visible:boolean)=>{
         setIsVisible(visible)
    }

  return (
    <div className="menu">
      <div className="menu__hamburgesa">
        <div className="menu__icon">
          <IoMenuSharp
            className="menu__icono-hambuerger"
            onClick={() => handleSetVisible(!isvisible)}
          />
        </div>
        <nav className={`menu__contenido  ${isvisible && "desplegar"}`}>
          {/* Opciones del menú */}
          <div className="navegacion-principal">
          {menuRoutes.map((option) => (
            <SideBarMenuItem key={option.to} option={option} visible={isvisible} setVisible={handleSetVisible}/>
          ))}
          </div>
          
        </nav>
      </div>
    </div>
  );
}
