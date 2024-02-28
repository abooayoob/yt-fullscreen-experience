// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    "assign iframe rendered": "iframe rendered";
    "assign url data": "got input" | "xstate.init";
    "play video": "" | "got input" | "play";
    "play video from start": "replay";
    "raise url checked": "xstate.init";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    "has url data": "";
  };
  eventsCausingServices: {};
  matchesStates:
    | "Check url"
    | "Load Player"
    | "Player ready"
    | "Player ready.Initial"
    | "Player ready.Not playing"
    | "Player ready.Not playing.Ended"
    | "Player ready.Not playing.Paused"
    | "Player ready.Not playing.Wait for input"
    | "Player ready.Playing"
    | "Render Iframe"
    | {
        "Player ready"?:
          | "Initial"
          | "Not playing"
          | "Playing"
          | { "Not playing"?: "Ended" | "Paused" | "Wait for input" };
      };
  tags: never;
}
