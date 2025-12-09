"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Memori = () => {
  // Card data - 8 pairs of matching cards
  const cardPairs = [
    { id: 1, text: "Jakarta" },
    { id: 2, text: "Bandung" },
    { id: 3, text: "Surabaya" },
    { id: 4, text: "Semarang" },
    { id: 5, text: "Yogyakarta" },
    { id: 6, text: "Malang" },
    { id: 7, text: "Medan" },
    { id: 8, text: "Bali" },
  ];

  // Create pairs and shuffle
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds timer
  const [gameEnded, setGameEnded] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  // Initialize game
  useEffect(() => {
    const doubledCards = [...cardPairs, ...cardPairs].map((card, index) => ({
      ...card,
      uniqueId: index,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle cards
    const shuffled = doubledCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !gameEnded) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameEnded(true);
    }
  }, [timeLeft, gameEnded]);

  // Check if all cards are matched
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameEnded(true);
    }
  }, [matchedCards, cards]);

  // Handle card click
  const handleCardClick = (uniqueId) => {
    if (
      gameEnded ||
      flippedCards.length === 2 ||
      flippedCards.includes(uniqueId) ||
      matchedCards.includes(uniqueId)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, uniqueId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((c) => c.uniqueId === firstId);
      const secondCard = cards.find((c) => c.uniqueId === secondId);

      if (firstCard.id === secondCard.id) {
        // Match found
        setMatchedCards([...matchedCards, firstId, secondId]);
        setXpEarned(xpEarned + 10);
        setFlippedCards([]);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (uniqueId) => {
    return flippedCards.includes(uniqueId) || matchedCards.includes(uniqueId);
  };

  return (
    <main className="min-h-screen w-full bg-[#0D1922] flex flex-col items-center overflow-y-auto">
      {/* navigation bar */}
      <nav className="w-full h-25 bg-[#1a2832] px-10">
        <div className="w-[80%] h-full mx-auto flex items-center justify-between">
          <div className="flex flex-col justify-start">
            <span className="text-[#c8a668] text-xs uppercase tracking-wider">
              Kartu Memori
            </span>
            <span className="text-2xl text-white font-medium">Jawa Barat</span>
          </div>
          <div>
            <span className="font-medium text-[#c7c7c7] text-lg">
              Total XP:{" "}
              <span className="text-[#c8a668] font-bold">{xpEarned}</span>
            </span>
          </div>
          <Link
            href="#"
            className="text-red-500 py-1.5 px-4 rounded-lg border border-red-500 bg-red-500/30 hover:bg-red-500/50 transition"
          >
            Quit Game
          </Link>
        </div>
      </nav>

      {/* main layout */}
      <div className="w-full max-w-[900px] min-h-full p-3 md:p-5 mx-auto">
        <div className="w-full flex flex-col items-start h-16 md:h-20 mt-3 md:mt-5 space-y-3 md:space-y-4">
          <span className="text-base md:text-lg text-white">
            Sisa Waktu: {timeLeft} detik
          </span>
          <div className="w-full rounded-full h-1.5 bg-gray-700">
            <div
              className="h-full rounded-full bg-[#c8a668] transition-all duration-1000"
              style={{ width: `${(timeLeft / 120) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Game Over Message */}
        {gameEnded && (
          <div className="w-full text-center py-6 md:py-8">
            <h2 className="text-2xl md:text-3xl text-white font-bold mb-2">
              {matchedCards.length === cards.length
                ? "Selamat! 🎉"
                : "Waktu Habis!"}
            </h2>
            <p className="text-lg md:text-xl text-[#c8a668]">
              Total XP yang didapat: {xpEarned}
            </p>
          </div>
        )}

        {/* Card Grid */}
        <div className="w-fit mx-auto grid grid-cols-4 md:grid-cols-4 gap-2 md:gap-3 mt-6 md:mt-8 mb-6 md:mb-8">
          {cards.map((card) => (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(card.uniqueId)}
              className={`cursor-pointer ${
                isCardFlipped(card.uniqueId) ? "" : "hover:scale-105"
              } transition-transform duration-200`}
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative w-[75px] h-[105px] sm:w-[90px] sm:h-[126px] md:w-[130px] md:h-[182px]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isCardFlipped(card.uniqueId)
                    ? "rotateY(180deg)"
                    : "rotateY(0deg)",
                  transition: "transform 0.6s",
                }}
              >
                {/* Back of card */}
                <div
                  className="absolute w-full h-full"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src="/back-card.png"
                    alt="back card"
                    width={130}
                    height={182}
                    className="w-full h-full object-cover rounded-md md:rounded-lg shadow-lg"
                  />
                </div>

                {/* Front of card (answer) */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-[#c8a668] to-[#a68850] rounded-md md:rounded-lg flex items-center justify-center border-2 md:border-4 border-[#d4b876] shadow-lg"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <span className="text-white text-xs sm:text-sm md:text-xl font-bold text-center px-1 md:px-3">
                    {card.text}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Memori;
