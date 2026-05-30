import { useState, useCallback } from 'react';
import { GameLayout } from '@/components/GameLayout';

const WORD_BANK = [
  'JAVASCRIPT', 'TYPESCRIPT', 'NEOVIM', 'ALGORITHM', 'RECURSION',
  'WEBPACK', 'COMPILER', 'CLOSURE', 'PROMISE', 'ASYNC',
  'BINARY', 'NETWORK', 'PROTOCOL', 'MIDDLEWARE', 'DATABASE',
  'CONTAINER', 'KUBERNETES', 'TERRAFORM', 'PIPELINE', 'WEBHOOK',
  'OVERFLOW', 'POINTER', 'ITERATOR', 'GENERATOR', 'MUTATION',
  'INTERFACE', 'ABSTRACT', 'POLYMORPHISM', 'INHERITANCE', 'ENCAPSULATION',
  'MEDIASOUP', 'WEBRTC', 'SIGNALING', 'LATENCY', 'BANDWIDTH',
  'CRYPTOGRAPHY', 'FIREWALL', 'INTRUSION', 'PAYLOAD', 'EXPLOIT',
  'REPOSITORY', 'MERGE', 'REBASE', 'STASH', 'COMMIT',
  'DECORATOR', 'SINGLETON', 'OBSERVER', 'FACTORY', 'STRATEGY',
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_WRONG = 6;

function pickWord() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

interface HangmanState {
  word: string;
  guessed: Set<string>;
  scores: { wins: number; losses: number };
}

function useHangman() {
  const [state, setState] = useState<HangmanState>({
    word: pickWord(),
    guessed: new Set(),
    scores: { wins: 0, losses: 0 },
  });

  const wrong = [...state.guessed].filter(l => !state.word.includes(l));
  const isWon = state.word.split('').every(l => state.guessed.has(l));
  const isLost = wrong.length >= MAX_WRONG;
  const gameOver = isWon || isLost;

  const guess = useCallback((letter: string) => {
    if (gameOver || state.guessed.has(letter)) return;
    setState(s => {
      const g = new Set(s.guessed);
      g.add(letter);
      const newWrong = [...g].filter(l => !s.word.includes(l));
      const won = s.word.split('').every(l => g.has(l));
      const lost = newWrong.length >= MAX_WRONG;
      return {
        word: s.word,
        guessed: g,
        scores: {
          wins: s.scores.wins + (won ? 1 : 0),
          losses: s.scores.losses + (lost ? 1 : 0),
        },
      };
    });
  }, [gameOver, state.guessed]);

  const reset = useCallback(() => {
    setState(s => ({ word: pickWord(), guessed: new Set(), scores: s.scores }));
  }, []);

  return { ...state, wrong, isWon, isLost, gameOver, guess, reset };
}

function HangmanSVG({ wrong }: { wrong: number }) {
  const show = (n: number) => wrong >= n;
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Gallows */}
      <line x1="20" y1="190" x2="180" y2="190" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="190" x2="60" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="20" x2="130" y2="20" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
      <line x1="130" y1="20" x2="130" y2="44" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
      {/* Parts shown based on wrong count */}
      {show(1) && <circle cx="130" cy="58" r="14" stroke="#ec4899" strokeWidth="2.5" fill="none" />}
      {show(2) && <line x1="130" y1="72" x2="130" y2="120" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />}
      {show(3) && <line x1="130" y1="82" x2="108" y2="105" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />}
      {show(4) && <line x1="130" y1="82" x2="152" y2="105" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />}
      {show(5) && <line x1="130" y1="120" x2="110" y2="148" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />}
      {show(6) && <line x1="130" y1="120" x2="150" y2="148" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />}
    </svg>
  );
}

export function Hangman() {
  const { word, guessed, wrong, isWon, isLost, gameOver, guess, reset, scores } = useHangman();

  const statusText = isWon ? `You got it! 🎉` : isLost ? `The word was "${word}"` : `${MAX_WRONG - wrong.length} guesses left`;
  const statusColor = isWon ? '#a3e635' : isLost ? '#ec4899' : '#8b8a96';

  return (
    <GameLayout number="04" title="Hangman" subtitle="Guess the hidden programming word, one letter at a time." accentColor="#fbbf24">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
        {/* Scoreboard */}
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: 'Wins', value: scores.wins, color: '#a3e635' },
            { label: 'Losses', value: scores.losses, color: '#ec4899' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color, letterSpacing: '-0.04em' }}>{value}</div>
              <div style={{ fontSize: 12, color: '#8b8a96', fontFamily: '"JetBrains Mono", monospace' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* SVG gallows */}
          <HangmanSVG wrong={wrong.length} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            {/* Word display */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              {word.split('').map((letter, i) => (
                <div
                  key={i}
                  style={{
                    width: 38,
                    borderBottom: `2px solid ${guessed.has(letter) ? '#fbbf24' : 'rgba(255,255,255,0.2)'}`,
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#f4f3ee',
                    paddingBottom: 4,
                    minHeight: 36,
                    fontFamily: '"JetBrains Mono", monospace',
                    letterSpacing: '-0.02em',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {guessed.has(letter) || isLost ? letter : ''}
                </div>
              ))}
            </div>

            {/* Wrong letters */}
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: '#ec4899', minHeight: 20 }}>
              {wrong.length > 0 && `Wrong: ${wrong.join(' ')}`}
            </div>

            {/* Status */}
            <p style={{ fontSize: 15, fontWeight: 500, color: statusColor, fontFamily: '"JetBrains Mono", monospace', margin: 0 }}>
              {statusText}
            </p>
          </div>
        </div>

        {/* Keyboard */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
            maxWidth: 480,
            justifyContent: 'center',
          }}
        >
          {ALPHABET.map(letter => {
            const isGuessed = guessed.has(letter);
            const isCorrect = isGuessed && word.includes(letter);
            const isWrong = isGuessed && !word.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => guess(letter)}
                disabled={isGuessed || gameOver}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 8,
                  border: '1px solid',
                  borderColor: isCorrect
                    ? '#a3e635'
                    : isWrong
                    ? 'rgba(236,72,153,0.3)'
                    : 'rgba(255,255,255,0.12)',
                  background: isCorrect
                    ? 'rgba(163,230,53,0.12)'
                    : isWrong
                    ? 'rgba(236,72,153,0.06)'
                    : 'rgba(255,255,255,0.04)',
                  color: isCorrect ? '#a3e635' : isWrong ? 'rgba(236,72,153,0.4)' : '#f4f3ee',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: isGuessed || gameOver ? 'default' : 'pointer',
                  fontFamily: '"JetBrains Mono", monospace',
                  transition: 'background 0.15s, border-color 0.15s, transform 0.1s',
                  opacity: isWrong ? 0.5 : 1,
                }}
                onMouseEnter={e => {
                  if (!isGuessed && !gameOver)
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(251,191,36,0.1)';
                }}
                onMouseLeave={e => {
                  if (!isGuessed && !gameOver)
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Reset */}
        {gameOver && (
          <button
            onClick={reset}
            style={{
              padding: '12px 28px',
              borderRadius: 100,
              background: '#f4f3ee',
              color: '#07070b',
              border: 'none',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: '"JetBrains Mono", monospace',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = 'none')}
          >
            Next word →
          </button>
        )}
      </div>
    </GameLayout>
  );
}
