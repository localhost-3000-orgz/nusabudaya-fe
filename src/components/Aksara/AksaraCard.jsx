// components/AksaraCard.jsx
"use client"; // Wajib karena pake hooks & event listener

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

const AksaraCard = ({ item }) => {
  const pathRef = useRef(null);
  const tweenRef = useRef(null); // Simpan referensi animasi biar bisa di-control

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // 1. Hitung panjang garis (path length)
    const length = path.getTotalLength();

    // 2. Set state awal: sembunyikan garis
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1, // Pastikan visible secara elemen
    });

    // Cleanup kalau component unmount
    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    // Play animasi drawing pas hover
    if (pathRef.current) {
      // Kill animasi sebelumnya biar gak numpuk
      if (tweenRef.current) tweenRef.current.kill();

      tweenRef.current = gsap.to(pathRef.current, {
        strokeDashoffset: 0, // Tarik garis sampai habis (muncul)
        duration: 1.5, // Kecepatan nulis (sesuaikan selera)
        ease: "power2.inOut",
      });
    }
  };

  const handleMouseLeave = () => {
    // Opsional: Balikkan ke kosong pas mouse pergi, atau biarin aja
    const path = pathRef.current;
    if (path) {
      if (tweenRef.current) tweenRef.current.kill();
      const length = path.getTotalLength();

      // Reset cepet ke kosong biar pas hover lagi mulai dari awal
      gsap.to(path, {
        strokeDashoffset: length,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  return (
    <Link href={item.path}>
      <div
        className="group w-full col-span-1 border border-[#5b5b5b] flex flex-col justify-center items-center rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Preview Area (Putih) */}
        <div className="w-full h-40 bg-transparent border-b border-[#5b5b5b] flex items-center justify-center p-4 relative">
          {/* SVG Container */}
          <svg
            viewBox="0 0 226 97"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              ref={pathRef}
              d={item.svgPath}
              stroke="#C8a668"
              strokeWidth="8" // Aku kecilin dikit dari 13 biar gak terlalu tebel di card kecil
              strokeLinecap="round"
              className="opacity-0" // Default hidden sebelum JS load
            />
          </svg>

          {/* Hint Text (Opsional, ilang pas dihover) */}
          <span className="absolute text-gray-300 text-sm font-light group-hover:opacity-0 transition-opacity duration-300">
            Hover me!
          </span>
        </div>

        {/* Label Area */}
        <div className="h-12 flex items-center justify-center w-full bg-[#2a2a2a] group-hover:bg-[#3a3a3a] transition-colors">
          <p className="text-white font-medium capitalize tracking-wide">
            {`Aksara ${item.labelAksara}`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default AksaraCard;
