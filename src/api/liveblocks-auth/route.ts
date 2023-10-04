import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const API_KEY = process.env.SECRET_KEY;

const liveblocks = new Liveblocks({
  secret: API_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user's info from your database
  const user = {
    id: "navneet@example.com",
    info: {
      name: "Navneet Bahuguna",
      color: "#D583F0",
      picture: "https://liveblocks.io/avatars/avatar-1.png",
    },
  };

  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(user.id, {
    userInfo: user.info,
  });

  // Give the user access to the room
  const { room } = await request.json();
  session.allow(room, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
