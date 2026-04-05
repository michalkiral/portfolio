import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import HomeScreen from "./HomeScreen.tsx";
import { appRegistry } from "./registry/apps";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        {appRegistry.flatMap((app) =>
          app.routes.map((appRoute) => (
            <Route
              key={`${app.route}${appRoute.path}`}
              path={`${app.route}${appRoute.path}`}
              element={appRoute.element}
            />
          )),
        )}
      </Routes>
    </HashRouter>
  </StrictMode>,
);
