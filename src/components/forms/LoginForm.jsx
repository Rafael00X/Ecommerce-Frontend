import useForm from "../../hooks/useForm";
import { loginUser } from "../../utils/query";
import { actions } from "../../store";

export default function LoginForm(props) {
  const { dispatch, onClose, setIsLogin } = props;
  const initialState = {
    email: { type: "email", label: "Email", value: "" },
    password: { type: "password", label: "Password", value: "" },
  };

  const [inputs, values, setErrors] = useForm(initialState);

  const showRegister = () => setIsLogin(false);
  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(values.email, values.password)
      .then((res) => {
        dispatch(actions.authActions.login(res));
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
          <span className="highlight-link" onClick={showRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
