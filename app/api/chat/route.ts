// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	try {
		const { userId, messages } = await request.json();

		const chat = await prisma.chat.create({
			data: {
				userId,
				messages,
			},
		});

		return NextResponse.json(chat);
	} catch (error: unknown) {
		console.error(error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json(
			{
				error: errorMessage,
			},
			{ status: 500 }
		);
	}
}
