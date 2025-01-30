import { useGSAP } from "@gsap/react";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import decorImage from "../assets/birthdecor-removebg-preview.png";


const Stage = () => {
  const [Lights, setLights] = useState(false);
  const [Decoration, setDecoration] = useState(false);
  const [Baloon, setBaloon] = useState(false);
  const [Music, setMusic] = useState(false);
  const decorAnime = useRef(null);
  const starsContainer = useRef(null);
  const cakeImage = useRef(null);

  const states = [Lights, Decoration, Baloon, Music];
  const stateFunctions = [setLights, setDecoration, setBaloon, setMusic];
  const [count, setCount] = useState(0);

  const btnClick = () => {
    if (count < states.length) {
      stateFunctions[count](!states[count]);
      setCount((prev) => prev + 1);
    }
  };

  useGSAP(() => {
    if (count === 2) {
      const tl = gsap.timeline();

      // Show the stars container and start star rain animation
      tl.set(starsContainer.current, { display: "block" });

      // Animate the stars falling
      tl.call(() => {
        const stars = starsContainer.current.children;
        gsap.set(stars, { opacity: 1 });

        // Loop over each star to create the rain effect
        for (let i = 0; i < stars.length; i++) {
          gsap.fromTo(
            stars[i],
            {
              y: "-10vh", // Start above the screen
              x: `${Math.random() * 150 - 50}vw`, // Stars now have a wider range, but more on the left (0vw to 100vw, with a bias)
              opacity: 0.9,
            },
            {
              y: "110vh", // End below the screen
              x: `+=${Math.random() * 50 - 25}px`, // Small horizontal drift
              duration: Math.random() * 2 + 2, // Slower star speed (2s to 4s)
              ease: "linear",
              repeat: -1, // Infinite loop
              delay: Math.random() * 2, // Random delay for each star
            }
          );
        }
      });

      // Simultaneously reveal the decoration and fade in the cake image
      tl.to(decorAnime.current, {
        clipPath: "inset(100% 0% 0% 0%)", // Start hidden
        autoAlpha: 0,
      })
        .to(decorAnime.current, {
          clipPath: "inset(0% 0% 0% 0%)", // Fully visible
          autoAlpha: 1,
          ease: "power2.out",
          duration: 1,
        });

      // Fade in the cake image simultaneously
      tl.fromTo(
        cakeImage.current,
        { opacity: 0, scale: 0.8 }, // Start hidden and slightly smaller
        {
          opacity: 1, // Fade in to full opacity
          scale: 1, // Scale to normal size
          duration: 2, // Duration of the fade-in
          ease: "power2.out", // Smooth easing
        }
      );
    }
  }, [count]);

  // Generate 100 stars for the rain effect
  const starsArray = Array.from({ length: 100 }, (_, i) => (
    <div
      key={i}
      className="star absolute"
      style={{
        width: `${Math.random() * 10 + 10}px`, // Random size (10px - 20px)
        height: `${Math.random() * 10 + 10}px`,
        top: "-10vh", // Starts above the screen
        left: `${Math.random() * 100}vw`, // Random horizontal position
      }}
    ></div>
  ));

  return (
    <div className={`h-screen w-screen ${Lights ? "bg-pink-400" : "bg-black"}`}>
      <button
        onClick={btnClick}
        className={`px-[15vw] -translate-x-1/2 hover:shadow-lg scale-125 py-3 rounded-full ${
          count === 0
            ? "bg-blue-500"
            : count === 1
            ? "bg-green-300"
            : count === 2
            ? "bg-red-400"
            : count === 3
            ? "bg-yellow-400"
            : "bg-blue-300"
        } text-white relative top-[2vw] left-[45vw]`}
      >
        {count === 0
          ? "Turn on Lights"
          : count === 1
          ? "Add Decoration"
          : count === 2
          ? "Release Balloons"
          : count === 3
          ? "Start Music"
          : "Aur Ab"}
      </button>

      {/* Initially hidden stars, displayed only on "Add Decoration" click */}
      <div
        ref={starsContainer}
        className="absolute top-0 left-0 w-full h-full pointer-events-none hidden"
      >
        {starsArray}
      </div>

      {/* Decoration Reveal */}
      <div
        ref={decorAnime}
        className="h-[70vh] w-screen flex justify-center items-center relative top-[5vw] -left-[7vw] opacity-0"
      >
        <img src={decorImage} alt="" />
      </div>
      {/* Cake Image with Fade-in Animation */}
      <div
        ref={cakeImage}
        className="absolute w-[200px] h-[200px] top-[65vh] left-[45%] transform -translate-x-1/2 opacity-0"
      >
        <img src="https://imgs.search.brave.com/_YqoTxopyQpmKy2Lm3jiyWowd3-RoelgHRovZ8_GmUU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzU4LzE0LzY2/LzM2MF9GXzU1ODE0/NjYzNV9QamdqMUY4/QXU2NEpUZUI5Vkd1/YXMwRm0wOU9oRU9H/aC5qcGc" alt="Cake" className="w-full h-full" />
      </div>

      {/* Star shape styles */}
      <style>{`
        .star {
          position: absolute;
          background-color: white;
          clip-path: polygon(
            50% 0%, 61% 35%, 98% 35%, 68% 57%, 
            79% 91%, 50% 70%, 21% 91%, 32% 57%, 
            2% 35%, 39% 35%
          );
          opacity: 0.9;
          filter: drop-shadow(0 0 5px white);
        }
      `}</style>
    </div>
  );
};

export default Stage;