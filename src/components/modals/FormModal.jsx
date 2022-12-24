import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./Modal";
import useForm from "../../hooks/useForm";
import styles from "./FormModal.module.css";
import { actions } from "../../store";
import { loginUser, registerUser } from "../../utils/query";

export default function FormModal() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.loginModal.isOpen);
  const onClose = () => dispatch(actions.loginModalActions.close());

  return (
    <Modal isOpen={isOpen}>
      {isLogin ? (
        <LoginForm
          dispatch={dispatch}
          onClose={onClose}
          setIsLogin={setIsLogin}
        />
      ) : (
        <RegisterForm
          dispatch={dispatch}
          onClose={onClose}
          setIsLogin={setIsLogin}
        />
      )}
    </Modal>
  );
}

const LoginForm = (props) => {
  const { dispatch, onClose, setIsLogin } = props;
  const initialState = {
    email: { type: "email", label: "Email", value: "" },
    password: { type: "password", label: "Password", value: "" },
  };

  const showRegister = () => setIsLogin(false);
  const callback = (values, onError) => {
    loginUser(values.email, values.password)
      .then((res) => {
        dispatch(actions.authActions.login(res));
        onClose();
      })
      .catch((error) => {
        console.log(error);
        onError(error.props);
      });
  };

  const [inputs, onSubmit] = useForm(initialState, callback);

  return (
    <div className={"card " + styles.card}>
      <div className="card-body">
        <h3 className="card-title">Login</h3>
        <hr />
        <form onSubmit={onSubmit}>
          {inputs}
          <div className="d-flex justify-content-end mb-5">
            <button className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-dark" type="submit">
              Confirm
            </button>
          </div>
        </form>
        <p>
          Don't have an account?{" "}
          <span className={styles.highlight} onClick={showRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

const RegisterForm = (props) => {
  const { dispatch, onClose, setIsLogin } = props;
  const initialState = {
    username: { type: "text", label: "Username", value: "" },
    email: { type: "email", label: "Email", value: "" },
    password: { type: "password", label: "Password", value: "" },
    confirmPassword: { type: "password", label: "Confirm Password", value: "" },
  };

  const showLogin = () => setIsLogin(true);
  const callback = (values, onError) => {
    if (values.password !== values.confirmPassword)
      return onError({ confirmPassword: "Passwords must match!" });
    registerUser(values)
      .then((res) => {
        dispatch(actions.authActions.login(res));
        onClose();
      })
      .catch((error) => {
        console.log(error);
        onError(error.props);
      });
  };

  const [inputs, onSubmit] = useForm(initialState, callback);

  return (
    <div className={"card " + styles.card}>
      <div className="card-body">
        <h3 className="card-title">Register</h3>
        <hr />
        <form onSubmit={onSubmit}>
          {inputs}
          <div className="d-flex justify-content-end mb-5">
            <button className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-dark" type="submit">
              Confirm
            </button>
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <span className={styles.highlight} onClick={showLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};
