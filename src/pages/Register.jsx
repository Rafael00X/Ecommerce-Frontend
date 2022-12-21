import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { actions } from "../store/index";
import useForm from "../hooks/useForm";
import { registerUser } from "../utils/query";
import styles from "./Register.module.css";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    block: "",
    city: "",
    district: "",
    state: "",
    pin: "",
  };
  const callback = (values) => {
    if (values.password !== values.confirmPassword)
      return alert("Passwords must match!");
    if (isNaN(Number(values.pin)) || values.pin.length !== 6)
      return alert("Invalid PIN");
    registerUser(values)
      .then((res) => dispatch(actions.authActions.login(res)))
      .then(navigate("/"))
      .catch((error) => console.log(error));
  };

  const [values, onChange, onSubmit] = useForm(initialValues, callback);

  return (
    <div className={styles.container + " bg-white"}>
      <form onSubmit={onSubmit}>
        <h3>Login Credentials</h3>
        <div className="form-group">
          <label>
            Email address
            <input
              type="email"
              className="form-control"
              name="email"
              value={values.email}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password
            <input
              type="password"
              className="form-control"
              name="password"
              value={values.password}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Confirm Password
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <hr />
        <h3>Address</h3>
        <div className="form-group">
          <label>
            Block Number / Street
            <input
              type="text"
              className="form-control"
              name="block"
              value={values.block}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Village / Town / City
            <input
              type="text"
              className="form-control"
              name="city"
              value={values.city}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            District
            <input
              type="text"
              className="form-control"
              name="district"
              value={values.district}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            State
            <input
              type="text"
              className="form-control"
              name="state"
              value={values.state}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            PIN
            <input
              type="text"
              className="form-control"
              name="pin"
              value={values.pin}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn-dark">
          Register
        </button>
      </form>
    </div>
  );
}
