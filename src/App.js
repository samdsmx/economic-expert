import AboutPage from "Pages/AboutPage";
import React, { useContext } from "react";
import { Header } from "./Pages/Sections/Header";
import { InsertPage } from "./Pages/InsertPage";
import { SearchPage } from "./Pages/SearchPage";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { PinsProvider } from "./Hooks/PinsContext";
import { ApiProvider } from "./Hooks/ApiContext";
import { PageContext, PageProvider } from "./Hooks/PageContext";

function App() {
  initializeIcons();

  return (
    <PageProvider>
      <Header />
      <BodyComponent />
    </PageProvider>
  );
}

function BodyComponent() {
  const { page } = useContext(PageContext);

  return (
    <React.Fragment>
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
