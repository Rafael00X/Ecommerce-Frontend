import useForm from "../../hooks/useForm";
import { registerUser } from "../../utils/query";
import { actions } from "../../store";

export default function RegisterForm(props) {
  const { dispatch, onClose, setIsLogin } = props;
  const initialState = {
    username: { type: "text", label: "Username", value: "" },
    email: { type: "email", label: "Email", value: "" },
    password: { type: "password", label: "Password", value: "" },
    confirmPassword: { type: "password", label: "Confirm Password", value: "" },
  };

  const [inputs, values, setErrors] = useForm(initialState);

  const showLogin = () => setIsLogin(true);
  const onSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword)
      return setErrors({
        password: "Passwords must match!",
        confirmPassword: "Passwords must match!",
      });
    registerUser(values)
      .then((res) => {
        dispatch(actions.authActions.login(res));
        setIsLogin(true);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        setErrors(error.props);
      });
  };

  return (
    <div className={"card"} style={{ width: "400px" }}>
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
          <span className="highlight-link" onClick={showLogin}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
