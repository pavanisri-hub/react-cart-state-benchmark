import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

type UserState = {
  name: string;
  isLoggedIn: boolean;
};

type UserAction =
  | { type: "user/login"; payload: { name: string } }
  | { type: "user/logout" };

const initialUserState: UserState = {
  name: "Guest",
  isLoggedIn: false,
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "user/login":
      return { name: action.payload.name, isLoggedIn: true };
    case "user/logout":
      return { name: "Guest", isLoggedIn: false };
    default:
      return state;
  }
}

type UserContextValue = {
  user: UserState;
  dispatchUser: React.Dispatch<UserAction>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, dispatchUser] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return ctx;
}