"use client";

import { useGameStore } from "@/store/gameStore";
import GameCard from "@/components/GameCard";
import AddGameForm from "@/components/AddGameForm";

export default function GamesPage() {
    const { games } = useGameStore();

    return (
        <div>
            <h1 className="text-2xl font-bold">Available Games</h1>
            {/* Add Game Form */}
            <AddGameForm />
            <div className="grid grid-cols-3 gap-4 mt-4">
                {games.length > 0 ? (
                    games.map((game) => <GameCard key={game.id} game={game} />)
                ) : (
                    <p className="text-gray-500">No games available. Add a new game.</p>
                )}
            </div>
        </div>
    );
}
