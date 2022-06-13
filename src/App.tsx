import React from "react";
import { StyledEngineProvider } from "@mui/material";
import { Theme } from "components";
import "./i18n";

import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const content = useRoutes(routes);

  return (
    <StyledEngineProvider>
      <Theme>{content}</Theme>
    </StyledEngineProvider>
  );
}

export default App;
