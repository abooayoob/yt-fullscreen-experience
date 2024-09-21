// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "error.platform.yt-player.Player ready.Screen.Exiting fullscreen:invocation[0]": {
      type: "error.platform.yt-player.Player ready.Screen.Exiting fullscreen:invocation[0]";
      data: unknown;
    };
    "error.platform.yt-player.Player ready.Screen.Requesting fullscreen:invocation[0]": {
      type: "error.platform.yt-player.Player ready.Screen.Requesting fullscreen:invocation[0]";
      data: unknown;
    };
    "xstate.after(3000)#yt-player.Player ready.Screen.Show fullscreen error message": {
      type: "xstate.after(3000)#yt-player.Player ready.Screen.Show fullscreen error message";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "exit fullscreen api": "done.invoke.yt-player.Player ready.Screen.Exiting fullscreen:invocation[0]";
    "fullscreen api": "done.invoke.yt-player.Player ready.Screen.Requesting fullscreen:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: "exit fullscreen api" | "fullscreen api";
  };
  eventsCausingActions: {
    "assign iframe rendered": "iframe rendered";
    "assign url data": "got input" | "xstate.init";
    "play video": "got input" | "play";
    "play video from start": "replay";
    "raise url checked": "xstate.init";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    "has url data": "" | "cancel";
  };
  eventsCausingServices: {
    "exit fullscreen api": "exit fullscreen";
    "fullscreen api": "request fullscreen";
  };
  matchesStates:
    | "Check url"
    | "Load Player"
    | "Player ready"
    | "Player ready.Operations"
    | "Player ready.Operations.Initial"
    | "Player ready.Operations.Not playing"
    | "Player ready.Operations.Not playing.Video stopped"
    | "Player ready.Operations.Not playing.Video stopped.Ended"
    | "Player ready.Operations.Not playing.Video stopped.Paused"
    | "Player ready.Operations.Not playing.Wait for input"
    | "Player ready.Operations.Not playing.YTPlayer ignored states"
    | "Player ready.Operations.Playing"
    | "Player ready.Screen"
    | "Player ready.Screen.Exiting fullscreen"
    | "Player ready.Screen.Maximized"
    | "Player ready.Screen.Minimized"
    | "Player ready.Screen.Requesting fullscreen"
    | "Player ready.Screen.Show fullscreen error message"
    | "Render Iframe"
    | {
        "Player ready"?:
          | "Operations"
          | "Screen"
          | {
              Operations?:
                | "Initial"
                | "Not playing"
                | "Playing"
                | {
                    "Not playing"?:
                      | "Video stopped"
                      | "Wait for input"
                      | "YTPlayer ignored states"
                      | { "Video stopped"?: "Ended" | "Paused" };
                  };
              Screen?:
                | "Exiting fullscreen"
                | "Maximized"
                | "Minimized"
                | "Requesting fullscreen"
                | "Show fullscreen error message";
            };
      };
  tags: never;
}
