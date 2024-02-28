// import { inspect } from "@xstate/inspect";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (import.meta.env.MODE === "development") {
  console.log("development mode");
  import("@xstate/inspect").then(({ inspect }) => {
    inspect({
      iframe: false,
    });
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
} else {
  console.log("production mode");
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
// inspect({
//     // options
//     // url: 'https://stately.ai/viz?inspect', // (default)
//     iframe: false, // open in new window
// });
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );
