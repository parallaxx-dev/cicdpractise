import { useState, useCallback } from 'react';
import { GameLayout } from '@/components/GameLayout';

type Cell = 'X' | 'O' | null;
type Board = Cell[];

function checkWinner(board: Board): Cell | 'draw' | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(c => c !== null)) return 'draw';
  return null;
}

function getWinLine(board: Board): number[] | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return line;
  }
  return null;
}

function minimax(board: Board, isMax: boolean, depth: number): number {
  const winner = checkWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (winner === 'draw') return 0;

  const moves = board.map((c, i) => c === null ? i : -1).filter(i => i >= 0);
  if (isMax) {
    return Math.max(...moves.map(i => {
      const b = [...board]; b[i] = 'O';
      return minimax(b, false, depth + 1);
    }));
  }
  return Math.min(...moves.map(i => {
    const b = [...board]; b[i] = 'X';
    return minimax(b, true, depth + 1);
  }));
}

function bestMove(board: Board): number {
  const moves = board.map((c, i) => c === null ? i : -1).filter(i => i >= 0);
  let best = -Infinity, bestIdx = moves[0];
  for (const i of moves) {
    const b = [...board]; b[i] = 'O';
    const score = minimax(b, false, 0);
    if (score > best) { best = score; bestIdx = i; }
  }
  return bestIdx;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [scores, setScores] = useState({ player: 0, ai: 0, draws: 0 });

  const winner = checkWinner(board);
  const winLine = getWinLine(board);
  const gameOver = winner !== null;

  const handleClick = useCallback(
    (idx: number) => {
      if (!isPlayerTurn || board[idx] || gameOver) return;
      const newBoard = [...board];
      newBoard[idx] = 'X';
      const w = checkWinner(newBoard);
      if (w) {
        setBoard(newBoard);
        if (w === 'X') setScores(s => ({ ...s, player: s.player + 1 }));
        else if (w === 'draw') setScores(s => ({ ...s, draws: s.draws + 1 }));
        return;
      }
      setIsPlayerTurn(false);
      setTimeout(() => {
        const aiIdx = bestMove(newBoard);
        const afterAi = [...newBoard];
        afterAi[aiIdx] = 'O';
        const w2 = checkWinner(afterAi);
        setBoard(afterAi);
        if (w2 === 'O') setScores(s => ({ ...s, ai: s.ai + 1 }));
        else if (w2 === 'draw') setScores(s => ({ ...s, draws: s.draws + 1 }));
        setIsPlayerTurn(true);
      }, 280);
    },
    [board, isPlayerTurn, gameOver],
  );

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
  };

  const statusText = gameOver
    ? winner === 'X'
      ? 'You win! 🎉'
      : winner === 'O'
      ? 'AI wins — unbeatable.'
      : "It's a draw!"
    : isPlayerTurn
    ? 'Your turn (X)'
    : 'AI is thinking…';

  const statusColor = gameOver
    ? winner === 'X'
      ? '#a3e635'
      : winner === 'O'
      ? '#ec4899'
      : '#fbbf24'
    : '#8b8a96';

  return (
    <GameLayout number="02" title="Tic Tac Toe" subtitle="You are X. The AI uses minimax — good luck." accentColor="#8b5cf6">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        {/* Scoreboard */}
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: 'You (X)', value: scores.player, color: '#8b5cf6' },
            { label: 'Draws', value: scores.draws, color: '#8b8a96' },
            { label: 'AI (O)', value: scores.ai, color: '#ec4899' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: '-0.04em' }}>{value}</div>
              <div style={{ fontSize: 12, color: '#8b8a96', fontFamily: '"JetBrains Mono", monospace' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Status */}
        <p style={{ fontSize: 16, fontWeight: 500, color: statusColor, fontFamily: '"JetBrains Mono", monospace', margin: 0, minHeight: 24 }}>
          {statusText}
        </p>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            width: '100%',
            maxWidth: 360,
          }}
        >
          {board.map((cell, i) => {
            const isWinCell = winLine?.includes(i);
            return (
              <button
                key={i}
                onClick={() => handleClick(i)}
                disabled={!!cell || gameOver || !isPlayerTurn}
                style={{
                  aspectRatio: '1',
                  background: isWinCell ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
                  border: isWinCell
                    ? '1px solid rgba(139,92,246,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14,
                  cursor: cell || gameOver || !isPlayerTurn ? 'default' : 'pointer',
                  fontSize: 40,
                  fontWeight: 700,
                  color: cell === 'X' ? '#8b5cf6' : '#ec4899',
                  transition: 'background 0.15s, border-color 0.15s, transform 0.1s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={e => {
                  if (!cell && !gameOver && isPlayerTurn)
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(139,92,246,0.08)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = isWinCell
                    ? 'rgba(139,92,246,0.15)'
                    : 'rgba(255,255,255,0.03)';
                }}
              >
                {cell}
              </button>
            );
          })}
        </div>

        {/* Restart */}
        <button
          onClick={reset}
          style={{
            padding: '12px 28px',
            borderRadius: 100,
            background: gameOver ? '#f4f3ee' : 'rgba(255,255,255,0.06)',
            color: gameOver ? '#07070b' : '#f4f3ee',
            border: gameOver ? 'none' : '1px solid rgba(255,255,255,0.12)',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.15s',
            fontFamily: '"JetBrains Mono", monospace',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'none')}
        >
          New game
        </button>
      </div>
    </GameLayout>
  );
}
