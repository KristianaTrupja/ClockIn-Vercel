import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password, role } = body;

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    const existingUserByName = await db.user.findUnique({
        where: {
          username: username,
        },
      });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User already exists" },
        { status: 409 }
      );
    }

    if (existingUserByName) {
        return NextResponse.json(
          { name: null, message: "User already exists with this name" },
          { status: 409 }
        );
      }

const hashedPassword = await hash(password, 10);
      const newUser = await db.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role,
        },
      });

      const {password: newUserPassword, ...rest} = newUser;
    return NextResponse.json({user: rest, message: "User created successfully"}, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
