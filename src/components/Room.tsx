"use client";
import {
  useOthers,
  useMyPresence,
  useBroadcastEvent,
  useEventListener,
  useStorage,
  useMutation,
} from "@/config/liveblock.config";
import { Cursor } from "./Cursor";
import { toast } from "react-toastify";
import { LiveObject } from "@liveblocks/client";
import { CollaborativeEditor } from "./Editor";

export function Room() {
  const people = useStorage((root) => root.people);

  // update name
  const updateName = useMutation(
    ({ storage }, newName: string, index: number) => {
      const person = storage.get("people").get(index);
      person!.set("name", newName);
    },
    []
  );

  // Add person mutation
  const addPerson = useMutation(({ storage }) => {
    const newPerson = new LiveObject({ name: "Enter User", age: 30 });
    storage.get("people").push(newPerson);
  }, []);

  // Add person mutation
  const resetPerson = useMutation(({ storage }) => {
    storage.get("people").clear();
  }, []);

  // Add useOthers
  const [myPresence, updateMyPresence] = useMyPresence();

  // Broadcast event hook
  const broadcast = useBroadcastEvent();
  const others = useOthers();
  const userCount = others.length;

  // Update cursor coordinates on pointer move
  function handlePointerMove(e: any) {
    const cursor = { x: Math.floor(e.clientX), y: Math.floor(e.clientY) };
    updateMyPresence({ cursor });
  }

  // Set cursor to null on pointer leave
  function handlePointerLeave(e: any) {
    updateMyPresence({ cursor: null });
  }

  // Listen for incoming events
  useEventListener(({ event }) => {
    if (event.type === "TOAST") {
      toast(event.message);
    }
  });

  return (
    <div className="mx-8 my-8 p-6 flex flex-col h-[90vh] ring-1 ring-black rounded-md">
      <div
        className="flex flex-col p-3 gap-4 h-1/2"
        suppressHydrationWarning
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div>There are {userCount} other user(s) online</div>
        {others
          .filter((other) => other.presence.cursor !== null)
          .map(({ connectionId, presence }) => (
            <Cursor
              key={connectionId}
              x={presence.cursor!.x}
              y={presence.cursor!.y}
            />
          ))}
        <button
          className="bg-gray-500 text-white p-3 rounded-md w-[50%]"
          onClick={() =>
            // Broadcast toast event
            broadcast({ type: "TOAST", message: "Event received!" })
          }
        >
          Broadcast event
        </button>
        {people.map((person: any, index: number) => (
          <input
            className="ring-1 ring-black p-3 w-[50%] rounded-md text-xl"
            key={index}
            type="text"
            value={person.name}
            onChange={(e) => updateName(e.target.value, index)}
          />
        ))}
        <div className="flex flex-row gap-4">
          <button
            onClick={addPerson}
            className="bg-green-500 text-white p-3 rounded-md"
          >
            Add
          </button>
          <button
            onClick={resetPerson}
            className="bg-orange-400 text-white p-3 rounded-md"
          >
            Reset
          </button>
        </div>
      </div>
      <CollaborativeEditor />
    </div>
  );
}
