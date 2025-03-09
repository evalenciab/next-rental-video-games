'use client';

import { Game, useGameStore } from "@/store/gameStore";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface GameCardProps {
	game: Game;
}

export default function GameCard({ game }: GameCardProps) {
	const { data: session } = useSession();
	const { removeGame, toggleRent } = useGameStore();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleRent = async () => {
		if (!session) return;
		setLoading(true);
		const response = await fetch(`/api/games/${game.id}`, {
			method: "PATCH",
		});
		if (response.ok) {
			router.refresh();
		}
		setLoading(false);
	};
	return (
		<Card className="p-4 flex flex-col gap-2">
			<h2 className="text-lg font-semibold">{game.title}</h2>
			<p className="text-sm text-gray-600">{game.genre}</p>
			<p className="text-md font-bold">${game.price}</p>

			<div className="flex justify-between mt-2">
				<Link href={`/games/${game.id}`} className="text-blue-500">
					View Details
				</Link>
				<Button
					onClick={() => removeGame(game.id)}
					className="bg-red-500"
				>
					Delete
				</Button>
			</div>
			<Button
				onClick={handleRent}
				className={`mt-2 w-full ${
					game.rented ? "bg-gray-500" : "bg-green-500"
				}`}
			>
				{game.rented ? "Return" : "Rent"}
			</Button>
		</Card>
	);
}
