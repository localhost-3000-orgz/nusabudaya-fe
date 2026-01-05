"use client";

import FeatureHeader from "@/components/Landing/FeatureHeader";
import FeatureRow from "@/components/Landing/FeatureRow";
import LandingNavbar from "@/components/Landing/LandingNavbar";
import VideoFeature from "@/components/Landing/VideoFeature";
import { LIST_FEATURES } from "@/constants/listFeatures";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, MoveDown, MoveRight } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

function page() {
  const containerRef = useRef(null);
  const IMAGES = [
    "/hero/hero-1.jpg",
    "/hero/hero-2.jpg",
    "/hero/hero-3.jpg",
    "/hero/hero-4.jpg",
    "/hero/hero-5.jpg",
  ];

  useGSAP(() => {
    const context = gsap.context(() => {
      const imgs = document.querySelectorAll(".hero-img");
      const totalImages = imgs.length;

      gsap.set(imgs, { opacity: 0, filter: "blur(10px)" });
      gsap.set(imgs[0], { opacity: 1, filter: "blur(0px)" });

      const timeline = gsap.timeline({ repeat: -1 });

      imgs.forEach((img, index) => {
        const nextIndex = (index + 1) % totalImages;
        const nextImg = imgs[nextIndex];

        // image skarang blur
        timeline
          .to(img, {
            filter: "blur(10px)",
            duration: 1.5,
            ease: "power2.inOut",
          })
          .to(nextImg, {
            opacity: 1,
            duration: 1.5,
            ease: "power2.inOut",
          })
          .to(nextImg, {
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power2.out",
          })
          .set(img, { opacity: 0 });
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <div className="w-full">
      <LandingNavbar />

      {/* hero section */}
      <section
        ref={containerRef}
        className="w-full relative overflow-hidden h-screen bg-black"
      >
        {IMAGES.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hero background ${index + 1}`}
            className="hero-img inset-0 absolute w-full h-full object-cover"
          />
        ))}

        <div className="w-full h-full inset-0 absolute z-2 bg-black/10"></div>
        <div className="w-full h-full inset-0 absolute z-2 bg-linear-to-t from-(--color-primary) via-(--color-primary)/60 to-transparent flex items-center justify-center">
          <div className="flex flex-col items-center w-4xl text-center mb-10">
            <h1 className="text-6xl font-black text-white tracking-tight leading-17">
              Jelajahi Kekayaan Nusantara dengan Cara Baru
            </h1>
            <p className="text-white font-light w-2xl mt-4 text-lg leading-6.5">
              Padukan kecanggihan AI, peta interaktif, dan serunya games untuk
              mendalami warisan leluhur. Dari Sabang sampai Merauke, semua ada
              di sini!
            </p>
            <Link
              href={"/login"}
              className="bg-(--color-primary) border flex items-center mt-8 text-white py-2.5 px-7 gap-2 shadow-2xl border-(--color-secondary)/80 rounded-full font-medium "
            >
              Mulai Eksplorasi{" "}
              <ArrowRight strokeWidth={2.5} className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="p-3 rounded-full text-white absolute border border-white left-1/2 -translate-x-1/2 bottom-30 z-10">
          <MoveDown className="w-4 h-4" />
        </div>
      </section>

      {/* features section */}
      <section id="fitur" className="w-full bg-(--color-primary) py-20">
        <FeatureHeader />

        {/* features component */}
        <div className="w-4xl mx-auto mt-20 flex flex-col gap-40">
          {/* each features */}
          {LIST_FEATURES.map((feature, index) => (
            <FeatureRow
              key={index}
              title={feature.featureName}
              description={feature.featureDesc}
              video={feature.featureVid}
              change={index % 2 === 0}
              count={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default page;
