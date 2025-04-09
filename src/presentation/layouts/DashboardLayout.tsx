
import { Outlet } from "react-router-dom";
import { menuRoutes } from "../router/router";
import SideBarMenuItem from "../components/sidebar/SideBarMenuItem";
import MenuHamburgesa from "../components/sidebar/HamburgerMenuItem";
import { useWindowSize } from "../hooks/UseWindowSise";


export const DashboardLayout = () => {

  
  const {width}= useWindowSize()


  return (
    <main className="flex flex-col gap-1 mt-0 sm:flex-row ms:items-center md:mt-7 w-96 sm:w-full">
      
      {width < 450  && (<MenuHamburgesa />)}
     
      <nav className="hidden sm:flex flex-col ml-5   w-[370px] min-h-[calc(100vh-3.0rem)] bg-gray-900 bg-opacity-10 p-5 rounded-3xl">
        <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 bg-clip-text text-transparent">
          ReactGPT<span className="text-indigo-500">.</span>
        </h1>
        <span className="text-xl">Bienvenido</span>

        <div className="border-gray-700 border my-3" />


           {/* Opciones del menú */}
        {width > 450 
              && (menuRoutes.map(option =>(
                <SideBarMenuItem key={option.to} option={option}/>
           ))) }

       
      </nav>

      <section className={ ` ${width <380 ? 'mx-1' : 'mx-6'}  sm:mx-20 flex flex-col w-11/12 md:w-full h-[calc(100vh-50px)]  bg-gray-900 bg-opacity-10 p-5 rounded-3xl `}>
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-1">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};