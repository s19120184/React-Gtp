

interface Props{
   userScore:number;
   errores:string[],
   mensaje:string
}

export default function GtpMessagesOrthography({userScore, errores, mensaje}:Props) {
  return (
       <div className="col-start-1 col-end-14 p-3 rounded-lg">
           <div className="flex flex-row items-start">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0 ">
                   G
              </div>
              <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
                  <h3 className=" text-xl md:text-2xl">Tu Score: {userScore}%</h3>
                  <p className='text-sm sm:text-xl'>{mensaje}</p>
                  { (errores.length) === 0 
                      ? <p>No se encontraron errores</p>
                      : (
                        <>
                           <h3 className="text-xl">Errores encontrados</h3>
                           <ul>
                              {
                                errores.map((error,i) => (
                                   <li className="text-xs" key={i}>{error}</li>
                                ))
                              }
                           </ul>
                        
                        </>
                      )
                   }
              </div>
           </div>
       </div>
  )
}
