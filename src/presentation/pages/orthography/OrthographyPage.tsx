import { useState } from "react";
import GtpMessages from "../../components/chat-bubbles/GtpMessages";
import MyMessage from "../../components/chat-bubbles/MyMessage";
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox";
import TypingLoader from "../../components/loaders/TypingLoader";
import { orthographyUseCase } from "../../../core/use-cases";
import GtpMessagesOrthography from "../../components/chat-bubbles/GtpMessagesOrtographyMesage";



interface Message {
  text: string;
  isGtp: boolean;
  info?:{
    userScore:number,
    errores:string[],
    mensaje:string
  }
}

export default function OrthographyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
 

  const handlePost = async (text:string)=>
  {
    setIsLoading(true)
    //cargamos y desestructuramos  los mensajes anteriores y agregamos el nuevo
    setMessages((prev)=> [...prev, { text: text, isGtp:false}])

    //todo:UseCase
    //utilizamos nuestro usecase
    const data=await orthographyUseCase(text)

    if(!data.ok){
      setMessages((prev)=> [...prev, {text: data.mensaje, isGtp:true}])
    }else{
      setMessages((prev)=> [...prev, {
        text: data.mensaje, 
        isGtp:true,
        info:{
          errores:data.errores,
          mensaje:data.mensaje,
          userScore:data.userScore
        }
      }])
    }

    console.log(data)

    setIsLoading(false)
    //todo: agregar el mensaje de gtp
  }

  return (
    <>
    
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* bienvenida */}
          <GtpMessages text="Hola , puedes escribir tu texto y te ayudo con las correcciones" />

    
          {messages.map((messages, index) =>
            messages.isGtp ? (
              <GtpMessagesOrthography  key={index}  {...messages.info!}/>
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
