import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'; // Ensure it doesn't cache

export async function GET() {
  try {
    const allVotes = await prisma.graamysNomination.findMany();

    // Initialize empty stats object
    const stats: Record<string, Record<string, number>> = {};

    // Calculate totals
    allVotes.forEach((vote: any) => {
      Object.keys(vote).forEach((key) => {
        if (key === 'id' || key === 'createdAt' || key === 'userEmail') return;
        
        const nominee = vote[key];
        if (nominee) {
          if (!stats[key]) stats[key] = {};
          stats[key][nominee] = (stats[key][nominee] || 0) + 1;
        }
      });
    });

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch stats' }, { status: 500 });
  }
}