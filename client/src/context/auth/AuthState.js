import React, { useReducer, useContext } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import ErrorContext from "../error/errorContext";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null
  };

  const errorContext = useContext(ErrorContext);

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load user

  const loadUser = () => getState => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios
      .get("/api/auth/user", tokenConfig(getState))
      .then(res =>
        dispatch({
          type: USER_LOADED,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          errorContext.returnErrors(err.response.data, err.response.status)
        );
        dispatch({
          type: AUTH_ERROR
        });
      });
  };

  const register = ({ name, email, password }) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Request body
    const body = JSON.stringify({ name, email, password });

    axios
      .post("/api/users", body, config)
      .then(res =>
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          errorContext.returnErrors(
            err.response.data,
            err.response.status,
            "REGISTER_FAIL"
          )
        );
        dispatch({
          type: REGISTER_FAIL
        });
      });
  };

  // Login User
  const login = ({ email, password }) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    axios
      .post("/api/auth", body, config)
      .then(res =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          errorContext.returnErrors(
            err.response.data,
            err.response.status,
            "LOGIN_FAIL"
          )
        );
        dispatch({
          type: LOGIN_FAIL
        });
      });
  };

  const logout = () => dispatch({ type: LOGOUT_SUCCESS });

  const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().auth.token;

    // Headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    // If token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        user: state.user,
        loadUser,
        register,
        login,
        logout,
        tokenConfig
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
