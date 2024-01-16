export default function MoveHistory({
   setSquareValues,
   setNextPiece,
   history,
}) {
   return (
      <div className="mt-10">
         <h2 className="text-xl font-medium text-white/80 mb-2">
            Game Move History
         </h2>
         <div className="bg-white/10 p-4 flex gap-2 flex-wrap">
            {history.map((historyObj, i) => (
               <button
                  onClick={() => {
                     setSquareValues(historyObj.squareValues);
                     setNextPiece(historyObj.nextPiece === 'x' ? 'o' : 'x');
                  }}
                  key={i}
                  className="bg-orange-100 bg-opacity-50 py-1 px-2 rounded-md font-medium"
               >
                  Go to move #{i + 1}
               </button>
            ))}
         </div>
      </div>
   );
}
