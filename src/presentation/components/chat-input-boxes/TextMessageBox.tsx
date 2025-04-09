import { FormEvent, useState } from "react"
import { useWindowSize } from "../../hooks/UseWindowSise"


interface Props{
    onSendMessage:(message:string)=>void
    placeholder?:string
    disableCorrections?:boolean
}

export default function TextMessageBox({onSendMessage, placeholder, disableCorrections=false}:Props) {


    const [message, setMessage] =useState("")
    const { width} = useWindowSize()

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
        <div className="flex-grow">
            <div className="realative w-full text-sm md:text-xl">
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

        <div className="ml-2 md:ml-4 ">
            <button className={`btn-primary`} >
                <span className="mr-0 md:mr-3">{+width  < 450 ? '' : 'enviar'}</span>
                <i className="fa-regular fa-paper-plane"></i>
           </button>
        </div>

    </form>
  )
}
