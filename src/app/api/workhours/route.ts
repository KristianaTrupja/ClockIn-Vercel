import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/db";

// GET: ?userId=1&month=5&year=2025
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get('userId'));
  const month = Number(searchParams.get('month'));
  const year = Number(searchParams.get('year'));

  if (!userId || !month || !year) {
    return NextResponse.json({ error: 'Missing userId, month, or year' }, { status: 400 });
  }

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  const workHours = await db.workHours.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      project: true,
    },
  });

  return NextResponse.json(workHours);
}

// POST: create new work entry
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { date, hours, note, userId, projectId } = body;

  if (!date || !hours || !userId || !projectId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const entry = await db.workHours.create({
      data: {
        date: new Date(date),
        hours,
        note,
        userId,
        projectId,
      },
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    console.error("Error creating workHours:", error); // 👈 add this
    return NextResponse.json({ error: "Could not create work entry" }, { status: 400 });
  }
  
}

// PUT: update hours or note for existing entry
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { date, userId, projectId, hours, note } = body;

  if (!date || !userId || !projectId || typeof hours !== 'number') {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const updated = await db.workHours.upsert({
      where: {
        userId_date_projectId: {
          userId,
          date: new Date(date),
          projectId,
        },
      },
      update: {
        hours,
        note,
      },
      create: {
        userId,
        date: new Date(date),
        projectId,
        hours,
        note,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Could not update work entry' }, { status: 500 });
  }
}
