import { useState } from "react";
import GtpMessages from "../../components/chat-bubbles/GtpMessages";
import MyMessage from "../../components/chat-bubbles/MyMessage";
import TextMessageBox from "../../components/chat-input-boxes/TextMessageBox";
import TypingLoader from "../../components/loaders/TypingLoader";

// import TextMessageBoxFile from "../../components/chat-input-boxes/TextMessageBoxFile";
// import TextMessageBoxSelect from "../../components/chat-input-boxes/TextMessageBoxSelect";

interface Message {
  text: string;
  isGtp: boolean;
}

export default function OrthographyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
 

  const handlePost = async (text:string)=>
  {
    setIsLoading(true)
    //cargamos y desestructuramos los mensajes anterioses y agregamos el nuevo
    setMessages((prev)=> [...prev, { text: text, isGtp:false}])

    //todo:UseCase

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
              <GtpMessages  key={index} text="Gto" />
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
