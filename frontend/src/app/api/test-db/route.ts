import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({ status: "Connected", message: "Successfully connected to MongoDB" });
    } catch (error) {
        console.error("Connection Error:", error);
        return NextResponse.json({
            status: "Error",
            message: "Failed to connect to MongoDB",
            error: (error as Error).message
        }, { status: 500 });
    }
}
