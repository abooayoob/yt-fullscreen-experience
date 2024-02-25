import { createMachine, assign } from "xstate";
import { getYtIdFromUrl } from "./get-yt-id-from-url";

type PlayerStates = keyof typeof YT.PlayerState;
type PlayerErrors = keyof typeof YT.PlayerError;

export const ytUrlMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QE8AuBaADgGwIbLACcA6AGQHtcIACABTwMIGJCwrkBtABgF1FRM5WAEtUw8gDt+IAB6J0ARgCsxJQoDMAJgWaA7Jq7qALOoVGAHABoQyeQDYjxBwt1c9d8wE5jDgL6-rNCwGImIAJTYIZCZaUgBBAE0ASQA5AHFuPiQQQRExSWk5BAUuT2IFBTs7T09dXS0uJS4rG3lNYgsjZU0lO3Uqo09eo39AjBx8UPp8YQkoGLiAVQBlAFEAEUzpXNFxKWyizT1iTz7XI7cjAyPAxF0VFyudCs8FTyMr0ZtxkJJp5Fm81WKXWGy22R2+X2oEOXnK5jsSnU5k0Q1OXAUt2KmnMxC4+i4HneH20Wn8ARAEnIEDg0iCE0Y2yEuwKBzaRxO5nuRiUOOR6n6Rixil5xFRA3uz10ZjsX3pvzIlBo-yITLye0K8kenO5vPM-MFwocJ3q9SMGP6SmlSjlP0mJAi7DVLOhskQFV0HVqSiUtTq3hM6iNjlq6jNFsR1ttwXtxH+gOdUM1xRceJKVvMSnMPLc2ax9ROqKe6neb316nJviAA */
  id: "yt-player",
  preserveActionOrder: true,
  predictableActionArguments: true,
  context: {},
  schema: {
    context: {} as {},
    events: {} as
      | { type: "ready" }
      | { type: PlayerStates }
      | { type: PlayerErrors },
  },
  tsTypes: {} as import("./yt-url-machine.typegen").Typegen0,
  states: {
    "Load Player": {
      on: {
        ready: "Ready",
      },
    },

    Ready: {
      on: {
        PLAYING: "Playing",
      },
    },

    Playing: {
      on: {
        PAUSED: "Ready",
        ENDED: "Ready",
      },
    },
  },

  initial: "Load Player",
});
