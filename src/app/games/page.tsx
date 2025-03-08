import GameCard from "@/components/GameCard";
import AddGameForm from "@/components/AddGameForm";
import prisma from "@/lib/prisma";

export default async function GamesPage() {
    const games = await prisma.game.findMany();

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
