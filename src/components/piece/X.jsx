import { useEffect, useState } from 'react';

export default function X() {
   const [delay, setDelay] = useState(false);

   useEffect(() => {
      setTimeout(() => {
         setDelay(true);
      }, 150);
   }, []);

   return (
      <svg
         className="w-14"
         viewBox="0 0 128 128"
         stroke="rgb(84, 84, 84)"
         strokeDasharray="135.764"
         strokeDashoffset="0"
      >
         <path
            className="fill-none stroke-[16px] animate-draw-x"
            d="M16,16L112,112"
         />
         {delay && (
            <path
               className="fill-none stroke-[16px] animate-draw-x"
               d="M112,16L16,112"
            />
         )}
      </svg>
   );
}
