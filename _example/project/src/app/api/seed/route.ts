import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function POST() {
  try {
    const db = getDb();
    await db.run(
      sql`INSERT OR IGNORE INTO allowed_emails (email, created_at) VALUES ('kts123@estsoft.com', ${new Date().toISOString()})`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Seed failed" },
      { status: 500 }
    );
  }
}
