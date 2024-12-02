import { useEffect, useState, useRef } from "react";


function App() {

  const [message, setMessage] = useState(["hii there", "how are you", "i am fine"]);
  const wsRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);  
  
  useEffect(()=>{
    const ws =  new WebSocket("ws://localhost:8080");
    ws.onmessage = (event)=>{
      setMessage(m => [...m, event.data]);
    }
    wsRef.current = ws;
    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        type: "join",
        "payload": {
          "roomId": "red"
        }
      }));
    }
    return ()=>{
      ws.close();
    }
  },[]);
  return (
    
     <div className='flex bg-black flex-col h-screen w-full p-4'>
      <div className='h-[90vh] '>
        {message.map(message =><div className='m-6'>
          <span className='text-black bg-white p-2 gap-2 rounded-md'>
            {message}
            </span>
        </div>)}
      </div>
      <div className='bg-slate-800 p-2 flex justify-between items-center gap-2'>
        <input ref={inputRef} type="text" className='w-full p-2 rounded-md flex-1' />
        <button 
        onClick={()=>{
          const message = inputRef.current?.value;
          wsRef.current?.send(JSON.stringify({
            type: "chat",
            "payload": {
              "message": message
            }
          }));
        }}
        className='bg-purple-500 text-white p-2 rounded-md font-bold'>Send</button>
      </div>
     </div>
    
  )
}

export default App
