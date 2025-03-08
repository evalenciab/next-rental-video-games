"use client";

import { useGameStore } from "@/store/gameStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { gameSchema } from "@/lib/validators";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type GameFormData = z.infer<typeof gameSchema>;

export default function AddGameForm() {
    const { addGame } = useGameStore();
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<GameFormData>({
        resolver: zodResolver(gameSchema),
    });

    const onSubmit = (data: GameFormData) => {
        try {
            addGame({ id: uuidv4(), ...data, rented: false });
            reset(); // Clear form after submission
            setError(null);
        } catch (err) {
            setError("Failed to add game. Please try again.");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Game</h2>

            <div className="mb-2">
                <label className="block text-sm font-medium">Title</label>
                <Input {...register("title")} placeholder="Game Title" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium">Genre</label>
                <Input {...register("genre")} placeholder="Game Genre" />
                {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium">Price ($)</label>
                <Input {...register("price", { valueAsNumber: true })} type="number" placeholder="Price" />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="mt-4 w-full">Add Game</Button>
        </form>
    );
}
