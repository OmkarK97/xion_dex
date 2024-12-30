import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import "@burnt-labs/abstraxion/dist/index.css";
import "@burnt-labs/ui/dist/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AbstraxionProvider
      config={{
        treasury:
          "xion1h82c0efsxxq4pgua754u6xepfu6avglup20fl834gc2ah0ptgn5s2zffe9",
      }}
    >
      <App />
    </AbstraxionProvider>
  </StrictMode>
);