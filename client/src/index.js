import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CalendarProvider } from './contexts/CalendarContext';
import { GoalProvider } from './contexts/GoalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GoalProvider>
      <CalendarProvider>
        <App />
      </CalendarProvider>
    </GoalProvider>
  </BrowserRouter>
);


