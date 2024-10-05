import { createMachine, assign, raise } from "xstate";
// import { getYtIdFromUrl } from "./get-yt-id-from-url";

type PlayerStates = keyof typeof YT.PlayerState;
type PlayerErrors = keyof typeof YT.PlayerError;

export const ytUrlMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QE8AuBaADgGwIbLACcA6AGQHtcIACABTwMIGJCwrkBtABgF1FRM5WAEtUw8gDt+IAB6J0AJgCsAZmIA2JVwCMATl2aAHLpXrtAGhDJ5CrkuKGF29VwAsb7dtcLDhgL5+lmhYDETE9PhE1KzsxADymES4YpKwxACSEqLCuNhM3HxIIIIiKVJFcgjaAOzaxDqGru5mStVKhioKQfIuCg4q2kq61d5cCtXqrgFBGDiRJBGM0WwQyPGJhMniEmmZ2bn52oUCQtmS0pUqrcS6Sl4drW5trt0I6Fq6xHrOSkru+up1NVplZZqEFuDlrEEkkymlFsIJFAmLQAIIAVQAygBRAAiBWkJTO5VAlRG1Q0hiGbgUKlqWkMr3Qg1cX2cnXawwUum0CnUIOCc0Y4UhMVW61h23hDERyOxADlcXiCUUiWULohfBTdI46ZNHKpeUztAMNNVDLV1LSlLYFAKwfMRfMoeKYZs4cR5eRUNQhbKmBIwAB3agAN2EEDA5BVJ1K2w1CEM6kMNxUrjaac6nnUKiZrl8NyMQL5AyG-kCoJCjsWUTFazdW1Snu9vplSOIAHVcKJqAAzciEaiIzAAV1QTCgLeHY5jxVO6oqiCtn2qdhMA0aYwMeZUnwGgy5QKpujtFcF4KdSzrEvdUubPr97a7Pf7g+n44AxrgJB+wNhZ2q8aLlUKhcOoXyuCopieG4NrVNUTKqPYXDwUCtw+BavL2lWwo1oO14Nh6XoPm2UDEAAahGUbULAqDkJgiQQMQ2ISJGEAsGAQoAfOQGkogfx9LY1Rpq0Ki+KouZWPI+jEGJu6dPB+a2Ch2FCmEeEuvWGyNjs96tvgsoUVR5A0XRDGQOEuAjrAkBMAqSr4rwhI8ecwG8pMxBtNUJ6uAYOpXBYUlvGJrKZtoYxQeFOi-KpF4aQR2lES2j5kZRkYmbR9GMZZ1m2VxTmqi5JKyPxXApq0ObPMYdK6C8QWKCMnmtHcLR3FSzixdWoorFpkpNsR+nIIZACaAAqGnCFAEgDpApnJHAKKkKiw3pPKADi3Fxq5fFVBMxB3OmShmK4fxjJBTK7n0Wi8rcYlOCap4zDh6ndbEmIfqwYASMQACyiLCAAtsIABetmsAAjiOcA+r2I7YNgsAfWAX2bcSCbaEmFJ8u0aGuFFOaITUxAnTUgLcuFfxTGeDq4a94rvZ930AEpgJD0Oyn2cMI0jX1MBAkhgMQiKhuQADWgvnl1zrXgzyPM6zUO0RzsPw4jjMIML5BfmUBSowuO0Y8m-RKbyNVeHV1jBU09RlWYYn6JBtL8tTz0QtLPXELLX3ECzbNK0inOqzzEhMEQhADsQcyoK+APEJLtPu29wc+wr7MByr3Pq5r2vbLrBWxmjwG2MYXx-CMUFWr5IwXaYDjeFByi7g7SidQnV4e1730-bgMiAyDtlgL3MNc2rct67xJVVL4dTmsJ7g+G0QlMrYoXDDUhheCYTTJq3L2J-TyeYgAFuQIYZ6PX3UGHA7UADcCwLgMB88IsBA7AsC3-fj9gOP22T0JdRt5WlMAoJoW9EKOE8hvZcyhbi1Spk9NSbt25J0Zp7E+Z8R7ByvoQcOg477v2-kwGQtF5rEFwL2VARAAAUoEuBcAAJRMHjnvFBB80HH1PoHTOcscF4M-oQmAv9iqVCcLVfa9Cjo8ngoMKkTJNB9BQo4FwQx2gHl3sg2sHdk7YiHsrLBjM+YCyFhIEW4s4401YVo1BctmJ6PTgYuWGtTFax0nnY4c4toiMQM4c0xMmj5h1LUGqy9eSySuFoToFo-i6DGBoy81j2G2N0dkBxQdDHXxIFHGOFjXYJPwtotBKSxBpJ4V9ZxIsc6SHcc5LxCYnBtHqMuDGDRaq6GNCaeo7gjr0JGHoK4uh4kAGEj5gA-KLagI5CB5CmdgagH5RnjMgMIhMDV7B0gtL08K4UnCIV3A4TwCgMIbzKtyeJLNWJRHSL2TYd8mDCBubgO+yxLmsAgCs4C6BQIpk8KBWJAVvDcgujqBwyYgTtA3njXpAQKzTUjPAIoLDCC1MLjtL5R02R-K4ACo57T6q1T6N5C0Exaj-DpPEigVA6DghRfrSeDU1BWj6ceMC7Quj1T5Cmao3JXA5hqKoVcj1KxIPyZpWlE9KhfPApoE6YEkyDEioyeqVJ7CHU3Cdc0eh4nxQ9oRKU4q-6VE8LJE6vkBghUBI4QKlt0ATB+TaAwIxrq1G0NqumvVbxNj2GIXIBrvEICGCamJ5rGiWvZTau4M8Jjch0FXZMjQ3X7w9TpaUBkkR+vRrcJpnh0x8gxt4E6oS+h6B8AYdM7h80qETWw5NSUSJpqgBm4CajPJrkVfPbc9VkxcH6PQ-cJhjCTGrYk2td4BopU7N2GGN93xNp2psm47hTBXHJAKvMzgbh6GxQpaKoCW4uxFTq6EiUx3JVIkZdKpksqQDnZPcKjUTY+EgqYdwSqbXpjqICFwYl2jcujc7RBcV3U3hTXpCdaVqKZXMkxFibFb1GtpFjMqVIngtKgsvAwGgmhJh-byoEaZh0FOPX1XS47z0QYymZbKtArI2QgPBnxvI+iPsaBXV9GHpXYZzFSPDc9COaRA3WwahkKNXug8QI+L86KEEtgXOlRqoKfHocoSN3g2l4ptdyTj+ZvIuEgnbfjCUSNpDIw24gY0JpTRmjQUhVCEVyYlUuXy-i6T5j7XjbyiETASPpBvJMoCqSGcKXLBjVQcw9oCYEzCIT6rCU+BWvQyYbRcFiQB4VQGk2e2Tn9LIQNQb0cKnUtyxgKTphGNjbwdw6QQLUL8zQBghITAQelqWNastoN9orEpUBuEX2KoBQ1Pikwph5KJXxKrNB5juLJMqtRSXXSQkFmx3tu69zyzewrqK73GFVVVfQvgIlvpsKuBwRzNX10dYMg9GW2ud3QVw8+2DMkCIfjAULThxjE2OrEsqELO0RqJuaGqgIbROyrdd1rI72vJPsT1x7jNQsY2EjcA7ngZG+XUMaUCXxDD0PzV+-TwIIfChGWMiZszQtfLAl03yJzhi8rcBbHotRPJWnGDqbFQxvDnK+pGQc1zblgEpz4K6KEzC1H+QdPMHkKqko5z4MSMK-BAA */
    id: "yt-player",
    preserveActionOrder: true,
    predictableActionArguments: true,
    context: {
      urlData: {
        id: null,
        start: null,
        end: null,
      },
      embedString: null,
      urlChecked: false,
      iframeRendered: false,
    },
    schema: {
      context: {} as {
        urlData: {
          id: string | null;
          start: number | null;
          end: number | null;
        };
        urlChecked: boolean;
        embedString: string | null;
        iframeRendered: boolean;
      },
      services: {} as {
        "fullscreen api": {
          data: void;
        };
        "exit fullscreen api": {
          data: void;
        };
      },
      events: {} as
        | { type: "ready" }
        | { type: "cancel" }
        | { type: "replay" }
        | { type: "play" }
        | { type: "url checked" }
        | { type: "iframe rendered" }
        | {
            type: "got input";
            payload: {
              inputString: string;
            };
          }
        | { type: "new video" }
        | {
            type: "request fullscreen";
          }
        | { type: "exit fullscreen" }
        | { type: "dismiss message" }
        | { type: PlayerStates }
        | { type: PlayerErrors },
    },
    tsTypes: {} as import("./yt-url-machine.typegen").Typegen0,
    states: {
      "Load Player": {
        on: {
          ready: "Player ready",
        },
      },

      "Player ready": {
        states: {
          Operations: {
            initial: "Initial",

            states: {
              Initial: {
                always: [
                  {
                    target: "Not playing.YTPlayer ignored states",
                    cond: "has url data",
                  },
                  "Not playing",
                ],
              },

              Playing: {
                on: {
                  PAUSED: "Not playing.Video stopped.Paused",
                  ENDED: "Not playing.Video stopped.Ended",
                },
              },

              "Not playing": {
                initial: "Wait for input",

                states: {
                  "Wait for input": {
                    on: {
                      "got input": {
                        target: "YTPlayer ignored states",
                        actions: "load new video",
                      },

                      cancel: {
                        target: "Video stopped.history",
                        cond: "has url data",
                      },
                    },
                  },

                  "Video stopped": {
                    initial: "Paused",

                    states: {
                      Ended: {
                        on: {
                          replay: {
                            target:
                              "#yt-player.Player ready.Operations.Playing",
                            actions: "play video from start",
                          },
                        },
                      },

                      Paused: {
                        on: {
                          ENDED: "Ended",
                          play: {
                            target:
                              "#yt-player.Player ready.Operations.Playing",
                            actions: "play video",
                          },
                        },
                      },

                      history: {
                        type: "history",
                      },
                    },
                  },

                  "YTPlayer ignored states": {
                    on: {
                      PLAYING: "#yt-player.Player ready.Operations.Playing",
                    },
                  },
                },

                on: {
                  "new video": ".Wait for input",
                },
              },
            },
          },

          Screen: {
            states: {
              Minimized: {
                on: {
                  "request fullscreen": "Requesting fullscreen",
                },
              },

              "Requesting fullscreen": {
                invoke: {
                  src: "fullscreen api",
                  onDone: "Maximized",
                  onError: "Show fullscreen error message",
                },
              },

              Maximized: {
                on: {
                  "exit fullscreen": "Exiting fullscreen",
                },
              },

              "Show fullscreen error message": {
                after: {
                  "3000": "Minimized",
                },

                on: {
                  "dismiss message": "Minimized",
                },
              },

              "Exiting fullscreen": {
                invoke: {
                  src: "exit fullscreen api",
                  onDone: "Minimized",
                  onError: "Show fullscreen error message",
                },
              },
            },

            initial: "Minimized",
          },
        },

        type: "parallel",
      },

      "Check url": {
        entry: ["assign url data", "raise url checked"],

        on: {
          "url checked": "Render Iframe",
        },
      },

      "Render Iframe": {
        on: {
          "iframe rendered": {
            target: "Load Player",
            actions: "assign iframe rendered",
          },
        },
      },
    },

    initial: "Check url",
  },
  {
    actions: {
      "assign url data": assign(() => {
        const url = new URL(window.location.href);
        const id = url.searchParams.get("id");
        const start = url.searchParams.get("start");
        const end = url.searchParams.get("end");
        // https://www.youtube.com/embed/placeholder?enablejsapi=1&controls=0&modestbranding=1&playsinline=1&rel=0
        const embedURL = new URL(
          `https://www.youtube.com/embed/${id || "placeholder"}`,
        );
        embedURL.searchParams.set("enablejsapi", "1");
        embedURL.searchParams.set("controls", "0");
        embedURL.searchParams.set("modestbranding", "1");
        embedURL.searchParams.set("playsinline", "1");
        embedURL.searchParams.set("rel", "0");
        if (start) {
          embedURL.searchParams.set("start", start);
        }
        if (end) {
          embedURL.searchParams.set("end", end);
        }
        if (id) {
          return {
            urlData: {
              id,
              start: start ? parseFloat(start) : null,
              end: end ? parseFloat(end) : null,
            },
            embedString: embedURL.toString(),
            urlChecked: true,
          };
        }
        return {
          embedString: embedURL.toString(),
          urlChecked: true,
        };
      }),
      "load new video": (_, event) => {
        const params = new URLSearchParams(event.payload.inputString);
        // needs validation ofcourse, but this is a poc
        console.log(event.payload.inputString);
        const id = params.get("id");
        const start = params.get("start");
        const end = params.get("end");
        const loadObject: {
          videoId: string;
          startSeconds?: number;
          endSeconds?: number;
        } = {
          videoId: id || "placeholder",
        };
        console.log("loading new video", id, start, end);
        if (start) {
          loadObject["startSeconds"] = parseInt(start, 10);
        }
        if (end) {
          loadObject["endSeconds"] = parseInt(end, 10);
        }
        if (id) {
          window.player.cueVideoById(loadObject);
        } else {
          console.log("no id");
        }
      },
      "assign iframe rendered": assign(() => {
        return {
          iframeRendered: true,
        };
      }),
      "play video": () => {
        if (window.player) {
          window.player.playVideo();
        } else {
          console.log("player not ready");
        }
      },
      "play video from start": (context) => {
        if (window.player) {
          window.player.seekTo(context.urlData.start || 0, true);
          window.player.playVideo();
        } else {
          console.log("player not ready");
        }
      },
      "raise url checked": raise({ type: "url checked" }),
    },
    guards: {
      "has url data": (context) => {
        return context.urlData.id !== null;
      },
    },
  },
);
