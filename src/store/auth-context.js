import React, { useState } from "react";

const AuthContext = React.createContext({
  token: null,
  isLoggedIn: false,
  login: (data) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("authToken");
  const [token, setToken] = useState(initialToken);
  let isLoggedIn = !!token;

  const loginHandler = async (loginData) => {
    console.log("loginHandler");

    setToken(loginData.token);
    localStorage.setItem("authToken", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  const cntxValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={cntxValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
