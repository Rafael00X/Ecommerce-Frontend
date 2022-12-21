import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./Modal";
import useForm from "../../hooks/useForm";
import styles from "./LoginModal.module.css";
import { actions } from "../../store";
import { loginUser } from "../../utils/query";

export default function LoginModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.loginModal.isOpen);
  const onClose = () => dispatch(actions.loginModalActions.close());

  const callback = () => {
    loginUser(values.email, values.password)
      .then((res) => dispatch(actions.authActions.login(res)))
      .catch((error) => console.log(error));
    onClose();
  };

  const initialState = { email: "", password: "" };
  const [values, onChange, onSubmit] = useForm(initialState, callback);

  return (
    <Modal isOpen={isOpen}>
      <div className={"card " + styles.card}>
        <div className="card-body">
          <h3 className="card-title">Login</h3>
          <hr />
          <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={values.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter password"
                name="password"
                value={values.password}
                onChange={onChange}
                required
              />
            </div>
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
            <Link to="/register" onClick={onClose}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </Modal>
  );
}
