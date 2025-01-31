import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Mes = () => {
  const [currentMesIndex, setcurrentMesInddex] = useState(0);
  const [isVisible, setIsVisible] = useState(true); 
  const messages = [
    "Hello",
    "Namaste ji 🙏🏻",
    "Aaj aap ka janamdin hai (Happy janamdin 🥳)",
    "toh iss hi baat pe mare paas hai app ke liye kuch",
  ];
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (currentMesIndex < messages.length) {
      timer = setTimeout(() => {
        setcurrentMesInddex((prev) => prev + 1);
      }, 2500);
    }

    return () => clearTimeout(timer);
  }, [currentMesIndex]);

  const handleYesClick = () => {
    setIsVisible(false); 
    navigate("/Stage"); 
    
  };

  return isVisible ? ( 
    <div className="h-[40vh] w-[40vw] p-5 bg-white absolute left-[25vw] top-[30%] rounded-lg flex flex-col justify-center items-center shadow-2xl">
      <span className='text-3xl mb-10'>✨</span>
      {currentMesIndex < messages.length ? (
        <p className="text-black text-4xl ">{messages[currentMesIndex]}</p>
      ) : (
        <div className="w-full h-full flex justify-center items-center flex-col text-4xl">
          <p>Kya dekhena chahiyengi app ??</p>
          <div className="w-[60%] mt-10 flex justify-between">
            <button
              onClick={handleYesClick}
              className="px-4 py-3 rounded-full bg-blue-400 text-white"
            >
              Yes
            </button>
            <button
              onClick={() => {
                navigate("/");
                alert("dekh le bhai bhaut mahenat se banaya hai");
              }}
              className="px-4 py-3 rounded-full bg-red-400 text-white"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  ) : null; 
};

export default Mes;