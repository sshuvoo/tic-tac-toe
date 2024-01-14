import { useEffect, useState } from 'react';
import Square from './components/Square';
import calcWinner from './utils/calculateWinner';
import xAudio from './assets/x.mp3';
import oAudio from './assets/o.mp3';
import gameOverAudio from './assets/game-over.mp3';
import victoryAudio from './assets/victory.mp3';

export default function App() {
   const [history, setHistory] = useState([]);
   const [squareValues, setSquareValues] = useState(Array(9).fill(null));
   const [nextPiece, setNextPiece] = useState('x');
   const [winStat, setWinStat] = useState({ x: 0, o: 0, tie: 0 });
   const winner = calcWinner(squareValues);
   const audioX = new Audio(xAudio);
   const audioO = new Audio(oAudio);

   const handleClick = (i) => {
      if (!squareValues[i] && !winner) {
         const updatedSqureValues = squareValues.map((sv, index) => {
            if (index === i) return nextPiece;
            else return sv;
         });
         setSquareValues(updatedSqureValues);
         setHistory([...history, updatedSqureValues]);
         setNextPiece((pre) => (pre === 'x' ? 'o' : 'x'));
         nextPiece === 'x' ? audioX.play() : audioO.play();
      }
   };

   const handlePlayAgain = () => {
      setSquareValues(Array(9).fill(null));
      setHistory([]);
   };

   const handleResetScore = () => setWinStat({ x: 0, o: 0, tie: 0 });

   const handleChoosePiece = (piece) => {
      if (squareValues.every((sv) => sv === null)) {
         setNextPiece(piece);
      }
   };

   useEffect(() => {
      const audioGameOver = new Audio(gameOverAudio);
      const audioVictory = new Audio(victoryAudio);
      if (winner) {
         if (winner === 'x' || winner === 'o') audioVictory.play();
         else audioGameOver.play();
         if (winner === 'x') setWinStat((pre) => ({ ...pre, x: pre.x + 1 }));
         if (winner === 'o') setWinStat((pre) => ({ ...pre, o: pre.o + 1 }));
         if (winner === 'tie')
            setWinStat((pre) => ({ ...pre, tie: pre.tie + 1 }));
      }
   }, [winner]);

   return (
      <main className="min-h-screen bg-[#14bdac]">
         <div className="max-w-7xl mx-auto px-4">
            <div className="lg:pt-20 pt-10 lg:mb-20 mb-10">
               <h1 className="font-semibold text-5xl text-center">
                  <span className="text-gray-700">Tic-</span>
                  <span className="text-gray-200">Tac</span>
                  <span className="text-gray-700">-Toe</span>
               </h1>
            </div>

            <div className="mx-auto max-w-7xl flex flex-col items-center lg:items-start gap-y-10 justify-center lg:grid lg:grid-cols-[auto,auto] lg:gap-x-10">
               <div className="w-[300px] h-[300px] grid grid-cols-3 grid-rows-3 justify-center relative border border-black/10 rounded-lg shadow-md">
                  {squareValues.map((sv, i) => (
                     <Square
                        key={i}
                        squareValue={sv}
                        handleClick={() => handleClick(i)}
                     />
                  ))}
                  <div className="absolute h-1 bg-white top-1/3 -translate-y-2/3 w-[90%] rounded-2xl left-1/2 -translate-x-1/2"></div>
                  <div className="absolute h-1 bg-white top-2/3 -translate-y-1/3 w-[90%] rounded-2xl left-1/2 -translate-x-1/2"></div>
                  <div className="absolute h-[90%] bg-white left-1/3 -translate-x-2/3 w-1 rounded-2xl top-1/2 -translate-y-1/2"></div>
                  <div className="absolute h-[90%] bg-white left-2/3 -translate-x-1/3 w-1 rounded-2xl top-1/2 -translate-y-1/2"></div>
               </div>
               <div>
                  <div className="font-semibold text-3xl space-x-3 flex items-center">
                     <button
                        onClick={() => handleChoosePiece('x')}
                        className={`text-[rgb(84,84,84)] rounded-md px-3 py-1 flex items-center gap-x-2 ${
                           nextPiece === 'x' && !winner
                              ? 'border-t-white/60 border-t-[3px] bg-white/10'
                              : 'border-t-transparent border-t-[3px]'
                        }`}
                     >
                        <span>Player X</span>
                     </button>{' '}
                     <span>
                        {winStat.x} - {winStat.tie} - {winStat.o}
                     </span>{' '}
                     <button
                        onClick={() => handleChoosePiece('o')}
                        className={`text-[rgb(242,235,211)] rounded-md px-3 py-1 flex items-center gap-x-2 ${
                           nextPiece === 'o' && !winner
                              ? 'border-t-white/60 border-t-[3px] bg-white/10'
                              : 'border-t-transparent border-t-[3px]'
                        }`}
                     >
                        <span>Player O</span>
                     </button>
                  </div>
                  <div className="flex justify-center gap-x-4 lg:block lg:justify-start lg:gap-x-0 lg:space-x-4 mt-5 ">
                     <button
                        onClick={handlePlayAgain}
                        className="font-medium text-lg bg-teal-200 px-4 py-1 rounded-md"
                     >
                        Play Again
                     </button>
                     <button
                        onClick={handleResetScore}
                        className="font-medium text-lg bg-rose-200 px-4 py-1 rounded-md"
                     >
                        Reset Score
                     </button>
                  </div>
                  {winner && (
                     <div className="mb-4 mt-10">
                        {winner === 'tie' ? (
                           <h2 className="text-4xl lg:text-5xl font-medium text-center lg:text-left">
                              Ops! It&apos;s a Tie
                           </h2>
                        ) : (
                           <h2 className="text-4xl lg:text-5xl font-medium text-center lg:text-left">
                              Player{' '}
                              <span className="capitalize">{winner}</span> won
                           </h2>
                        )}
                     </div>
                  )}
               </div>
            </div>
            {history.length > 0 && (
               <div className="mt-10">
                  <h2 className="text-xl font-medium text-white/80 mb-2">
                     Game Move History
                  </h2>
                  <div className="bg-white/10 p-4 flex gap-2 flex-wrap">
                     {history.map((h, i) => (
                        <button
                           onClick={() => setSquareValues(h)}
                           key={i}
                           className="bg-orange-100 bg-opacity-50 py-1 px-2 rounded-md font-medium"
                        >
                           Go to move #{i}
                        </button>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </main>
   );
}
