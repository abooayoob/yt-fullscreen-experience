import { createMachine, assign, raise } from "xstate";
// import { getYtIdFromUrl } from "./get-yt-id-from-url";

type PlayerStates = keyof typeof YT.PlayerState;
type PlayerErrors = keyof typeof YT.PlayerError;

export const ytUrlMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QE8AuBaADgGwIbLACcA6AGQHtcIACABTwMIGJCwrkBtABgF1FRM5WAEtUw8gDt+IAB6J0AJgCsAZmIA2JVwCMATl2aAHLpXrtAGhDJ5CrkuKGF29VwAsb7dtcLDhgL5+lmhYDETE9PhE1KzsxADymES4YpKwxACSEqLCuNhM3HxIIIIiKVJFcgjO9gDsrq51Sgq6yp4qQfJKesQmSjWeuu6GSq7qAUEYOJEkEYzRbBDI8YmEyeISaZnZufnahQJC2ZLSlSp9PV2uhmc1bjUjHQjoWrrEetUjXPrq6jXjVpNQjMgfNYgkkmU0rNhBIoExaABBACqAGUAKIAEQK0hKR3KoEqdRqGmGujcChU-S0hke6G0IzezhUymMNWa2gUY0CAJC03CIJii2WEPWUIYMLhaIAchjMdiiriyidEL5ibpHJT1FdlCoObTtLqNDVDP11BSmlwFP9glNGPzpqCheDVpDiFLyKhqLaJUwJGAAO7UABuwggYHI8oOpXWyoQSl0xK4djJXhNzgNtKuxO0XDMum0xgU3gp1sBfNmUUFS2da1Sbo9XvFsOIAHVcKJqAAzciEagwzAAV1QTCgDf7Q8jxUOSoqiDO2jew1uNX0RM5me0xJ+dRUOhUvnqXImvLtFd7VeFLtF9c93ubbY73d74+HAGNcBJX2BsJPFTHZ1UXAqK4xBOK4Lz0rofQ+LSqhqE4hhJq49KGAalKlieYRno61YrLWGw3o2+ASsQABqobhtQsCoOQmCJBAxBohIYYQCwYC2r+07-gSiAjAooFcDUwF9PuwwqO0VjyPoxD7ioJgKDUdSOEmfzcjaQL2nMF41q67q3k2UBkRR5BUTRdGQOEuADrAkBMNKspYrwOJcccAH6PxjhkkJlpXIhCi0vu-FXMBnIGJaWqCRhtpYQKCy4SKdZ6URyAkeRYYmdRtH0ZZ1m2RxTkKi5+KyLxUEOIYZgcvuXhFjUAVJhoOjxiaK7xp4rhRRpADCAAWYCvgA1tQA6EHkI3YNQr59YNkCcdGrk8U8Cn2JSJoqTmOZOLBckOJ4Cg+L4OaeZ1fIAEpgMxUTpJ2qwALZgEwwg3bg93zJdrAQHNeKxugu6GIyu5kvOxa6AF6oOOoFX3IdyEqSdp6xbEKKvqwF3EAAsjCwi3cIABetmsAAjgOcCep2A7YNgsAo2AF1fTOi2QfYLTqmcgn0vtmYmsQIz0vcTS7rcPzwzFDoXsjqMSMQ53E6TEpdhTVM0xdTAQJIYDEDCQbkANGvqeWiNChLtNSzLJPUfL5OU9TksIFr5DvmUBT09xJVVPGxKuOqxrXJDrgSdYTy6iBXyGN4urB1cvwi8CYtxcQxto2bcuwgr1vKxITBEIQPbEFMqBPrdxD6wjcdIxn0tgLLFup1bSu2-bjvrM7BVRt9AEFpuu1pm4Jg6DBklB7mPTMl4m5sjoXD+GpZal1p8eJ1LKI9eQgZ1zbJvUNnPbUPdsCwLgMCq8IsA4-vu9wAfMAuwtbsFg1njJoJShaFPNKD88TQOP0-th-mZiRRnphWO89y6SwTivNeisN4XS3oQHOvY95XwejIaiyQNa4E7KgIgAAKXcSYACUTAS6i1AUbCuy9V5p3rpvbeiDL6HzADfYqlQ9AUjeFqVQ6hBa-H9rSM0-FnCIXUOqBS1wnAx00pWBeFd0a4BkNjPGtkwAKLJtAjOzDYzpi4MQcCBpBLIUQqYAO8hNwgSjt7aqphtCSOwuLCuaJVGW3UZLVW6tNYSG1rrYus9SHSLASbRiTja4uJNnbTxDt8It32FOeaLDEBeEEm8Ke4Fbg6GMOBfUjhdE6g5F0KCmhmS2MNksReQTsghPTq4uhec8AFx7EXEhID-HkPAY4ipUBqEwIkOE7WTdJDROcnErRQNiBskhsMLwgwtSuFpNcN4u5TB9zNF8fMARuQSHIGGeARQmlDPbotX6Sh1AAy+EBS4+1QYf18GoRZVxVDKH0J4SRFAqB0CBPshmbtFBCQ0ApQx8ZcxKEcLSTk-02TTN1PcSklpill0WJ812lRfonM0OBXMFV6TiQLLSVqPREJ9E8G1MOKg4VkPileOsWwxC5ERbfSo8YZLgS9hHMOPwQUfy6AuRSZoUxexqBMjqQDorNPPPHHS15oSwjpfEqoZVcztXGQWbwmSP5OEES0YwWo6jpP9mSlpFL8JpCSneKAMrYwjFeEmQFqZTQZg-isnm7h8wCuOVqaex4RVSLFWCPCukGymtbO2MmO8XzmoAvGK1RLPC8pXCaDc9hkw3GMIMek+qfVOj9deE1BkjLpVMllSA4bFp+R5g8gVvlIbAszCIhwuZgJuGBYpMO6acKXiNYRQNaVKKZXMgxJiLFi1uwMPYBS+h1RND9tcUFgwxmTIPNcFmFVW3aSzYlANubu0ZTMtlWgVkbIQCHZUYYOiX7Mgrb4Kt79A6KFncaLoC65LNGXcKjSdjxVroIjm4izYt0Fr7cQHqJ8aKEEDm3L5rDcyJiEiI-MCZ9BXBnSBe9thw6mApB6nkXrer9SGuNI98hdwnLcF7VCXw6guHqPw-oYyBFxvOYMK0r6zoXTDL2a6d0wAEaWtkrQArNx6HOV4GtIE+i-CmX5a4mGmnerbRK1I3HPBMstay0YkMtof2XMQICdg3COAGEU5jc8DUJwzops4rwjqpKTAWQYShcVTw0GJ457lKRCRXTI8BmMsg43xoewqwyO5mhOWPOSphvLNFmZy1QAlgITKaCuTkHmAlJyrubMQlSaEXUUx7HmK4RG+DOWyfyH9vALjksMTkbmgLOCPFht9JTTNefkYovzimzQgQNHZ-oBY0xRZvUWHR+ZHlAuasWZLrTAmUKgVU2h8Cd5IMYYp4YIXlCpKcBFVQXNiQmlMHYA8yhORCs9Q1+FpSHHBM6evMzAWDl3xcPxTQ+1jRklsDG-UDVQqOAFeqTQ+hp4BCAA */
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
        | { type: "got input" }
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
                    target: "Playing",
                    cond: "has url data",
                    actions: "play video",
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
                        target: "#yt-player.Player ready.Operations.Playing",
                        actions: ["assign url data", "play video"],
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
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        let start = url.searchParams.get("start");
        let end = url.searchParams.get("end");
        // https://www.youtube.com/embed/placeholder?enablejsapi=1&controls=0&modestbranding=1&playsinline=1&rel=0
        let embedURL = new URL(
          `https://www.youtube.com/embed/${id || "placeholder"}`,
        );
        embedURL.searchParams.set("enablejsapi", "1");
        embedURL.searchParams.set("controls", "1");
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
