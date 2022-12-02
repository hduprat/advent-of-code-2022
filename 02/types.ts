export type Move = "🪨" | "📄" | "✂️";
export type Strategy = "win" | "draw" | "lose";

export interface Round {
  you: Move;
  opponent: Move;
}

export interface RoundStrategy {
  opponent: Move;
  strategy: Strategy;
}
