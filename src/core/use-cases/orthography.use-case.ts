
import type { OrthographyRespone } from "../../interfaces/orthography.interface"



export const orthographyUseCase =async (prompt:string)=>  {

    try {
        const resp= await fetch(`${import.meta.env.VITE_GTP_API}/orthography-check`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({prompt})
            })

            if(!resp.ok) throw new Error("No se pudo realizar la correccion")

            const data = await resp.json() as OrthographyRespone

        
            return{
                ok:true,
                ...data
            }
        
    } catch (error) {
        console.log(error)
        return {
            ok:false, 
            userScore:0,
            errores:[],
            mensaje:'No se pudo realizar la correccion'
        }
    }

}