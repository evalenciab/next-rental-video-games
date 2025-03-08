import { Game, useGameStore } from "@/store/gameStore";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    const { removeGame } = useGameStore();

    return (
        <Card className="p-4">
            <h2 className="text-lg font-semibold">{game.title}</h2>
            <p className="text-sm text-gray-600">{game.genre}</p>
            <p className="text-md font-bold">${game.price}</p>
            <Link href={`/games/${game.id}`} className="text-blue-500">
                View Details
            </Link>
            <Button onClick={() => removeGame(game.id)} className="bg-red-500">
                Delete
            </Button>
        </Card>
    );
}
