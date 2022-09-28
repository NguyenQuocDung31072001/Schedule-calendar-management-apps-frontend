import HomePages from './pages/HomePages';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LayoutPages from './pages/Layout';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/layout" element={<LayoutPages />} />
        </Routes>
      </BrowserRouter>,
    </div>
  );
}

export default App;
