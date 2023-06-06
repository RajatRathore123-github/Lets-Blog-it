import { createContext, useState } from "react";

export const userContext = createContext(null);

const UserData = ({children}) => {


  const [userinfo, setUserinfo] = useState({ name: "", username: "" });


  return (<userContext.Provider value={{
    userinfo,
    setUserinfo
  }}>
    {children}
  </userContext.Provider>)
};

export default UserData;
