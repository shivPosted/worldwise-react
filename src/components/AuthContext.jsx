import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: import.meta.env.VITE_FAKE_NAME,
  email: import.meta.env.VITE_FAKE_EMAIL,
  password: import.meta.env.VITE_FAKE_PASSWORD,
  avatar: import.meta.env.VITE_FAKE_AVATAR,
};

const initialState = {
  isAuthorized: false,
  user: null,
  isError: null,
  errorMessage: null,
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
    case "error":
      return {
        ...state,
        isError: true,
        errorMessage: action.payload,
        isAuthorized: false,
      };
    case "error/remove":
      return {
        ...state,
        isError: false,
        errorMessage: null,
      };

    default:
      throw new Error("The action type for reducer in authconext not defined");
  }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ isAuthorized, user, isError, errorMessage }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function login(email, password) {
    console.log(email, password);
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      return dispatch({ type: "login", payload: FAKE_USER });

    dispatch({ type: "error", payload: "Wrong login credentials" });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  function handleRemoveError() {
    dispatch({ type: "error/remove" });
  }
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthorized,
        isError,
        errorMessage,
        handleRemoveError,
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
