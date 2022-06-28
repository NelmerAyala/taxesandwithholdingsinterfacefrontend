import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { UserContextProvider } from "./contexts/UserContext";
import Layout from "./layout/Layout";
import RoutesApp from "./routes/RoutesApp";

function App() {
  return (
    <>
        <Router>
      <UserContextProvider>
          <Fragment>
            <Layout>
              <div className="App">
                <div className="bodyApp">
                  <RoutesApp />
                </div>
              </div>
            </Layout>
          </Fragment>
      </UserContextProvider>
        </Router>
    </>
  );
}

export default App;
