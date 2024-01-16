import { useEffect, useState } from 'react';
import calcWinner from './utils/calculateWinner';
import xAudio from './assets/x.mp3';
import oAudio from './assets/o.mp3';
import gameOverAudio from './assets/game-over.mp3';
import victoryAudio from './assets/victory.mp3';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
const audioX = new Audio(xAudio);
const audioO = new Audio(oAudio);

export default function App() {
   const [squareValues, setSquareValues] = useState(Array(9).fill(null));
   const [nextPiece, setNextPiece] = useState('x');
   const [playWith, setPlayWith] = useState('computer');
   const [engineMove, setEngineMove] = useState(false);
   const [difficulty, setDifficulty] = useState('easy');
   const [winStat, setWinStat] = useState({ x: 0, o: 0, tie: 0 });
   const winner = calcWinner(squareValues);

   const handleClick = (i) => {
      if (!squareValues[i] && !winner && !engineMove) {
         const updatedSqureValues = squareValues.map((sv, index) => {
            if (index === i) return nextPiece;
            else return sv;
         });
         setSquareValues(updatedSqureValues);
         setNextPiece((pre) => (pre === 'x' ? 'o' : 'x'));
         nextPiece === 'x' ? audioX.play() : audioO.play();
         if (playWith === 'computer') setEngineMove(true);
      }
   };

   useEffect(() => {
      if (engineMove && !winner) {
         const availableSquare = [];
         squareValues.forEach((square, index) => {
            if (square === null) availableSquare.push(index);
         });
         if (availableSquare.length > 0) {
            const randomIndex = Math.floor(
               Math.random() * availableSquare.length
            );
            const updatedSqureValues = squareValues.map((sv, index) => {
               if (index === availableSquare[randomIndex]) return nextPiece;
               else return sv;
            });
            setTimeout(() => {
               setSquareValues(updatedSqureValues);
               nextPiece === 'x' ? audioX.play() : audioO.play();
               setNextPiece((pre) => (pre === 'x' ? 'o' : 'x'));
               setEngineMove(false);
            }, 500);
         }
      }
   }, [engineMove, squareValues, nextPiece, winner]);

   const handlePlayAgain = () => {
      setSquareValues(Array(9).fill(null));
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
            <Header />

            <div className="mx-auto max-w-7xl flex flex-col items-center lg:items-start gap-y-10 justify-center lg:grid lg:grid-cols-[auto,auto] lg:gap-x-10">
               <GameBoard
                  squareValues={squareValues}
                  handleClick={handleClick}
               />
               <div>
                  <div className="font-semibold text-lg sm:text-3xl space-x-3 flex items-center">
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
                  <div className="mt-5 space-x-4">
                     <select
                        onChange={(e) => setPlayWith(e.target.value)}
                        value={playWith}
                        className="px-2 py-1 font-medium text-xl rounded-md bg-teal-200 focus:outline-none"
                     >
                        <option value={'friend'}>Play with Friend</option>
                        <option value={'computer'}>Play with Computer</option>
                     </select>
                     <select
                        onChange={(e) => setDifficulty(e.target.value)}
                        value={difficulty}
                        className="px-2 py-1 font-medium text-xl rounded-md bg-teal-200 focus:outline-none"
                     >
                        <option value={'easy'}>Easy</option>
                        <option value={'hard'}>Hard</option>
                     </select>
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
         </div>
      </main>
   );
}
