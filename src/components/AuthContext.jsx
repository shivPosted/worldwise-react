import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: import.meta.env.VITE_FAKE_NAME,
  email: import.meta.VITE_FAKE_EMAIL,
  password: import.meta.env.VITE_FAKE_PASSWORD,
  avatar: import.meta.env.VITE_FAKE_AVATAR,
};

const initialState = {
  isAuthorized: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthorized: true,
        user: action.payload,
      };

    case "logout":
      return {
        ...initialState,
      };
    default:
      throw new Error("The action type for reducer in authconext not defined");
  }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ isAuthorized, user }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("Using AuthContext provider outisde where defined");
  return context;
}

export { AuthProvider, useAuth };
