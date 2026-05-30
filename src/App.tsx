import { Routes, Route } from 'react-router-dom';
import { Aurora } from '@/components/Aurora';
import { Nav } from '@/components/Nav';
import { Portfolio } from '@/pages/Portfolio';
import { GamesHub } from '@/pages/games/GamesHub';
import { DinoGame } from '@/pages/games/DinoGame';
import { TicTacToe } from '@/pages/games/TicTacToe';
import { SpaceInvaders } from '@/pages/games/SpaceInvaders';
import { Hangman } from '@/pages/games/Hangman';

export default function App() {
  return (
    <>
      <Aurora />
      <Nav />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/games" element={<GamesHub />} />
          <Route path="/games/dino" element={<DinoGame />} />
          <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/games/space-invaders" element={<SpaceInvaders />} />
          <Route path="/games/hangman" element={<Hangman />} />
        </Routes>
      </main>
    </>
  );
}
