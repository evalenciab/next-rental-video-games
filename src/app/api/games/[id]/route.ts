import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request, {params}: {params: {id: string}}) {
	try {
		const {id} = params;
		const game = await prisma.game.findUnique({where: {id}});

		if (!game) {
			return NextResponse.json({error: "Game not found"}, {status: 404});
		}
		const updateGame = await prisma.game.update({
			where: {id},
			data: {rented: !game.rented},
		});
		return NextResponse.json(updateGame);
	} catch (error) {
		return NextResponse.json({error: "Failed to update game"}, {status: 500});
	}
}

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
	try {
		await prisma.game.delete({where: {id: params.id}});
		return NextResponse.json({message: "Game deleted"});
	} catch (error) {
		return NextResponse.json({error: "Failed to delete game"}, {status: 500});
	}
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
	try {
		console.log("Received params:", params); // Add logging

		if (!params?.id) {
			console.log("No game id provided");
			return NextResponse.json({error: "No game id provided"}, {status: 400});
		}
		console.log('Checking for game...' + params.id);
		const game = await prisma.game.findUnique({where: {id: params.id}});
		if (!game) {
			console.log("Game not found");
			return NextResponse.json({error: "Game not found"}, {status: 404});
		}
		console.log("Game found");
		return NextResponse.json(game);
	} catch (error) {
		console.error("Failed to get game", error);
		return NextResponse.json({error: "Failed to get game"}, {status: 500});
	}
}