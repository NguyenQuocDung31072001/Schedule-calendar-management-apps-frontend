import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//component
import SidebarComponent from "./components/layout/SidebarComponent"
//page
import SchedulePage from './pages/SchedulePages';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SidebarComponent>
          <Routes>
            <Route path="/schedule" element={<SchedulePage />} />
          </Routes>
        </SidebarComponent>
      </BrowserRouter>,
    </div>
  );
}

export default App;
