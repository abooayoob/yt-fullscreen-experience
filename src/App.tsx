import { useMachine } from "@xstate/react";
import { ytUrlMachine } from "./yt-url-machine";
import React from "react";
import { Button, Form, Input, Label, TextField } from "react-aria-components";

declare global {
  interface Window {
    player: YT.Player;
    onYouTubeIframeAPIReady: () => void;
  }
}

function App() {
  const [state, send, actor] = useMachine(ytUrlMachine);
  actor.onTransition((state) => {
    console.log("state", state.value);
  });

  function onPlayerReady() {
    console.log("player ready");
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
    const nameMap = {
      [YT.PlayerError.VideoNotFound]: "VideoNotFound",
      [YT.PlayerError.EmbeddingNotAllowed]: "EmbeddingNotAllowed",
      [YT.PlayerError.Html5Error]: "Html5Error",
      [YT.PlayerError.InvalidParam]: "InvalidParam",
      [YT.PlayerError.EmbeddingNotAllowed2]: "EmbeddingNotAllowed2",
    } as const;
    console.log("error", nameMap[event.data]);
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
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.id = "yt-iframe-api";
    document.body.appendChild(tag);

    return () => {
      document.body.removeChild(tag);
    };
  }, []);

  return (
    <main className="h-full min-h-screen w-full min-w-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
      <div className="grid h-dvh w-full grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr]">
        {/* <div id="player" className="aspect-video w-full"></div> */}

        <iframe
          id="player"
          className="aspect-video h-full w-full [grid-column:1_/_4] [grid-row:1_/_4]"
          src="https://www.youtube.com/embed/cF0QqjdT5bY?enablejsapi=1&controls=0&modestbranding=1&playsinline=1&rel=0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {state.matches("Ready") && (
          <div
            onClick={() => {
              console.log("play");
              window.player.playVideo();
            }}
            className=" bg-pink-300 text-pink-700 opacity-90 [grid-column:1_/_4] [grid-row:1_/_4]"
          >
            Ready
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
