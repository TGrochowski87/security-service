import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "components/pages/home/HomePage";
import LoginPage from "components/pages/login/LoginPage";
import GlobalStyles from "utilities/GlobalStyles";
import LoginPageAdmin from "components/pages/login/LoginPageAdmin";
import { useState } from "react";
import ControlPanel from "components/pages/control-panel/ControlPanel";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(true);

  return (
    <div className="app">
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage adminLoggedIn={adminLoggedIn} setAdminLoggedIn={setAdminLoggedIn} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/admin" element={<LoginPageAdmin setAdminLoggedIn={setAdminLoggedIn} />} />
          <Route
            path="control-panel"
            element={adminLoggedIn ? <ControlPanel /> : <LoginPageAdmin setAdminLoggedIn={setAdminLoggedIn} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
