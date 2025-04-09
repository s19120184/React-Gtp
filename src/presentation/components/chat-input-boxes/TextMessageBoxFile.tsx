import { FormEvent, useRef, useState } from "react"


interface Props{
    onSendMessage:(message:string)=>void
    placeholder?:string
    disableCorrections?:boolean
    accept?:string;
}

export default function TextMessageBox({onSendMessage, placeholder, disableCorrections=false, accept}:Props) {


    const [message, setMessage] =useState("")
    const [selectedfile, setSelectedFile]= useState<File|null>()

    //referencia al inputFile
    const inputFileRef = useRef<HTMLInputElement>(null)

    const handlesendMessage= (event:FormEvent<HTMLElement>)=>{
        event.preventDefault()

        if(message.trim().length ===0) return

        onSendMessage(message)
        setMessage('')

    }
  return (
    <form 
       onSubmit={handlesendMessage}
       className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >

        <div className="mr-3">
            <button 
                type="button" className=" flex items-center justify-center text-gray-400 hover:text-gray-600"
                // usamos la referencia el input file
                onClick={()=> inputFileRef.current?.click()}
                
                >
                <i className="fa-solid fa-paperclip text-xl"></i>
            </button>
            <input 
               className=""
               type="file"
               ref={inputFileRef}
               accept={accept}
               onChange={(e)=> setSelectedFile(e.target.files?.item(0))}
               hidden
            />
        </div>
        <div className="flex-grow">
            <div className="realative w-full">
                 <input 
                    type="text"
                    autoFocus
                    name="message"
                    className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-500 pl-4 h-10"
                    placeholder={placeholder}
                    autoComplete={disableCorrections ? 'on': 'off'}
                    autoCorrect={ disableCorrections ? 'on' : 'off'}
                    spellCheck={ disableCorrections ? 'true' : 'false'}
                    value={message}
                    onChange={(e)=> setMessage(e.target.value)}
                    />
            </div> 
        </div>

        <div className="ml-4">
            <button className="btn-primary" disabled={!selectedfile}>
                {
                    (!selectedfile) 
                    ? <span className="mr-2">Enviar</span>
                    : <span className="mr-2">{selectedfile.name.substring(0,10)+ '...'}</span>
                }

                <i className="fa-regular fa-paper-plane"></i>
           </button>
        </div>

    </form>
  )
}
