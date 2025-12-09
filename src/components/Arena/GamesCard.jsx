import React from "react";

const GamesCard = ({
  gameRole,
  gameName,
  gameDescription,
  gameExp,
  gameDuration,
}) => {
  return (
    <div className="w-80 h-full border border-[#5b5b5b] rounded-lg flex flex-col overflow-hidden">
      <div className="h-48 bg-[#0D1922] shrink-0"></div>

      <div className="flex-1 bg-(--color-primary) border-t border-[#5b5b5b] p-5">
        <div className="w-fit py-1 px-4 text-xs uppercase font-medium tracking-wide text-(--color-secondary) border border-(--color-secondary) rounded-full bg-[#C8A66830] mb-2">
          {gameRole}
        </div>

        <h3 className="text-2xl font-semibold text-white my-2">{gameName}</h3>

        <p className="text-[#c7c7c7] text-sm leading-5">{gameDescription}</p>

        <div className="border border-(--color-secondary) my-3 opacity-25 rounded-full"></div>

        <div className="flex gap-5">
          <div className="flex items-center gap-1 opacity-50">
            <img src="/xp.svg" className="w-4 h-4" />
            <span className="text-white text-sm">{`${gameExp}xp`}</span>
          </div>
          <div className="flex items-center gap-1 opacity-50">
            <img src="/stopwatch.svg" className="w-4 h-4" />
            <span className="text-white text-sm">{`${gameDuration} min`}</span>
          </div>
        </div>

        <div className="w-full rounded-md mt-5 py-2  flex items-center justify-center bg-(--color-secondary) font-semibold tracking-wide">
          MAIN
        </div>
      </div>
    </div>
  );
};

export default GamesCard;
