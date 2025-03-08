import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import GameCard from "@/components/GameCard";

export default async function ProfilePage() {
	const session = await getServerSession(authOptions);
	if (!session) return <p>Please log in to see your rented games.</p>

	const games = await prisma.game.findMany({
		where: { userId: session.user.id },
	});

	return (
		<div>
			<h1 className="tex-2xl font-bold mb-4">My Rented Games</h1>
			<div className="grid grid-cols-3 gap-4">
				{
					games.length > 0 ? (
						games.map((game) => <GameCard key={game.id} game={game} />)
					) : (
						<p>You haven't rented any games yet.</p>
					)
				}
			</div>
		</div>
	)
}