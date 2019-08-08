import React, { useReducer, useContext } from "react";
import ItemContext from "./itemContext";
import ItemReducer from "./itemReducer";
import AuthContext from "../auth/authContext";
import ErrorContext from "../error/errorContext";

import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "../../types";

const ItemState = props => {
  const initialState = {
    items: [],
    loading: false
  };

  const [state, dispatch] = useReducer(ItemReducer, initialState);

  const authContext = useContext(AuthContext);
  const errorContext = useContext(ErrorContext);

  const { returnErrors } = errorContext;

  const { tokenConfig } = authContext;

  const getItems = () => {
    dispatch(setItemsLoading());
    axios
      .get("/api/items")
      .then(res =>
        dispatch({
          type: GET_ITEMS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  const addItem = item => getState => {
    axios
      .post("/api/items", item, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: ADD_ITEM,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  const deleteItem = id => getState => {
    axios
      .delete(`/api/items/${id}`, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: DELETE_ITEM,
          payload: id
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

  const setItemsLoading = () =>
    dispatch({
      type: ITEMS_LOADING
    });

  return (
    <ItemContext.Provider
      value={{
        items: state.items,
        loading: state.loading,
        getItems,
        addItem,
        deleteItem,
        setItemsLoading
      }}
    >
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemState;
