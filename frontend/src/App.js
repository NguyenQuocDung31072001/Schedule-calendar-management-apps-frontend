import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AuthWrapper from "./components/layout/AuthWrapper";
//component
import SidebarComponent from "./components/layout/SidebarComponent"
import { pathName } from "./config/pathName";
import LoginPages from "./pages/LoginPages";
import ManageEvent from "./pages/manage_event/ManageEvent";
import ManageSchedule from "./pages/manage_course/ManageCourses";
import RegisterPages from "./pages/RegisterPages";
//page
import SchedulePage from './pages/schedule/SchedulePages';
import SettingPages from "./pages/setting_page/SettingPages";
import VerifyAccountPages from "./pages/VerifyAccountPages";
import ResetPassword from "./pages/reset_password/ResetPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SidebarComponent />}>
            <Route path={pathName.setting} element={<SettingPages />} />
            <Route path={pathName.manage_courses} element={<ManageSchedule />} />
            <Route path={pathName.manage_event} element={<ManageEvent />} />
            <Route path={pathName.schedule} element={<SchedulePage />} />
          </Route>
          <Route path="/auth/*" element={<AuthWrapper/>}>
            <Route path="login" element={<LoginPages />} />
            <Route path="register" element={<RegisterPages />} />
            <Route path="verify_account" element={<VerifyAccountPages />} />
            <Route path="reset_password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>,
    </div >
  );
}

export default App;
