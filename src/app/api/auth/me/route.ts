import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      include: {
        tenants: {
          include: {
            tenant: true
          }
        }
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const firstTenant = user.tenants?.[0]?.tenant;

    return NextResponse.json({
      name: user.name,
      email: user.email,
      role: user.tenants?.[0]?.role || "MEMBER",
      tenantName: firstTenant?.name || "Agency Name",
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
