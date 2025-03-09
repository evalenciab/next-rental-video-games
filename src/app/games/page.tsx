'use client';

import GameCard from "@/components/GameCard";
import AddGameForm from "@/components/AddGameForm";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button";

export default function GamesPage() {
	const [games, setGames] = useState([]);
	const [search, setSearch] = useState("");
	const [genre, setGenre] = useState("");
	const [rented, setRented] = useState("");

	useEffect(() => {
		const fetchGames = async () => {
			const params = new URLSearchParams();
			if (search) params.append("search", search);
			if (genre) params.append("genre", genre);
			if (rented) params.append("rented", rented);

			const response = await fetch(`/api/games?${params.toString()}`);
			const data = await response.json();
			setGames(data);
		}
		fetchGames();
	}, [search, genre, rented]);
    //const games = await prisma.game.findMany();

    return (
        <div>
            <h1 className="text-2xl font-bold">Available Games</h1>
			{/** Search & Filters */}
			<div className="flex gap-4 mt-4">
				<Input
					placeholder="Search games..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Select value={genre} onValueChange={(val) => setGenre(val)}>
					<SelectTrigger>
						<SelectValue placeholder="Genre"/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="ALL">All</SelectItem>
						<SelectItem value="Action">Action</SelectItem>
						<SelectItem value="Adventure">Adventure</SelectItem>
						<SelectItem value="RPG">RPG</SelectItem>
						<SelectItem value="Simulation">Simulation</SelectItem>
						<SelectItem value="Strategy">Strategy</SelectItem>
					</SelectContent>
				</Select>
				<Select value={rented} onValueChange={(val) => setRented(val)}>
					<SelectTrigger>
						<SelectValue placeholder="Status"/>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="ALL">All</SelectItem>
						<SelectItem value="true">Rented</SelectItem>
						<SelectItem value="false">Available</SelectItem>
					</SelectContent>
				</Select>

				<Button onClick={() => { setSearch(""); setGenre(""); setRented(""); }}>
				Reset
				</Button>
			</div>
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
