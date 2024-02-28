import { createMachine, assign, raise } from "xstate";
// import { getYtIdFromUrl } from "./get-yt-id-from-url";

type PlayerStates = keyof typeof YT.PlayerState;
type PlayerErrors = keyof typeof YT.PlayerError;

export const ytUrlMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QE8AuBaADgGwIbLACcA6AGQHtcIACABTwMIGJCwrkBtABgF1FRM5WAEtUw8gDt+IAB6J0AJgCsAZmIA2JVwCMATl2aAHLpXrtAGhDJ5CrkuKGF29VwAsb7dtcLDhgL5+lmhYDETE9PhE1KzsxACSEqLCuNhM3HxIIIIiYpLScgiGajrquq4A7OVmujr6QfJKCurEjcam6uoqhm4BQRg4kSQRjNFsEMjxiWIpadoZAkJJeZkFCuX2Cgqmhi4qujsurvUI6Era9uWGrr46Kgq6zr1W-aFDr6Oxw8ISUEy0AIIAVQAygBRAAi6Wk2SWUhWiE0zXu6lcNRUrg6GPKx0UXC4xBUd1RhnKXHK9y46iewQGjHC7xi43p+G+v1BADlwRCoZkYbk4aACt0NkpXEpLrozronLocdousQ1np3JLDOdtD5qS9BsyRoyJuzyKhqLTWUwJGAAO7UABuwggYHIPIWOXEAtkiFFhmIXC6W3l7lc7RxqNcGi02m6BiuVV0WpCOuGUX1xENxtNP2IAHVcKJqAAzciEajfTAAV1QTCgRpLEnLqGdWUW-PyiCa3rF5Qebg6Ozu2Ks8m8YaalK9Zi7e3jtLCSeLKbTJoYrPCuDLsEgTA5XMhvGhzbdrcKdkVovFxilMpxXW9m023hMlNurmnr11ybGBprGagq-Xm9pRs+UPeEEGuXQWhRSMnxUJRo2vBV3HKa5nDxIk40CZ4EzpOcPiZRcf2IUEJAdCAWDAQC915A9lkFRAxQgipJWuWxHFcI5BxObQT10SpzmQ3jY1g18dQAYQACzAABjABragy0IVIFOwagpMk2TICAmj3QKRR1gJS5STJbjuKcHFVAgtUNR8XxuMcDC+mwsIACUwBIqI4nzQhcAAWzAJhhC83ywFGdzWAgLTXVoj0ThULhvU8OK0TObx7mvfYHHUHZ1ls1xuLJAJMIkcgHXgTIaVefcop0+RYOaRKuGSrxNllTj0HWCD4sabi9mMMwVBEukKCoOhKuo6qjz0tR1DWPLDDgsdHBxdtiHJMpOm0dYVFJBRBtnBlPyq2FJvKbQCUcOKg2lZrGhxDoIORNwnDgpxPD2t5BjwiYEiSFIjpbUDFDUP1Lr2JxvDOJRzMjAlShSkklTVd733nT9dVZf6QLohBPAUAlCXRXiVA1QkLDapxvUuMxXoMAxKmR3CF2-Zcfkx6KCgxW8ilOlUHmMDjrBOJQ1WIInPHOTorhfTCKsTA7YgIlnfxzPNC2LUsKzZmqEDOJFua8Rq+bKEMnHDZRHBmrYUSaBn5fw5mWUzWg1w3CAtaPDo8d4kk2P42brzxFoFHcNwxW8dRToGmXtRwu2v3TJWiPct3xuO0DKnKVa7C0djVGMAP8UaEPc-DyPkYk6S5OU93Abi5pQ-2bjeIxUO7tO1bLa7bpYLKXbo6ckhXLC6hPO8vya+xxRHBaMkJz0X0UpDFEWiqHn9i4HwukKvwgA */
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
      events: {} as
        | { type: "ready" }
        | { type: "replay" }
        | { type: "play" }
        | { type: "url checked" }
        | { type: "iframe rendered" }
        | { type: "got input" }
        | { type: "new video" }
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
          Initial: {
            always: [
              {
                target: "Playing",
                cond: "has url data",
                actions: "play video",
              },
              "Not playing",
            ],
          },

          Playing: {
            on: {
              PAUSED: "Not playing.Paused",
              ENDED: "Not playing.Ended",
            },
          },

          "Not playing": {
            initial: "Wait for input",

            states: {
              "Wait for input": {
                on: {
                  "got input": {
                    target: "#yt-player.Player ready.Playing",
                    actions: ["assign url data", "play video"],
                  },
                },
              },

              Ended: {
                on: {
                  replay: {
                    target: "#yt-player.Player ready.Playing",
                    actions: "play video from start",
                  },
                },
              },

              Paused: {
                on: {
                  ENDED: "#yt-player.Player ready.Not playing.Ended",
                  play: {
                    target: "#yt-player.Player ready.Playing",
                    actions: "play video",
                  },
                },
              },
            },
          },
        },

        initial: "Initial",
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
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        let start = url.searchParams.get("start");
        let end = url.searchParams.get("end");
        // https://www.youtube.com/embed/placeholder?enablejsapi=1&controls=0&modestbranding=1&playsinline=1&rel=0
        let embedURL = new URL(
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
