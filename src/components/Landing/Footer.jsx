import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const navigationLinks = [
    { name: "NusaAtlas", href: "/atlas" },
    { name: "NusaArena", href: "/arena" },
    { name: "NusaLens", href: "/lens" },
    { name: "NusaBatik", href: "/batik" },
    { name: "NusaAksara", href: "/aksara" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="w-full bg-linear-to-b from-[#030b11] to-black border-t border-[#C8A668]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <img src={"/logo.svg"} className="w-7 h-auto" />
              <h3 className="text-xl md:text-2xl font-bold text-white">
                NusaBudaya
              </h3>
            </div>

            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm">
              Melestarikan dan mengenalkan kekayaan budaya Nusantara melalui
              teknologi modern
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#C8A668]/20 border border-white/10 hover:border-[#C8A668]/40 flex items-center justify-center text-white/60 hover:text-[#C8A668] transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <h4 className="text-white font-semibold text-lg">Links</h4>
            <nav className="flex flex-col space-y-2.5">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-[#C8A668] transition-colors duration-300 text-sm md:text-base w-fit group"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C8A668] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* CTA Section */}
          <div className="lg:col-span-4 flex flex-col">
            <h4 className="text-white font-semibold text-lg mb-1">
              Siap Menjelajahi Nusantara?
            </h4>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Mulai petualangan budaya Anda hari ini
            </p>
            <a
              href="/login"
              className="inline-flex mt-3 items-center justify-center px-6 py-3 bg-[#C8A668] hover:bg-[#8B7355] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#C8A668]/20 w-full md:w-auto"
            >
              Mulai Sekarang
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} NusaBudaya. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-white/40 hover:text-white/60 text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-white/40 hover:text-white/60 text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
