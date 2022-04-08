import AboutPage from "Pages/AboutPage";
import React, { useState } from "react";
import { Header } from "./Pages/Sections/Header";
import { InsertPage } from "./Pages/InsertPage";
import { SearchPage } from "./Pages/SearchPage";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { PinsProvider } from "./Hooks/PinsContext";
import { ApiProvider } from "./Hooks/ApiContext";

function App() {
  initializeIcons();

  const [page, setPage] = useState("search");

  return (
    <React.Fragment>
      <Header page={page} setPage={setPage} />
      <ApiProvider>
        {page === "insert" && <InsertPage />}
        {page === "search" && (
          <PinsProvider>
            <SearchPage />
          </PinsProvider>
        )}
      </ApiProvider>
      {page === "about" && <AboutPage />}
    </React.Fragment>
  );
}

export default App;
