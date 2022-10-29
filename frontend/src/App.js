import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//component
import SidebarComponent from "./components/layout/SidebarComponent"
import LoginPages from "./pages/LoginPages";
import ManageEvent from "./pages/manage_event/ManageEvent";
import ManageSchedule from "./pages/manage_schedule/ManageSchedule";
import RegisterPages from "./pages/RegisterPages";
//page
import SchedulePage from './pages/schedule/SchedulePages';
import SettingPages from "./pages/setting_page/SettingPages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SidebarComponent />}>
            <Route path="/setting" element={<SettingPages />} />
            <Route path="/manage_schedule" element={<ManageSchedule />} />
            <Route path="/manage_event" element={<ManageEvent />} />
            <Route path="/schedule" element={<SchedulePage />} />
          </Route>
          <Route>
            <Route path="/login" element={<LoginPages />} />
            <Route path="/register" element={<RegisterPages />} />
          </Route>
        </Routes>
      </BrowserRouter>,
    </div >
  );
}

export default App;
