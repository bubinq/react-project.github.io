import './App.css';
import { Home } from './components/home-page/Home';
import { Routes, Route } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import { Dashboard } from './components/dashboard-page/Dashboard';
import { GoalDetails } from './components/dashboard-page/calendar/goal-details/GoalDetails'
import {RouteGuard} from './guards/RouteGuard'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route element={<RouteGuard/>}>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/goals/:goalId" element={<GoalDetails />}></Route>
                </Route>
                <Route path="*" element={<ErrorPage />}></Route>
            </Routes>
        </div>
    );
}

export default App;
