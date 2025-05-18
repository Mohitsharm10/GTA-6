import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showContent, setShowContent] = useState(false);

  // Refs for DOM elements
  const mainRef = useRef(null);
  const textRef = useRef(null);
  const skyRef = useRef(null);
  const bgRef = useRef(null);
  const characterRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    // Animate the mask group first
    const tl = gsap.timeline({
      onComplete: () => {
        // Hide the SVG overlay after animation
        if (svgRef.current) {
          svgRef.current.style.display = "none";
        }
        setShowContent(true);
      },
    });

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    }).to(
      ".vi-mask-group",
      {
        scale: 10,
        duration: 2,
        ease: "expo.inOut",
        transformOrigin: "50% 50%",
        opacity: 0,
      },
      "-=1.8"
    );
  }, []);

  useEffect(() => {
    if (!showContent) return;

    // Hero animations timeline
    const tl = gsap.timeline();

    tl.to(mainRef.current, {
      scale: 1,
      rotate: 0,
      duration: 2,
      ease: "expo.inOut",
    })
      .to(
        skyRef.current,
        {
          scale: 1.1,
          rotate: 0,
          duration: 2,
          ease: "expo.inOut",
        },
        "<"
      )
      .to(
        bgRef.current,
        {
          scale: 1.1,
          rotate: 0,
          duration: 2,
          ease: "expo.inOut",
        },
        "<"
      )
      .to(
        characterRef.current,
        {
          scale: 1.4,
          x: "-50%",
          bottom: "-25%",
          rotate: 0,
          duration: 2,
          ease: "expo.inOut",
        },
        "<"
      )
      .to(
        textRef.current,
        {
          scale: 1,
          rotate: 0,
          duration: 2,
          ease: "expo.inOut",
        },
        "<"
      );

    function onMouseMove(e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(textRef.current, { x: `${xMove * 0.4}%` });
      gsap.to(skyRef.current, { x: xMove });
      gsap.to(bgRef.current, { x: xMove * 1.7 });
    }

    const mainEl = mainRef.current;
    mainEl.addEventListener("mousemove", onMouseMove);

    gsap.from(".cntnr", {
      scrollTrigger: {
        trigger: ".cntnr",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    });

    return () => {
      mainEl.removeEventListener("mousemove", onMouseMove);
    };
  }, [showContent]);

  return (
    <>
      {/* Mask animation overlay */}
      <div
        ref={svgRef}
        className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]"
      >
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {/* Main content */}
      {showContent && (
        <div ref={mainRef} className="main w-full rotate-[-10deg] scale-[1.7]">
          {/* ...rest of your main content here, unchanged... */}
          <div className="landing overflow-hidden relative w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-10 px-10">
              <div className="logo flex gap-7">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line w-[60px] h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div>
                </div>
                <h3 className="text-4xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                ref={skyRef}
                className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt="Sky background"
              />
              <img
                ref={bgRef}
                className="absolute scale-[1.8] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt="Background"
              />
              <div
                ref={textRef}
                className="text text-white flex flex-col gap-3 absolute top-50 left-125 -translate-x-1/2 scale-[1.4] rotate-[-10deg]"
              >
                <h1 className="text-[12rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[12rem] leading-none ml-20">theft</h1>
                <h1 className="text-[12rem] leading-none -ml-40">auto</h1>
              </div>
            </div>

            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-4xl ri-arrow-down-line"></i>
                <h3 className="text-xl font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                ref={characterRef}
                className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                src="./ps5.png"
                alt="PS5"
              />
            </div>
          </div>

          {/* Second section with scroll animation */}
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%]">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt="Decorative"
                />
              </div>
              <div className="rg w-[30%] py-30">
                <h1 className="text-8xl">Still Running,</h1>
                <h1 className="text-8xl">Not Hunting</h1>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <button className="bg-yellow-500 px-10 py-10 text-black mt-10 text-4xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
