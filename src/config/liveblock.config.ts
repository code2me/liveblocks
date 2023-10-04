import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey:
  "pk_dev_iE3db1Bamq0ebKoACTQwWplvWKVaTlgurG0nqmBTlfx4AW9KtycVzH45aWSpgr9z",
  throttle: 16,
});

// Presence type
type Presence = {
  cursor: { x: number; y: number } | null;
};

// Person type
type Person = LiveObject<{
  name: string;
  age: number;
}>;

// Storage type
type Storage = {
  people: LiveList<Person>;
};

type UserMeta = {};

// Event types
type RoomEvent = {
  type: "TOAST";
  message: string;
};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent>(client);
