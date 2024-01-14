import O from './piece/O';
import X from './piece/X';

export default function Square({ squareValue, handleClick }) {
   return (
      <button
         onClick={handleClick}
         className="text-8xl flex justify-center items-center"
      >
         {squareValue === 'x' ? <X /> : squareValue === 'o' && <O />}
      </button>
   );
}
