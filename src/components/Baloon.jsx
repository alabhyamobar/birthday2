import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Balloon = () => {
  const balloonRef = useRef(null);

  useEffect(() => {
    gsap.to(balloonRef.current, {
      y: "-100vh",
      opacity: 0,
      duration: Math.random()*4+4,
      ease: "power4.out",
      repeat: 0,
    });
  }, []);

  return (
    <div
      ref={balloonRef}
      className="balloon absolute"
      style={{
        width: `${Math.random() * 20 + 30}px`, // Random width (30px - 50px)
        height: `${Math.random() * 30 + 50}px`, // Random height (50px - 80px)
        bottom: "-10vh", // Starts below the screen
        left: `${Math.random() * 100}vw`, // Random horizontal position
        // Random color
      }}
    >
      <div className="flex flex-col items-center w-[2vw]">
        <div
          style={{ backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)` }}
          className="w-[30px] h-[30px] rounded-t-full "
        ></div>
        <div className="h-[20px] w-[4px] bg-black"></div>
      </div>
    </div>
  );
};

export default Balloon;
