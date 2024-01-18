const winCombos = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 4, 8],
   [6, 4, 2],
   [2, 5, 8],
   [1, 4, 7],
   [0, 3, 6],
];

function emptySquares(origBoard) {
   return origBoard.filter((elm, i) => i === elm);
}

function checkWin(board, player) {
   let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
   let gameWon = null;
   for (let [index, win] of winCombos.entries()) {
      if (win.every((elem) => plays.indexOf(elem) > -1)) {
         gameWon = { index: index, player: player };
         break;
      }
   }
   return gameWon;
}

export default function getBestMove(huPlayer, aiPlayer) {
   return function minimax(newBoard, player) {
      var availSpots = emptySquares(newBoard);

      if (checkWin(newBoard, huPlayer)) {
         return { score: -10 };
      } else if (checkWin(newBoard, aiPlayer)) {
         return { score: 10 };
      } else if (availSpots.length === 0) {
         return { score: 0 };
      }

      var moves = [];
      for (let i = 0; i < availSpots.length; i++) {
         var move = {};
         move.index = newBoard[availSpots[i]];
         newBoard[availSpots[i]] = player;

         if (player === aiPlayer)
            move.score = minimax(newBoard, huPlayer).score;
         else move.score = minimax(newBoard, aiPlayer).score;
         newBoard[availSpots[i]] = move.index;
         if (
            (player === aiPlayer && move.score === 10) ||
            (player === huPlayer && move.score === -10)
         )
            return move;
         else moves.push(move);
      }

      let bestMove, bestScore;
      if (player === aiPlayer) {
         bestScore = -1000;
         for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
               bestScore = moves[i].score;
               bestMove = i;
            }
         }
      } else {
         bestScore = 1000;
         for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
               bestScore = moves[i].score;
               bestMove = i;
            }
         }
      }

      return moves[bestMove];
   };
}
