import React, { useState } from "react";

const UserContext = React.createContext({
  post: false,
  triggerPost: () => {},
});

export const UserContextProvider = (props) => {
  const [post, setPost] = useState(false);
  const handlePost = () => {
    setPost((prevPost) => !prevPost);
  };
  const userCntxValue = {
    post,
    triggerPost: handlePost,
  };
  return (
    <UserContext.Provider value={userCntxValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
