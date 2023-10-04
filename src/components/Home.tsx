"use client";
import { RoomProvider } from "@/config/liveblock.config";
import { Room } from "@/components/Room";
import { LiveList, LiveObject } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Home() {
  const roomId = "liveblocks-tutorial-w4oUeTd3hglbpXXSb59U_";

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null }}
      initialStorage={{
        people: new LiveList([new LiveObject({ name: "Navneet", age: 23 })]),
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => <Room />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
