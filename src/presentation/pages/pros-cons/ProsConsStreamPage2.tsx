import { useRef, useState } from "react";
import GtpMessages from "../../components/chat-bubbles/GtpMessages";
import MyMessage from "../../components/chat-bubbles/MyMessage";
import TypingLoader from "../../components/loaders/TypingLoader";
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox";
import { prosConsStreamGeneratorUseCase} from "../../../core/use-cases";




interface Message {
  text: string;
  isGtp: boolean;
  
}

export default function ProsConsStreamPage2() {

  //para cancelar la consulta
  const abortController = useRef(new AbortController)
  const isRunning = useRef(false)

  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
 

  const handlePost = async (text:string)=>
  {
    //si llega una nueva request antes de terminar la anterior 
    if(isRunning.current){
      abortController.current.abort()
      abortController.current = new AbortController()
    }

    setIsLoading(true)
    //actualizamos a true
    isRunning.current=true

    //cargamos y desestructuramos  los mensajes anteriores y agregamos el nuevo
    setMessages((prev)=> [...prev, { text: text, isGtp:false}])

    //todo:UseCase
    //utilizamos nuestro usecase
   const stream=  prosConsStreamGeneratorUseCase (text , abortController.current.signal )
   setIsLoading(false)

   setMessages((messages)=> [ ...messages , { text:'', isGtp:true}])

   for await (const text of stream){
       setMessages((messages)=>{
            const newMessages = [...messages]
            newMessages[newMessages.length-1].text = text
            return newMessages
       })
       
   }

   isRunning.current= false
   
    // if(!reader ) return alert("No se pudo generar el reader")
    
    
      //generar el ultimo mensaje
    // const decoder = new TextDecoder()
    // let message=''
    // setMessages((messages) => [ ...messages , {text:message , isGtp:true}])

    // while(true){
    //    const { value , done} = await reader.read()
    //    if(done) break
    //    const decodedChunk = decoder.decode(value, {stream: true})
    //    message+=decodedChunk
    //    console.log(message)

    //   //actualizar el ultimo mensaje
    //   setMessages((messages)=>{
    //   const newMessages= [...messages]
    //   newMessages[newMessages.length-1].text= message
    //   return newMessages
    // })
    // }    
  }

  return (
    <>
    
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* bienvenida */}
          <GtpMessages text="¿Qué deceas comparar hoy?" />

    
          {messages.map((messages, index) =>
            messages.isGtp ? (
              <GtpMessages  key={index} text={messages.text} />
            ) : (
              <MyMessage key={index} text={messages.text} />
            )
          )}


          {
            isLoading && (
              <div className="col-start-1 col-end-12 fade-in">
                <TypingLoader  />
              </div>
            )
          }
        
         
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
      />
     
    </div>
    </>
  );
}
