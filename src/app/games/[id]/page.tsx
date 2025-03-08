'use client';

import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { useGameStore } from "@/store/gameStore";
import { Game } from "@prisma/client";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function GameDetails() {
	const { id } = useParams();
	const gameId = Array.isArray(id) ? id[0] : id;
    const { toggleRent } = useGameStore();
	const [game, setGame] = useState<Game | null>(null);
    
	const fetchGameData = async (gameId: string | undefined) => {
		try {
			if (!gameId) {
				console.error("No game id provided");
				return null;
			}
			const response = await fetch(`/api/games/${gameId}`, {
				method: "GET",
			});
		
			if (!response.ok) {
				throw new Error("Failed to fetch game");
			}
			const game = await response.json();
			return game;
		} catch (error) {
			console.error("Failed to fetch game data", error);
			return null;
		}
	}

	useEffect(() => {
        if (gameId) {
            fetchGameData(gameId).then(data => {
                if (data) {
                    setGame(data);
                }
            });
        }
    }, [gameId]);

	if (!game) {
		return <div>Loading...</div>;
	}

    return (
        <div>
            <h1 className="text-2xl font-bold">{game.title}</h1>
            <p>{game.genre}</p>
            <p>${game.price}</p>
			<p className={`${game.rented ? 'text-red-500':'text-green-500'}`}>{game.rented ? "Rented" : 'Available'}</p>
			<Button
				onClick={() => toggleRent(game.id)}
				className={`mt-2 w-full ${game.rented ? "bg-gray-500" : "bg-green-500"}`}
			>
				{game.rented ? "Return Game" : "Rent Game"}
			</Button>	
        </div>
    );
}
