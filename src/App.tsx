import { useMachine } from "@xstate/react";
import { ytUrlMachine } from "./yt-url-machine";
import React from "react";
// import { Button, Form, Input, Label, TextField } from "react-aria-components";

declare global {
  interface Window {
    player: YT.Player;
    onYouTubeIframeAPIReady: () => void;
  }
}

function App() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const outerGrid = React.useRef<HTMLDivElement>(null);
  const [state, send, actor] = useMachine(ytUrlMachine, {
    devTools: true,
    services: {
      "fullscreen api": () => {
        return outerGrid.current?.requestFullscreen() || Promise.reject();
      },
      "exit fullscreen api": () => {
        return document.exitFullscreen();
      },
    },
  });
  actor.onTransition(() => {
    // console.log("state", state.value);
  });

  function onPlayerReady() {
    send({ type: "ready" });
  }
  function onPlayerStateChange(event: YT.OnStateChangeEvent) {
    const nameMap = {
      [YT.PlayerState.BUFFERING]: "BUFFERING",
      [YT.PlayerState.CUED]: "CUED",
      [YT.PlayerState.UNSTARTED]: "UNSTARTED",
      [YT.PlayerState.PLAYING]: "PLAYING",
      [YT.PlayerState.PAUSED]: "PAUSED",
      [YT.PlayerState.ENDED]: "ENDED",
    } as const;
    console.log("state change", nameMap[event.data]);
    send({ type: nameMap[event.data] });
  }
  function onPlayerError(event: YT.OnErrorEvent) {
    // console.log(YT.PlayerError.EmbeddingNotAllowed2);
    console.log("error", event);
    const nameMap = {
      [100]: "VideoNotFound",
      [101]: "EmbeddingNotAllowed",
      [5]: "Html5Error",
      [2]: "InvalidParam",
      [150]: "EmbeddingNotAllowed2",
    } as const;
    send({ type: nameMap[event.data] });
  }

  window.onYouTubeIframeAPIReady = function () {
    window.player = new YT.Player("player", {
      playerVars: {
        playsinline: 1,
        modestbranding: 1,
        controls: 0,
        origin: "https://localhost:5173/",
        rel: 0,
        fs: 0,
        enablejsapi: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
        onError: onPlayerError,
      },
    });
  };

  React.useEffect(() => {
    console.log("running iframe effect");
    if (iframeRef.current && state.context.urlChecked) {
      console.log("iframe effect");
      send({ type: "iframe rendered" });
    }
  }, [iframeRef.current]);

  React.useEffect(() => {
    let tag: HTMLScriptElement;
    if (iframeRef.current) {
      console.log("loading iframe api");
      tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = "yt-iframe-api";
      document.body.appendChild(tag);
    }
    return () => {
      if (tag) document.body.removeChild(tag);
    };
  }, [state.context.iframeRendered]);

  return (
    <main className="h-full min-h-screen w-full min-w-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
      <div
        ref={outerGrid}
        className="grid h-dvh w-full grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr]"
      >
        {state.context.urlChecked && (
          <iframe
            ref={iframeRef}
            id="player"
            className="aspect-video h-full w-full [grid-column:1_/_4] [grid-row:1_/_4]"
            src={state.context.embedString || ""}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        )}

        {state.matches("Player ready.Screen.Minimized") &&
          outerGrid.current && (
            <div className="flex h-full w-full [grid-column:3_/_4] [grid-row:3_/_4]">
              <button
                className="border-2 border-pink-800 px-1"
                onClick={() => {
                  console.log("sending request fullscreen");
                  send({
                    type: "request fullscreen",
                  });
                }}
              >
                Maximize
              </button>
            </div>
          )}

        {state.matches("Player ready.Operations.Not playing") && (
          <div
            className={`grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] place-items-center  bg-pink-300 text-pink-700 opacity-90 [grid-column:1_/_4] [grid-row:1_/_4] ${state.matches("Player ready.Operations.Not playing.YTPlayer ignored states") && `pointer-events-none`}`}
          >
            {state.matches(
              "Player ready.Operations.Not playing.YTPlayer ignored states",
            ) && (
              <div>
                <h1 className="text-4xl">Press anywhere to play!</h1>
              </div>
            )}

            {state.matches(
              "Player ready.Operations.Not playing.Wait for input",
            ) && (
              <div>
                {state.can({ type: "cancel" }) && (
                  <button
                    className="border-2 border-pink-800 px-1"
                    onClick={() => send({ type: "cancel" })}
                  >
                    Cancel
                  </button>
                )}
                <h1 className="text-4xl">Wait for input</h1>
              </div>
            )}

            {state.matches(
              "Player ready.Operations.Not playing.Video stopped.Paused",
            ) && (
              <div>
                <h1 className="text-4xl">Paused</h1>
                <div className="flex gap-2">
                  <button
                    className="border-2 border-pink-800 px-1"
                    onClick={() => send({ type: "play" })}
                  >
                    Play
                  </button>
                  <button
                    className="border-2 border-pink-800 px-1"
                    onClick={() => send({ type: "new video" })}
                  >
                    {" "}
                    New Video{" "}
                  </button>
                </div>
              </div>
            )}

            {state.matches(
              "Player ready.Operations.Not playing.Video stopped.Ended",
            ) && (
              <div className="flex gap-2">
                <h1 className="text-4xl">Ended</h1>
                <div>
                  <button
                    className="border-2 border-x-pink-800 px-1"
                    onClick={() => send({ type: "replay" })}
                  >
                    Replay
                  </button>
                  <button
                    className="border-2 border-x-pink-800 px-1"
                    onClick={() => send({ type: "new video" })}
                  >
                    {" "}
                    New Video{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
