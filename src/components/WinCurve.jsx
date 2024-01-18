import { useEffect, useState } from 'react';

export default function WinCurve({ winner }) {
   const [r1, setR1] = useState(false);
   const [r2, setR2] = useState(false);
   const [r3, setR3] = useState(false);
   const [c1, setC1] = useState(false);
   const [c2, setC2] = useState(false);
   const [c3, setC3] = useState(false);
   const [d1, setD1] = useState(false);
   const [d2, setD2] = useState(false);
   const { pattern } = winner;

   useEffect(() => {
      if (pattern.length === 3) {
         if (
            pattern.includes(0) &&
            pattern.includes(1) &&
            pattern.includes(2)
         ) {
            setR1(true);
            setTimeout(() => {
               setR1(false);
            }, 2000);
         }
         if (
            pattern.includes(3) &&
            pattern.includes(4) &&
            pattern.includes(5)
         ) {
            setR2(true);
            setTimeout(() => {
               setR2(false);
            }, 2000);
         }
         if (
            pattern.includes(6) &&
            pattern.includes(7) &&
            pattern.includes(8)
         ) {
            setR3(true);
            setTimeout(() => {
               setR3(false);
            }, 2000);
         }
         if (
            pattern.includes(0) &&
            pattern.includes(3) &&
            pattern.includes(6)
         ) {
            setC1(true);
            setTimeout(() => {
               setC1(false);
            }, 2000);
         }
         if (
            pattern.includes(1) &&
            pattern.includes(4) &&
            pattern.includes(7)
         ) {
            setC2(true);
            setTimeout(() => {
               setC2(false);
            }, 2000);
         }
         if (
            pattern.includes(2) &&
            pattern.includes(5) &&
            pattern.includes(8)
         ) {
            setC3(true);
            setTimeout(() => {
               setC3(false);
            }, 2000);
         }
         if (
            pattern.includes(0) &&
            pattern.includes(4) &&
            pattern.includes(8)
         ) {
            setD1(true);
            setTimeout(() => {
               setD1(false);
            }, 2000);
         }
         if (
            pattern.includes(2) &&
            pattern.includes(4) &&
            pattern.includes(6)
         ) {
            setD2(true);
            setTimeout(() => {
               setD2(false);
            }, 2000);
         }
      }
   }, [pattern]);

   return (
      <>
         {r1 && (
            <div className="absolute top-[16.666666%] -translate-y-[83.333333%] h-1 animate-draw-x-line left-1/2 -translate-x-1/2 bg-orange-300 w-full z-10 rounded-lg"></div>
         )}
         {r2 && (
            <div className="absolute top-1/2 -translate-y-1/2 h-1 animate-draw-x-line left-1/2 -translate-x-1/2 bg-orange-300 w-full z-10 rounded-lg"></div>
         )}
         {r3 && (
            <div className="absolute top-[83.333333%] -translate-y-[16.666666%] h-1 animate-draw-x-line left-1/2 -translate-x-1/2 bg-orange-300 w-full z-10 rounded-lg"></div>
         )}
         {c1 && (
            <div className="absolute left-[16.666666%] -translate-x-[83.333333%] w-1 animate-draw-y-line top-1/2 -translate-y-1/2 bg-orange-300 h-full z-10 rounded-lg"></div>
         )}
         {c2 && (
            <div className="absolute left-1/2 -translate-x-1/2 w-1 animate-draw-y-line top-1/2 -translate-y-1/2 bg-orange-300 h-full z-10 rounded-lg"></div>
         )}
         {c3 && (
            <div className="absolute left-[83.333333%] -translate-x-[16.666666%] w-1 animate-draw-y-line top-1/2 -translate-y-1/2 bg-orange-300 h-full z-10 rounded-lg"></div>
         )}

         {d1 && (
            <div className="absolute top-1/2 -translate-y-1/2 h-1 animate-draw-x-diagonal left-1/2 -translate-x-1/2 bg-orange-300 w-[305px] rotate-45 z-10 rounded-lg"></div>
         )}
         {d2 && (
            <div className="absolute top-1/2 -translate-y-1/2 h-1 animate-draw-x-diagonal left-1/2 -translate-x-1/2 bg-orange-300 w-[305px] -rotate-45 z-10 rounded-lg"></div>
         )}
      </>
   );
}
