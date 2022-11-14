import React, { useContext, useEffect, useMemo, useState } from "react";
import SignUpUser from "../components/authenticate/SignUpUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoginUser from "../components/authenticate/LoginUser";
import AuthContext from "../store/auth-context";

const Authenticate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryStatus = searchParams.get("status");
  const { isLoggedIn } = useContext(AuthContext);
  let authPage;
  useMemo(() => {
    if (queryStatus === "signup") {
      authPage = <SignUpUser />;
    } else {
      authPage = <LoginUser />;
    }
  }, [queryStatus]);

  return <React.Fragment>{authPage}</React.Fragment>;
};

export default Authenticate;
