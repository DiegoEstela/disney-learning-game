import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import UserSetup from "./pages/UserSetup/UserSetup";
import GeneralLayout from "./components/Layout/GeneralLayout";
import { ROUTES } from "./constants";
import PracticeGame from "./pages/Practice/PracticeGame";

function App() {
  return (
    <GeneralLayout>
      <Routes>
        {/* Redirección al login */}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />

        {/* Auth */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />

        {/* Setup inicial de usuario */}
        <Route path={ROUTES.USER_SETUP} element={<UserSetup />} />

        {/* App pages */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.PRACTICE} element={<PracticeGame />} />
        <Route path={ROUTES.STORY} element={<Home />} />
        <Route path={ROUTES.BATTLE} element={<Home />} />
        <Route path={ROUTES.PROFILE} element={<Home />} />
      </Routes>
    </GeneralLayout>
  );
}

export default App;
