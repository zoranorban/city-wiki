import { FC, ReactNode, createContext, useState } from "react";
import { fetchWrapper } from "../services/fetchWrapper";

interface UserInfo {
  username: string;
  password: string;
}

interface UserContextState {
  isLoggedIn: boolean;
  user: UserInfo | null;
}

interface UserContextProps extends UserContextState {
  logIn: (user: UserInfo) => void;
  logOut: () => void;
}

const defaultValues: UserContextProps = {
  isLoggedIn: false,
  user: null,
  logIn: () => {
    console.log("Default logIn function called. No action taken.");
  },
  logOut: () => {
    console.log("Default logOut function called. No action taken.");
  },
};

export const UserContext = createContext<UserContextProps>(defaultValues);

const UserContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [store, setStore] = useState<UserContextState>(defaultValues);

  const { isLoggedIn, user } = store;

  const logIn = async (userData: UserInfo) => {
    console.log(`User: ${userData.username} is trying to log in`);
    await fetchWrapper.post("/users/login", userData).then(() => {
      setStore({
        ...store,
        isLoggedIn: true,
        user: userData,
      });
    });
  };

  const logOut = () => {
    setStore({ ...store, isLoggedIn: false, user: null });
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
