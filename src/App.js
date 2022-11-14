import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";
import Authenticate from "./pages/Authenticate";
import MainNavigation from "./components/layout/MainNavigation";
import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import Error from "./components/errors/Error";
import { UserContextProvider } from "./store/user-context";
import UserDetail from "./pages/UserDetail";
import { ProfileContextProvider } from "./store/profile-context";
function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <UserContextProvider>
      <ProfileContextProvider>
        <MainNavigation>
          <Routes>
            <Route path="/" element={<Navigate replace to="/auth" />} />
            <Route path="/auth" element={<Authenticate />} />
            {isLoggedIn && <Route path="/posts" element={<Posts />} />}
            {isLoggedIn && (
              <Route path="/detail/:postId" element={<UserDetail />} />
            )}
            <Route path="*" element={<Error />} />
          </Routes>
        </MainNavigation>
      </ProfileContextProvider>
    </UserContextProvider>
  );
}

export default App;
