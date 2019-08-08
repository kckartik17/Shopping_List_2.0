import React, { useContext, Fragment } from "react";
import { NavLink } from "reactstrap";
import AuthContext from "../../context/auth/authContext";

const Logout = () => {
  const authContext = useContext(AuthContext);

  const { logout } = authContext;
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
