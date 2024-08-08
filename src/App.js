import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SalesDashboardComponent from "./Components/sales-dashboard/sales-dashboard";
import ComparisonDashboardComponent from "./Components/comparision-dashboard/comparision-dashboard";
// import AppHeaderComponent from "./Components/app-header/AppHeaderComponent"; // Update the path as needed
import AppHeaderComponent from "./Components/app-header/app-header";
import AppHomeComponent from "./Components/app-home/app-home";
function App() {
    return (
        <Router>
            <div>
                <AppHeaderComponent />
                <Routes>
                    <Route path="/today-sales" element={<SalesDashboardComponent />} />
                    <Route path="/sales-comparison" element={<ComparisonDashboardComponent />} />
                    <Route path="/" element={<AppHomeComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
