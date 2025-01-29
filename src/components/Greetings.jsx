
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import Mes from "./Mes";
import Router from "../router/Router";

const Greetings = () => {
  const [hearts, setHearts] = useState([]);
  const location = useLocation();
  const isStageActive = location.pathname === "/Stage";
  const heartRefs = useRef({}); 

  useEffect(() => {
    let heartInterval;

    if (!isStageActive) {
      heartInterval = setInterval(() => {
        const heartId = Date.now();
        const leftPosition = Math.random() * 80; 
        const size = Math.random() * 20 + 20; 

        setHearts((prev) => [
          ...prev,
          { id: heartId, left: leftPosition, size },
        ]);
      }, 1000);
    } else {
      setHearts([]); 
    }

    return () => clearInterval(heartInterval);
  }, [isStageActive]);

  useEffect(() => {
    
    if (hearts.length > 0) {
      const lastHeart = hearts[hearts.length - 1];
      const heartRef = heartRefs.current[lastHeart.id];

      if (heartRef) {
        gsap.fromTo(
          heartRef,
          { y: 0, opacity: 1, ease: "power2.in" },
          {
            y: "-100vh", 
            opacity: 0, 
            duration: 2,
            ease: "power2.out",
            onComplete: () => {
              
              setHearts((prev) => prev.filter((h) => h.id !== lastHeart.id));
              delete heartRefs.current[lastHeart.id]; 
            },
          }
        );
      }
    }
  }, [hearts]);

  return (
    <div className="h-screen w-screen relative bg-pink-400 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          ref={(el) => {
            if (el) heartRefs.current[heart.id] = el; 
          }}
          className="absolute text-red-500 w-full"
          style={{
            fontSize: `${heart.size}px`,
            left: `${heart.left}vw`,
            bottom: "0px",
          }}
        >
          ❤️
        </div>
      ))}
      <Mes />
      <Router />
    </div>
  );
};

export default Greetings;
