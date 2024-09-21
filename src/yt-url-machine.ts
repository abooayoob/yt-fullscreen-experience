import { createMachine, assign, raise } from "xstate";
// import { getYtIdFromUrl } from "./get-yt-id-from-url";

type PlayerStates = keyof typeof YT.PlayerState;
type PlayerErrors = keyof typeof YT.PlayerError;

export const ytUrlMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QE8AuBaADgGwIbLACcA6AGQHtcIACABTwMIGJCwrkBtABgF1FRM5WAEtUw8gDt+IAB6J0AJgCsAZmIA2JVwCMATl2aAHLpXrtAGhDJ5CrkuKGF29VwAsb7dtcLDhgL5+lmhYDETE9PhE1KzsxADymES4YpKwxACSEqLCuNhM3HxIIIIiKVJFcgjaAOzaxDqGru5mStVKhioKQfIuCg4q2kq61d5cCtXqrgFBGDiRJBGM0WwQyPGJhMniEmmZ2bn52oUCQtmS0pUqrcS6Sl4drW5trt0I6Fq6xHrOSkru+up1NVplZZqEFuDlrEEkkymlFsIJFAmLQAIIAVQAygBRAAiBWkJTO5VAlRG1Q0hiGbgUKlqWkMr3Qg1cX2cnXawwUum0CnUIOCc0Y4UhMVW61h23hDERyOxADlcXiCUUiWULohfBTdI46ZNHKpeUztAMNNVDLV1LSlLYFAKwfMRfMoeKYZs4cR5eRUNQhbKmBIwAB3agAN2EEDA5BVJ1K2w1CEM6kMNxUrjaac6nnUKiZrl8NyMQL5AyG-kCoJCjsWUTFazdW1Snu9vplSOIAHVcKJqAAzciEaiIzAAV1QTCgLeHY5jxVO6oqiCudW0VOqXGq+nJfLzNQ0QNcKh0Kl8TX5FcF4KdSzrEvdUubPr97a7Pf7g+n44AxrgJF+wNgs5qvGi5VEe6hfIepieG4NrVNUTKqPYG4TJuNpary9pVsKNaDreDYel6T5tlAxAAGoRlG1CwKg5CYIkEDENiEiRhALBgEKQHziBpKIH8fS2NUaatCeVIqLmVjyPoxAnioJjjCMjhcBuWFCmEuEuvWGyNjsj6tvgsrkZR5DUbR9GQOEuAjrAkBMAqSr4rwhLcecoG8pMxBtJuCiuAYOrLkyJ6spm2hjOJoU6L8qlXhp+HaYRLbPqRFGRiZNF0QxlnWbZnFOaqLkkrIfFcCmrQ5s8xh0roLySW84ysl5dwtHcVLONF1aiisayYl+rBgBIxAALKIsIAC2wgAF62awACOI5wD6vYjtg2CwL1YD9VxcaubxVQWhSrheH8h7ZnYiG-Bo+a-CVShmFwabtThnWxD1fUDQASmAc0LbKfbLat639UwECSGAxCIqG5AANZg5eHXOrer0bR9X3zTRv1LSta1vQgEPkD+ZQFFtxIJqu5o3B0vkTDdJqBY4xC2KoOquJM+Ymioj3qc94pI-1xCfd96NIn9WOAxITBEIQA7EHMqDvqNxBw09CNdcQvMo4LYjC5jAM43jBPbETeWxiToG2NJR5pnoQlHgYgVtPUcmeLUdhuFcnMQirL1i0NuAyGNk22WA-uLf92PI8TC67auPKpi4zhGJ4JhMj5fRDHJVq1IeJiaB7161qr6tqwAFuQIY6+H-XUJLA7UKNcCwLgMDA8IsDjbAsB1w3TdgJHPFFQgtiGHUQw2vo+gfF0tXoFaXA3Oah0nj5kziXnsWFz7mKl+XYdi9XhBS4O9cdz3TAyDRyRg7gvaoEQAAUR7KQAlEwStc17POb9vIu68j++H13E+MA+47QHgoWwrJJi6B8r8dMXkJLWDeOoXQc9xhaFcE1Eq+o17c26j7bEIcMa7zesDUG4MJCQxhorB0ysbwbzekxQh2tiHI1xhQ-GOkjbHDnNtQqlRnAFnTgnHy1s2gpy0MQVQ4CLRUmUDqHBH88EMIIdkZhosSE1xILLeW1DsLvzod7ZRTCoA-0rhINhkMDaSC4c5XhCYnBUgZp4IYh5jB-BGMaO4DM6RphZnJVOt084AGFi5gC-FDagI5CB5CidgagX5QnhMgCAvhNgHZ0gtMpF2oUnCITkg4Tw0jfChUcLoPOn0WJRHSL2TY9cmDCBqbgeuyxKmsAgCkhM6Ajwpk8Lbe6dxvDckCjqBwyYgTtGHodLJCiDGunig+Ii+lkCGQAJoABUNLCCgBIAckBTKX1gCiUgqIVnpHlAAcQ6W5CYkivBtDMBg9wPkEHyH8ZInQ3JVCOF6XaEEOzIzwCKG-QgtjTa7S6bdNkfTlyDN0EyAwfRATHWqpTbyecKBUDoOCUFUcB6KCEhoeqq5qRGCnogxQyZPLcj8TUVQ65fkzD0Z7WZiCTa4sqF0iCmgMFcDGYMcKjJp4WnsGmZQ7RBhWkOjMgu0J5mpBxf3fhdRhK+QGEFQE3ymTmhTDoAwOhNBtB8sCC8ND9EyrmZKJsewxC5AVaAyoQwZKPJMCaRoGqyXyDuHUeCVoUFeGGMmRo0q8KqwIg+BESI7WpKqLceoZg7l8lXN4DBKdeRfGgcYSYIwGiHmDZpO8Ok0iLKSlGhMOYUz5gtC4QEPJBgWGnuuOeyCgShXEmMJM55GVqWZearSlrdLFpIp2bsi1a6flLaBTJNx3CmCuOSOlu4II8hQeJcYkUYF5riv2otiUh0pSoulcyEAJ3Rw3KyfMTgfBQUmCVPMtR9xDDMNUa0rRtCbtDXKgdu6DLtn3WlMymVmKsRPQPXkdIGYlSpE8Vc90Xl1QMJdfM5a-iAiElME1TL84htlduvSSUjKpVMhlCytArI2WPflOxbleR9AvbyRo4kb2CvJdyLlTQkwnhQ0CB6GHu1YfzWGpsg6f3JWMkRo9xBi6t1ooQVlPCwWgfEp8ZSYrPDeGqvoFOCHWYWj1YeMwHNeMxVwWrMWIH+E3skS6wEIjhhiIbfBKzaENwtGUJ2ysfH16GORkNEa40poUbZYqxAegNyErutyE0hSarkqtMq0KTRDpUgNIZrtxnFGmYYQLNGWsTEVzM5RhT-DdNxqaCVNwPJfgerePmT4Whro1Aiivd93m+aDT9gHAL5mQsoPsJKhOVw3FNEClwZTehbplj9cglrn8GFbzLqYvemjAGNxgN1weJoKR3QThg-UVJzr2B1HYYeThn1UnQ2l+GLLMs+ZUblxbb11urkaF8UwOpJnm3TMaSlepDD3Xus4aBucjOOhCWEiJsT1tdN5fUJoOpQrDBZm4GLPR70THAZuP7VxqoMo81eCpkZBzVNqWAKHPg04ucayugZeYPJlSzkdnwJ4Zt9vvEJ79yz2zrM2ds3ZNAL630BUF+1iAxnEErdTGtzj62xZNDJISw8UH-fzOhgIQA */
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
