

export const prosConsStreamUseCase =async (prompt:string)=>  {

    try {
        const resp= await fetch(`${import.meta.env.VITE_GTP_API}/pros-cons-discusser-stream`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({prompt})
                //todo: abortSignal
            })

            if(!resp.ok) throw new Error("No se pudo realizar la Comparacion")

            const reader = resp.body?.getReader()

            if(!reader){
                console.log('No se puedo generar el reader')
                return null
            }


            return reader

        
        
    } catch (error) {
        console.log(error)
        return null
    }

}