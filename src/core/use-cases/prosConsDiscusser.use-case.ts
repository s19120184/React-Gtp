
import { ProsConsDiscusserResponse } from "../../interfaces/prosConsDiscusser.interface"



export const prosConsDiscusserUseCase =async (prompt:string)=>  {

    try {
        const resp= await fetch(`${import.meta.env.VITE_GTP_API}/pros-cons-discusser`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({prompt})
            })

            if(!resp.ok) throw new Error("No se pudo realizar la correccion")

            const data = await resp.json() as ProsConsDiscusserResponse

        
            return{
                ok:true,
                ...data
            }
        
    } catch (error) {
        console.log(error)
        return {
            ok:false, 
            role:"",
            content:""
        }
    }

}