import { JSX } from "react";
import { NavLink } from "react-router-dom";


type SidebarProps={
    option:{
        to: string;
        icon: string;
        title: string;
        description: string;
        component: JSX.Element;
    }
    setVisible?:(visible:boolean)=>void
    visible?:boolean
}

export default function SideBarMenuItem({option,setVisible=()=>false,visible}:SidebarProps) {
  //hola que tal

  
  return (
    <>
      <NavLink
        key={option.to}
        to={option.to}
        onClick={()=> setVisible( !visible) }
        className={({isActive}) =>
          isActive
            ? `flex justify-center items-center bg-gray-800 rounded-md transition-colors p-2`
            : `flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors`
        }
      >
        <i className={`${option.icon} text-2xl mr-4 text-indigo-400`} />
        <div className="flex flex-col flex-grow">
          <span className="text-white text-sm sm:text-lg font-semibold">
            {option.title}
          </span>
          <span className="text-gray-400 text-sm">{option.description}</span>
        </div>
      </NavLink>
    </>
  );
}
