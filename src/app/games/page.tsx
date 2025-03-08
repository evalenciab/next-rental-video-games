"use client";

import { useGameStore } from "@/store/gameStore";
import GameCard from "@/components/GameCard";

export default function GamesPage() {
    const { games } = useGameStore();

    return (
        <div>
            <h1 className="text-2xl font-bold">Available Games</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
}
