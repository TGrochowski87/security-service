import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "components/pages/home/HomePage";
import LoginPage from "components/pages/login/LoginPage";
import GlobalStyles from "utilities/GlobalStyles";
import ScopesPage from "components/pages/scopes/ScopesPage";

function App() {
  return (
    <div className="app">
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/scopes" element={<ScopesPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
