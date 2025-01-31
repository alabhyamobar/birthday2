import { useGSAP } from "@gsap/react";
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import decorImage from "../assets/birthdecor-removebg-preview.png";
import ClickImg from "../assets/click_here-removebg-preview.png";
import Balloon from "./Baloon";
import { useNavigate } from "react-router-dom";
import MusicVid from "../assets/alabhya.webm";

const Stage = () => {
  const navigate = useNavigate();
  const [Lights, setLights] = useState(false);
  const [Decoration, setDecoration] = useState(false);
  const [Baloon, setBaloon] = useState(false);
  const [Music, setMusic] = useState(false);
  const decorAnime = useRef(null);
  const starsContainer = useRef(null);
  const videoRef = useRef(null); // Reference for the video

  const states = [Lights, Decoration, Baloon, Music];
  const stateFunctions = [setLights, setDecoration, setBaloon, setMusic];
  const [count, setCount] = useState(0);

  const btnClick = () => {
    if (count < states.length) {
      stateFunctions[count](!states[count]);
      setCount((prev) => prev + 1);
    }

    if (count === 4) {
      navigate("/wish");
    }
  };

  
  useEffect(() => {
    if (Music && videoRef.current) {
      videoRef.current.play();
    }
  }, [Music]);

  useGSAP(() => {
    if (count === 2) {
      const tl = gsap.timeline();

      tl.set(starsContainer.current, { display: "block" });

      tl.call(() => {
        const stars = starsContainer.current.children;
        gsap.set(stars, { opacity: 1 });

        for (let i = 0; i < stars.length; i++) {
          gsap.fromTo(
            stars[i],
            {
              y: "-10vh",
              x: `${Math.random() * 150 - 50}vw`,
              opacity: 0.9,
            },
            {
              y: "110vh",
              x: `+=${Math.random() * 50 - 25}px`,
              duration: Math.random() * 2 + 2,
              ease: "linear",
              repeat: -1,
              delay: Math.random() * 2,
            }
          );
        }
      });

      tl.to(decorAnime.current, {
        clipPath: "inset(100% 0% 0% 0%)",
        autoAlpha: 0,
      }).to(decorAnime.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
        ease: "power2.out",
        duration: 1,
      });
    }
  }, [count]);

  
  const starsArray = Array.from({ length: 100 }, (_, i) => (
    <div
      key={i}
      className="star absolute"
      style={{
        width: `${Math.random() * 10 + 10}px`,
        height: `${Math.random() * 10 + 10}px`,
        top: "-10vh",
        left: `${Math.random() * 100}vw`,
      }}
    ></div>
  ));

  const balloonsArray =
    count === 3 ? Array.from({ length: 50 }, (_, i) => <Balloon key={i} />) : [];

  return (
    <div className={`h-screen w-screen ${Lights ? "bg-pink-400" : "bg-black"} flex flex-col`}>
      <div>
        <button
          onClick={btnClick}
          className={`px-[15vw] -translate-x-1/2 hover:shadow-2xl scale-125 py-3 rounded-full ${
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
        <img className={`${Lights ? "hidden" : "visible"} h-[18vw] w-[18vw] ml-[60vh] mt-10`} src={ClickImg} alt="" />
      </div>

      <div ref={starsContainer} className="absolute top-0 left-0 w-full h-full pointer-events-none hidden">
        {starsArray}
      </div>

      <div ref={decorAnime} className="h-[70vh] w-screen flex justify-center items-center relative top-[5vw] -left-[7vw] opacity-0">
        <img src={decorImage} alt="" />
      </div>

      <div className="absolute w-full h-screen z-10 top-0 left-0 pointer-events-none">{balloonsArray}</div>

      <div className={`w-[50vh] h-[80vh] absolute left-[0%] bottom-[5%] z-50 bg-white ${!Music ? "hidden" : "visible"}`}>
        <video ref={videoRef} src={MusicVid} controls></video>
      </div>

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
