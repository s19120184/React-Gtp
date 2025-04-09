import { FormEvent, useState } from "react";

interface Props {
  onSendMessage: (message: string, selectedOption:string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

export default function TextMessageBoxSelect({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  options
}: Props) {
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption]=useState<string>("")

  const handlesendMessage = (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;

    onSendMessage(message,selectedOption);
    setMessage("");
  };
  return (
    <form
      onSubmit={handlesendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="flex">
          <input
            type="text"
            autoFocus
            name="message"
            className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-500 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <select
            name="select"
            id=""
            className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-400 pl-4 h-10"
            value={selectedOption}
            onChange={e => setSelectedOption(e.target.value)}
          >
            <option value={''}>{"--Seleccione--"}</option>
            {options.map((option) => (
              <option key={option.id}>{option.text}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary">
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
}
