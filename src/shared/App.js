import * as React from "react";
import routes from "./routes";
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import NoMatch from "./NoMatch";
import ColorfulBorder from "./ColorfulBorder";
import "./styles.css";

export default function App({ serverData = null }) {
  return (
    <React.Fragment>
      <ColorfulBorder />
      <div className="container">
        <NavBar />
        <Routes>
          {routes.map((route) => {
            const { path, fetchInitialData, component: C } = route;

            return (
              <Route
                key={path}
                path={path}
                element={
                  <C data={serverData} fetchInitialData={fetchInitialData} />
                }
              />
            );
          })}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}
