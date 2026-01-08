"use client";

import FeatureHeader from "@/components/Landing/FeatureHeader";
import FeatureRow from "@/components/Landing/FeatureRow";
import LandingNavbar from "@/components/Landing/LandingNavbar";
// import VideoFeature from "@/components/Landing/VideoFeature"; // Unused? Aku komen dulu ya
import { LIST_FEATURES } from "@/constants/listFeatures";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, MoveDown } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

function Page() {
  // 💡 Best practice: Nama component huruf besar (Page)
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

      // Gunakan timeline global atau loop yang hati-hati
      const timeline = gsap.timeline({ repeat: -1 });

      imgs.forEach((img, index) => {
        const nextIndex = (index + 1) % totalImages;
        const nextImg = imgs[nextIndex];

        timeline
          .to(
            img,
            {
              filter: "blur(10px)",
              duration: 1.5,
              ease: "power2.inOut",
            },
            "+=2"
          ) // Delay stay image
          .to(
            nextImg,
            {
              opacity: 1,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "<"
          ) // Jalan barengan sama animasi sebelumnya (crossfade)
          .to(
            nextImg,
            {
              filter: "blur(0px)",
              duration: 1.5,
              ease: "power2.out",
            },
            "-=1"
          )
          .set(img, { opacity: 0 });
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  return (
    <div className="w-full">
      <LandingNavbar />

      {/* HERO SECTION 
         ✅ Ubah h-screen jadi h-dvh (dynamic viewport height) biar aman di browser HP 
      */}
      <section
        ref={containerRef}
        className="w-full relative overflow-hidden h-dvh bg-black"
      >
        {IMAGES.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hero background ${index + 1}`}
            className="hero-img inset-0 absolute w-full h-full object-cover"
          />
        ))}

        <div className="w-full h-full inset-0 absolute z-2 bg-black/20"></div>
        <div className="w-full h-full inset-0 absolute z-2 bg-linear-to-t from-(--color-primary) via-(--color-primary)/60 to-transparent flex items-center justify-center px-4">
          {/* ✅ Container Text Responsif: w-full tapi max-w-4xl */}
          <div className="flex flex-col items-center w-full max-w-4xl text-center mb-10 md:mb-0">
            {/* ✅ Typography Responsif: text-3xl di HP -> text-6xl di Desktop */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight md:leading-17">
              Jelajahi Kekayaan Nusantara dengan Cara Baru
            </h1>

            {/* ✅ Paragraf Responsif: text-sm/base di HP -> text-lg di Desktop */}
            <p className="text-white font-light w-full max-w-lg md:max-w-2xl mt-4 text-sm md:text-lg leading-relaxed md:leading-6.5 px-2">
              Padukan kecanggihan AI, peta interaktif, dan serunya games untuk
              mendalami warisan leluhur. Dari Sabang sampai Merauke, semua ada
              di sini!
            </p>

            <Link
              href={"/login"}
              className="bg-(--color-primary) border flex items-center mt-6 md:mt-8 text-white py-2 px-6 md:py-2.5 md:px-7 gap-2 shadow-2xl border-(--color-secondary)/80 rounded-full font-medium text-sm md:text-base hover:bg-opacity-90 transition-all"
            >
              Mulai Eksplorasi{" "}
              <ArrowRight strokeWidth={2.5} className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="p-2 md:p-3 rounded-full text-white absolute border border-white left-1/2 -translate-x-1/2 bottom-20 md:bottom-30 z-10">
          <MoveDown className="w-4 h-4" />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="fitur"
        className="w-full bg-(--color-primary) py-12 md:py-20"
      >
        {/* Wrapper biar header ga mentok pinggir */}
        <div className="px-4">
          <FeatureHeader />
        </div>

        {/* ✅ Features Container: 
            - Padding horizontal (px-4) biar ga nempel layar HP
            - Gap diperkecil di HP (gap-16) dan besar di Desktop (gap-40)
            - max-w-6xl biar konten ga terlalu lebar di layar ultrawide
        */}
        <div className="w-full max-w-6xl mx-auto mt-12 md:mt-35 px-4 md:px-8 flex flex-col gap-20 md:gap-30">
          {LIST_FEATURES.map((feature, index) => (
            <FeatureRow
              key={index}
              title={feature.featureName}
              description={feature.featureDesc}
              video={feature.featureVid}
              change={index % 2 === 0}
              count={index}
              src={feature.featureVid}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Page;
