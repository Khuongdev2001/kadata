import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";

import LoginContainer from "./screens/user/LoginContainer";
import DashboardContainer from "./screens/dashboard/DashboardContainer";
import Logged from "./components/layout/Logged";
import CustomerContainer from "./screens/customer/CustomerContainer";
import StaffContainer from "./screens/staff/StaffContainer";
import AdminContainer from "./screens/admin/AdminContainer";
import WageContainer from "./screens/wage/WageContainer";
import LevelContainer from "./screens/wage/components/pages/level/LevelContainer";
import FeedbackContainer from "./screens/feedback/FeedbackContainer"

function RouterPage() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginContainer />} />
                <Route path="/dashboard" element={<Logged><DashboardContainer /></Logged>} />
                <Route path="/customer" element={<Logged><CustomerContainer /></Logged>} />
                <Route path="/staff" element={<Logged><StaffContainer /></Logged>} />
                <Route path="/admin" element={<Logged><AdminContainer /></Logged>} />
                <Route path="/wage">
                    <Route path="" element={<Logged><WageContainer /></Logged>} />
                    <Route path="level" element={<Logged><LevelContainer /></Logged>} />
                </Route>
                <Route path="/feedback" element={<Logged><FeedbackContainer /></Logged>} />
            </Routes>
        </Router>
    )   
}

export default RouterPage;