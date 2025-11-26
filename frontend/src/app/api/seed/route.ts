import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        await dbConnect();

        const email = "admin@gmail.com";
        const password = "admin321";
        const hashedPassword = await bcrypt.hash(password, 10);

        let user = await User.findOne({ email });

        if (user) {
            user.name = "Admin User";
            user.password = hashedPassword;
            user.role = "admin";
            await user.save();
        } else {
            user = await User.create({
                name: "Admin User",
                email,
                password: hashedPassword,
                role: "admin",
            });
        }

        return NextResponse.json({ message: "Admin user seeded successfully", user });
    } catch (error) {
        console.error("Seed Error:", error);
        return NextResponse.json({ error: "Failed to seed admin user", details: (error as Error).message }, { status: 500 });
    }
}
