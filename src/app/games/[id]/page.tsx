"use client";

import { useGameStore } from "@/store/gameStore";
import { useParams } from "next/navigation";

export default function GameDetails() {
    const { id } = useParams();
    const { games } = useGameStore();
    const game = games.find((g) => g.id === id);

    if (!game) return <p>Game not found</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold">{game.title}</h1>
            <p>{game.genre}</p>
            <p>${game.price}</p>
        </div>
    );
}
