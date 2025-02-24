import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId, getToken } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabaseToken = await getToken({ template: "supabase" });
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseToken}`,
        },
      }
    }
  );

  const { data, error } = await supabase.from("todos").select("*").eq("auth_id", userId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const { userId, getToken } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { todo_content } = await req.json();
  if (!todo_content) return NextResponse.json({ error: "Content is required" }, { status: 400 });

  const supabaseToken = await getToken({ template: "supabase" });
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${supabaseToken}`,
        },
      }
    }
  );

  const { data, error } = await supabase.from("todos").insert([{ todo_content, auth_id: userId }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json(req);
}
