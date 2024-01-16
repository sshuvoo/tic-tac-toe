import Square from './Square';

export default function GameBoard({ squareValues, handleClick }) {
   return (
      <div className="border-2 border-black/10 rounded-lg p-4">
         <div className="w-[280px] h-[280px] grid grid-cols-3 grid-rows-3 justify-center relative">
            {squareValues.map((sv, i) => (
               <Square
                  key={i}
                  squareValue={sv}
                  handleClick={() => handleClick(i)}
               />
            ))}
            <div className="absolute animate-draw-x-line h-[6px] bg-black/20 top-1/3 -translate-y-2/3 w-full rounded-2xl left-1/2 -translate-x-1/2"></div>
            <div className="absolute animate-draw-x-line h-[6px] bg-black/20 top-2/3 -translate-y-1/3 w-full rounded-2xl left-1/2 -translate-x-1/2"></div>
            <div className="absolute animate-draw-y-line h-full bg-black/20 left-1/3 -translate-x-2/3 w-[6px] rounded-2xl top-1/2 -translate-y-1/2"></div>
            <div className="absolute animate-draw-y-line h-full bg-black/20 left-2/3 -translate-x-1/3 w-[6px] rounded-2xl top-1/2 -translate-y-1/2"></div>
         </div>
      </div>
   );
}
