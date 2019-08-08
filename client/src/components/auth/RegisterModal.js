import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
import AuthContext from "../../context/auth/authContext";
import ErrorContext from "../../context/error/errorContext";

const RegisterModal = props => {
  const { isAuthenticated, error, register, clearErrors } = props;
  const authContext = useContext(AuthContext);
  const errorContext = useContext(ErrorContext);

  const { register } = authContext;
  const { clearErrors } = errorContext;

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevProps = usePrevious({
    isAuthenticated,
    error,
    register,
    clearErrors
  });

  useEffect(() => {
    if (prevProps.error !== error) {
      if (error.id === "REGISTER_FAIL") {
        setMsg({ msg: error.msg.msg });
      } else {
        setMsg({ msg: null });
      }
    }
  }, [isAuthenticated, error, register, clearErrors]);

  // If authenticated, close modal
  if (modal) {
    if (isAuthenticated) {
      toggle();
    }
  }

  const toggle = () => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  };

  const onChange = e => {
    if (e.target.name == "name") {
      setName(e.target.value);
    }
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
    if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    // Create user object
    const newUser = {
      name,
      email,
      password
    };

    // Attempt to register
    register(newUser);
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={onChange}
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
