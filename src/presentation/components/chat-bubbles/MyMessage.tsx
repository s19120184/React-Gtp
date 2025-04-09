import { useWindowSize } from "../../hooks/UseWindowSise";


interface Props {
  text: string;
}

// Función que inserta <br /> cada x caracteres
function formatText(text: string , width:number) {
  const carateres=width > 450 ? 50 : 23
  const regex = new RegExp(`.{1,${carateres}}`, 'g'); // RegEx dinámica
  const chunks = text.match(regex); // Divide el texto cada x caracteres
  return chunks?.map((chunk, index) => (
    <span key={index}>
      {chunk}
      <br />
    </span>
  ));
}

export default function MyMessage({ text }: Props) {
  const { width} = useWindowSize()

  return (
    <div className="col-start-1 col-end-14 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          U
        </div>
        <div className="relative mr-3 text-sm bg-indigo-900 py-2 px-4 shadow rounded-xl text-white">
          
          <div>{formatText(text,width)}</div>
        </div>
      </div>
    </div>
  )}