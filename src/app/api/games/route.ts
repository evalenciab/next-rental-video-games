import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
	const {searchParams} = new URL(req.url);
	const search = searchParams.get('search') || '';
	const genre = searchParams.get('genre');
	const rented = searchParams.get('rented');

	const games = await prisma.game.findMany({
		where: {
			title: {
				contains: search,
				mode: 'insensitive',
			},
			genre: genre || undefined,
			rented: rented === 'true' ? true : rented === 'false' ? false : undefined,
		},
	});
	return NextResponse.json(games);
}

export async function POST(req: Request) {
	try {
		const {title, genre, price} = await req.json();
		const game = await prisma.game.create({
			data: {
				title,
				genre,
				price: Number(price),
			},
		});
		return NextResponse.json(game);
	} catch (error) {
		return NextResponse.json({error: 'Failed to create game'}, {status: 500});
	}
}