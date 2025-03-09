"use client";

import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { useGameStore } from "@/store/gameStore";
import { Game } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function GameDetails() {
	const { id } = useParams();
	const gameId = Array.isArray(id) ? id[0] : id;
	const { toggleRent } = useGameStore();
	const [game, setGame] = useState<Game | null>(null);
	const [loading, setLoading] = useState(true);
	const { data: session } = useSession();

	useEffect(() => {
		const fetchGame = async () => {
			const response = await fetch(`/api/games/${id}`);
			const data = await response.json();
			setGame(data);
			setLoading(false);
		};

		fetchGame();
	}, [id]);

	const handleRent = async () => {
		if (!session) return;
		setLoading(true);
		const response = await fetch(`/api/games/${id}`, {
			method: "PATCH",
		});
		if (response.ok) {
			const data = await response.json();
			setGame(data);
		}
		setLoading(false);
	};

	if (loading) return <div>Loading...</div>;
	if (!game) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1 className="text-2xl font-bold">{game.title}</h1>
			<p>{game.genre}</p>
			<p>${game.price}</p>
			<p className={`${game.rented ? "text-red-500" : "text-green-500"}`}>
				{game.rented ? "Rented" : "Available"}
			</p>
			{session ? (
				<Button
					onClick={handleRent}
					className={`mt-4 ${
						game.rented ? "bg-gray-500" : "bg-green-500"
					}`}
				>
					{game.rented ? "Return Game" : "Rent Game"}
				</Button>
			) : (
				<p className="text-red-500 mt-4">Sign in to rent this game.</p>
			)}
		</div>
	);
}
