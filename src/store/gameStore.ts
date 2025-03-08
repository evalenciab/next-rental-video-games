import { create } from "zustand";

export interface Game {
	id: string;
	title: string;
	genre: string;
	price: number;
	rented: boolean;
}

interface GameStore {
	games: Game[];
	addGame: (game: Game) => void;
	removeGame: (id: string) => void;
	toggleRent: (id: string) => void;
}

export const useGameStore = create<GameStore>((set) => ({
	games: [],
	addGame: (game) => set((state) => ({ games: [...state.games, game] })),
	removeGame: (id) =>
		set((state) => ({ games: state.games.filter((g) => g.id !== id) })),
	toggleRent: (id) =>
		set((state) => ({
			games: state.games.map((game) =>
				game.id === id ? { ...game, rented: !game.rented } : game
			),
		})),
}));
