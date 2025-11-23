import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper to count votes (Same as before)
function countVotes(votes: any[], category: string) {
  const tally: Record<string, number> = {};
  votes.forEach((vote) => {
    const nominee = vote[category];
    if (nominee && nominee.trim() !== "") {
      const key = nominee.trim(); 
      tally[key] = (tally[key] || 0) + 1;
    }
  });
  return Object.entries(tally)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export async function POST(req: Request) {
  try {
    // 1. SECURITY CHECK
    const body = await req.json();
    const providedPassword = body.password;

    if (providedPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // 2. FETCH DATA (Only if password is correct)
    const allVotes = await prisma.graamysNomination.findMany();

    const results = {
      totalVotes: allVotes.length,
      academicWeapon: countVotes(allVotes, 'academicWeapon'),
      dancer: countVotes(allVotes, 'dancer'),
      melodiousVoice: countVotes(allVotes, 'melodiousVoice'),
      olympian: countVotes(allVotes, 'olympian'),
      gymshark: countVotes(allVotes, 'gymshark'),
      fashionIcon: countVotes(allVotes, 'fashionIcon'),
      bestCook: countVotes(allVotes, 'bestCook'),
      bestEvent: countVotes(allVotes, 'bestEvent'),
      bestSociety: countVotes(allVotes, 'bestSociety'),
    };

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch results' }, { status: 500 });
  }
}