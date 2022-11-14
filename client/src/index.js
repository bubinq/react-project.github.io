import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CalendarProvider } from "./contexts/CalendarContext";
import { GoalProvider } from "./contexts/GoalContext";
import { AuthProvider } from "./contexts/authContext";
import { DetailsProvider } from "./contexts/detailsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <GoalProvider>
        <CalendarProvider>
          <DetailsProvider>
            <App />
          </DetailsProvider>
        </CalendarProvider>
      </GoalProvider>
    </AuthProvider>
  </BrowserRouter>
);
