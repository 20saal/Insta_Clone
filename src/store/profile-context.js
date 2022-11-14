import React, { useState } from "react";

const ProfileContext = React.createContext({
  avt: "",
  userName: "",
  handleData: (data) => {},
});

export const ProfileContextProvider = (props) => {
  const [avt, setAvt] = useState("");
  const [userName, setUserName] = useState("");

  const handleData = (data) => {
    setAvt(data.avt);
    setUserName(data.userName);
  };
  const cntxValue = {
    avt,
    userName,
    handleData,
  };
  return (
    <ProfileContext.Provider value={cntxValue}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
