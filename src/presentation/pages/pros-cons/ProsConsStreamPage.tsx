

import { useState } from "react";
import GtpMessages from "../../components/chat-bubbles/GtpMessages";
import MyMessage from "../../components/chat-bubbles/MyMessage";
import TypingLoader from "../../components/loaders/TypingLoader";
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox";
import { prosConsDiscusserUseCase } from "../../../core/use-cases/prosConsDiscusser.use-case";



interface Message {
  text: string;
  isGtp: boolean;
  info?:{
    content:string,
  }
}

export default function ProsConsStreamPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
 

  const handlePost = async (text:string)=>
  {
    setIsLoading(true)
    //cargamos y desestructuramos  los mensajes anteriores y agregamos el nuevo
    setMessages((prev)=> [...prev, { text: text, isGtp:false}])

    //todo:UseCase
    //utilizamos nuestro usecase
    const data= await prosConsDiscusserUseCase(text)
    if(!data.ok){
      setMessages((prev)=>[...prev , { text:'No se puedo realizar comparacion', isGtp:true}])
    }else{
      setMessages((prev)=> [...prev, {
        text:data.content,
        isGtp:true,
        info:{
          content:data.content
        }
      }])
    }
  
    setIsLoading(false)
    //todo: agregar el mensaje de gtp
  }

  return (
    <>
    
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* bienvenida */}
          <GtpMessages text="Hola , puedo ayudarte a hacer comparaciones de distintos elemetos " />

    
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
