

export async function * prosConsStreamGeneratorUseCase(prompt:string ,abortSignal:AbortSignal) {

    try {
        const resp= await fetch(`${import.meta.env.VITE_GTP_API}/pros-cons-discusser-stream`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({prompt}),
                //todo: abortSignal cancelar la peticion
                signal: abortSignal
            })

            if(!resp.ok) throw new Error("No se pudo realizar la Comparacion")

            const reader = resp.body?.getReader()

            if(!reader){
                console.log('No se puedo generar el reader')
                return null
            }

            //decoficador
            const decoder = new TextDecoder()
            let text= ''
            while(true){
                const {value, done} = await reader.read()
                if(done){
                    break
                }
                const decodeChunk = decoder.decode(value, {stream :true})
                text += decodeChunk
                //return de la funcion generadora
                yield text
            }
        
           
        
    } catch (error) {
        console.log(error)
        return null
    }

}