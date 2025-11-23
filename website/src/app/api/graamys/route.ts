// app/api/graamys/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Save to Database
    const nomination = await prisma.graamysNomination.create({
      data: {
        academicWeapon: body.academic,
        dancer: body.dancer,
        melodiousVoice: body.voice,
        olympian: body.olympian,
        gymshark: body.gymshark,
        fashionIcon: body.fashion,
        bestCook: body.cook,
        bestEvent: body.event,
        bestSociety: body.society,
      },
    });

    return NextResponse.json({ success: true, id: nomination.id });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json({ success: false, error: 'Failed to submit' }, { status: 500 });
  }
}