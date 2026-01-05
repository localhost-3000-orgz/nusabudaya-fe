import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";
import VideoFeature from "./VideoFeature";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FeatureRow = ({ title, description, video, change, count }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 40%",

        onEnter: () => videoRef.current && videoRef.current.play(),
        onLeave: () => videoRef.current && videoRef.current.pause(),
        onEnterBack: () => videoRef.current && videoRef.current.play(),
        onLeaveBack: () => videoRef.current && videoRef.current.pause(),

        markers: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`feature-${count} w-full flex ${
        change ? "flex-row" : "flex-row-reverse"
      } items-center gap-10 border-white`}
    >
      <div className="w-full">
        <h4 className={`text-4xl mb-5 text-(--color-secondary) font-semibold`}>
          {title}
        </h4>
        <p className={`text-[#f1f1f1]`}>{description}</p>
      </div>
      {/* right */}
      <VideoFeature title={"NusaBatik"}>
        <video
          ref={videoRef}
          src={video}
          className="w-full h-auto block"
          autoPlay
          loop
          muted
          playsInline
        />
      </VideoFeature>
    </div>
  );
};

export default FeatureRow;
