import { z } from "zod";

export const gameSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    genre: z.string().min(3, "Genre must be at least 3 characters"),
    price: z.number().min(1, "Price must be at least $1"),
});
