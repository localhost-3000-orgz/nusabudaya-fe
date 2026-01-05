import Link from "next/link";
import React from "react";

const LandingNavbar = () => {
  return (
    <nav className="w-5xl pl-4 pr-2.5 h-16 border border-(--color-secondary) fixed bg-(--color-primary) rounded-xl top-5 z-10 left-1/2 -translate-x-1/2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src={"/logo.svg"} className="w-6" />
        <p className="font-bold text-(--color-secondary) mt-1 text-lg">
          NusaBudaya
        </p>
      </div>

      <div className="flex items-center space-x-10 font-medium text-white">
        <a href="#home">Home</a>
        <a href="#fitur">Fitur</a>
        <a href="#faq">FAQ</a>
      </div>

      <Link
        href={"/login"}
        className="bg-(--color-secondary) font-semibold text-white py-2.5 px-5 rounded-lg"
      >
        Coba Nusabudaya
      </Link>
    </nav>
  );
};

export default LandingNavbar;
