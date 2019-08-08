import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";
import ErrorContext from "./errorContext";
import ErrorReducer from "./errorReducer";

const ErrorState = props => {
  const initialState = {
    msg: {},
    status: null,
    id: null
  };

  const [state, dispatch] = useReducer(ErrorReducer, initialState);

  const returnErrors = (msg, status, id = null) =>
    dispatch({
      type: GET_ERRORS,
      payload: { msg, status, id }
    });

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <ErrorContext.Provider
      value={{
        msg: state.msg,
        status: state.status,
        id: state.id,
        returnErrors,
        clearErrors
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};

export default ErrorState;
