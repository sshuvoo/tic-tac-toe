import { useEffect, useState } from 'react';
import calcWinner from './utils/calculateWinner';
import xAudio from './assets/x.mp3';
import oAudio from './assets/o.mp3';
import gameOverAudio from './assets/game-over.mp3';
import victoryAudio from './assets/victory.mp3';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import getBestMove from './utils/getBestMove';
const audioX = new Audio(xAudio);
const audioO = new Audio(oAudio);
const audioGameOver = new Audio(gameOverAudio);
const audioVictory = new Audio(victoryAudio);

export default function App() {
   const [squareValues, setSquareValues] = useState(Array(9).fill(null));
   const [nextPiece, setNextPiece] = useState('x');
   const [humanPiece, setHumanPiece] = useState('x');
   const [enginePiece, setEnginePiece] = useState('o');
   const [playWith, setPlayWith] = useState('computer');
   const [engineMove, setEngineMove] = useState(false);
   const [difficulty, setDifficulty] = useState('easy');
   const [winStat, setWinStat] = useState({ x: 0, o: 0, tie: 0 });
   const winner = calcWinner(squareValues);
   const { result } = winner;
   const handleClick = (i) => {
      if (!squareValues[i] && !winner.result && !engineMove) {
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
      if (
         engineMove &&
         !winner.result &&
         playWith === 'computer' &&
         difficulty === 'easy'
      ) {
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
   }, [engineMove, squareValues, nextPiece, winner, difficulty, playWith]);

   useEffect(() => {
      if (
         engineMove &&
         !winner.result &&
         playWith === 'computer' &&
         difficulty === 'hard'
      ) {
         const indexedSV = squareValues.map((sv, i) => (sv === null ? i : sv));
         const bestMove = getBestMove(humanPiece, enginePiece)(
            indexedSV,
            enginePiece
         )?.index;
         const updatedSqureValues = squareValues.map((sv, index) => {
            if (index === bestMove) return nextPiece;
            else return sv;
         });
         setTimeout(() => {
            setSquareValues(updatedSqureValues);
            nextPiece === 'x' ? audioX.play() : audioO.play();
            setNextPiece((pre) => (pre === 'x' ? 'o' : 'x'));
            setEngineMove(false);
         }, 500);
      }
   }, [
      engineMove,
      squareValues,
      nextPiece,
      winner,
      difficulty,
      enginePiece,
      humanPiece,
      playWith,
   ]);

   const handlePlayAgain = () => {
      setSquareValues(Array(9).fill(null));
   };

   const handleResetScore = () => {
      setWinStat({ x: 0, o: 0, tie: 0 });
      handlePlayAgain();
   };

   const handleChoosePiece = (piece) => {
      if (squareValues.every((sv) => sv === null)) {
         setNextPiece(piece);
         setHumanPiece(piece);
         setEnginePiece(piece === 'x' ? 'o' : 'x');
      }
   };

   useEffect(() => {
      if (result) {
         if (result === 'x' || result === 'o') audioVictory.play();
         else audioGameOver.play();
         if (result === 'x') setWinStat((pre) => ({ ...pre, x: pre.x + 1 }));
         if (result === 'o') setWinStat((pre) => ({ ...pre, o: pre.o + 1 }));
         if (result === 'tie')
            setWinStat((pre) => ({ ...pre, tie: pre.tie + 1 }));
      }
   }, [result]);

   return (
      <main className="min-h-screen bg-gradient-to-r from-[#141e30] to-[#243b55]">
         <div className="max-w-7xl mx-auto px-4">
            <Header />

            <div className="mx-auto max-w-7xl flex flex-col items-center lg:items-start gap-y-10 justify-center lg:grid lg:grid-cols-[auto,auto] lg:gap-x-10">
               <GameBoard
                  squareValues={squareValues}
                  handleClick={handleClick}
                  winner={winner}
               />
               <div>
                  <div className="font-semibold text-lg sm:text-3xl space-x-3 flex items-center">
                     <button
                        onClick={() => handleChoosePiece('x')}
                        className={`text-[#14bdac] rounded-md px-3 py-1 flex items-center gap-x-2 ${
                           nextPiece === 'x' && !winner.result
                              ? 'border-t-white/60 border-t-[3px] bg-white/10'
                              : 'border-t-transparent border-t-[3px]'
                        }`}
                     >
                        <span>Player X</span>
                     </button>{' '}
                     <span>
                        <span
                           className={
                              winStat.o === winStat.x
                                 ? 'text-white/60'
                                 : winStat.o < winStat.x
                                 ? 'text-teal-400'
                                 : 'text-rose-400'
                           }
                        >
                           {winStat.x}
                        </span>{' '}
                        - <span className="text-orange-300">{winStat.tie}</span>{' '}
                        -{' '}
                        <span
                           className={
                              winStat.o === winStat.x
                                 ? 'text-white/60'
                                 : winStat.o > winStat.x
                                 ? 'text-teal-400'
                                 : 'text-rose-400'
                           }
                        >
                           {winStat.o}
                        </span>
                     </span>{' '}
                     <button
                        onClick={() => handleChoosePiece('o')}
                        className={`text-[rgb(242,235,211)] rounded-md px-3 py-1 flex items-center gap-x-2 ${
                           nextPiece === 'o' && !winner.result
                              ? 'border-t-white/60 border-t-[3px] bg-white/10'
                              : 'border-t-transparent border-t-[3px]'
                        }`}
                     >
                        <span>Player O</span>
                     </button>
                  </div>
                  <div className="mt-5 space-x-4">
                     <select
                        onChange={(e) => {
                           setPlayWith(e.target.value);
                           handlePlayAgain();
                        }}
                        value={playWith}
                        className="px-2 py-1 font-medium text-xl rounded-md bg-sky-500/20 text-sky-400 focus:outline-none"
                     >
                        <option value={'friend'}>Play with Friend</option>
                        <option value={'computer'}>Play with AI</option>
                     </select>
                     {playWith === 'computer' && (
                        <select
                           onChange={(e) => {
                              setDifficulty(e.target.value);
                              handlePlayAgain();
                           }}
                           value={difficulty}
                           className="px-2 py-1 font-medium text-xl rounded-md bg-sky-500/20 text-sky-400 focus:outline-none"
                        >
                           <option value={'easy'}>Easy</option>
                           <option value={'hard'}>Hard</option>
                        </select>
                     )}
                  </div>
                  <div className="flex justify-center gap-x-4 lg:block lg:justify-start lg:gap-x-0 lg:space-x-4 mt-5 ">
                     <button
                        onClick={handlePlayAgain}
                        className="font-medium text-lg bg-sky-500/20 text-sky-400 px-4 py-1 rounded-md"
                     >
                        Play Again
                     </button>
                     <button
                        onClick={handleResetScore}
                        className="font-medium text-lg bg-sky-500/20 text-sky-400 px-4 py-1 rounded-md"
                     >
                        Reset Score
                     </button>
                  </div>
                  {winner.result && (
                     <div className="mb-4 mt-10">
                        {winner.result === 'tie' ? (
                           <h2 className="text-4xl lg:text-5xl font-medium text-center lg:text-left text-orange-400">
                              Ops! It&apos;s a Tie 🥺
                           </h2>
                        ) : (
                           <h2 className="text-4xl lg:text-5xl font-medium text-center lg:text-left text-teal-400">
                              {playWith === 'computer' &&
                                 winner.result === humanPiece && (
                                    <span>
                                       {/* Player{' '}
                                    <span className="capitalize">
                                       {winner.result}
                                    </span>{' '} */}
                                       You won! AI lost.
                                    </span>
                                 )}
                              {playWith === 'computer' &&
                                 winner.result === enginePiece && (
                                    <span>
                                       {/* Player{' '}
                                       <span className="capitalize">
                                          {winner.result}
                                       </span>{' '}
                                       won */}
                                       AI Won! You lost.
                                    </span>
                                 )}
                              {playWith === 'friend' && (
                                 <span>
                                    Player{' '}
                                    <span className="capitalize">
                                       {winner.result}
                                    </span>{' '}
                                    won
                                 </span>
                              )}
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
