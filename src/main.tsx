import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import HomeScreen from "@/HomeScreen";
import { appRegistry } from "@/registry/apps";
import { AppMetaProvider } from "@/shared/context/AppMetaContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppMetaProvider>
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
    </AppMetaProvider>
  </StrictMode>,
);
