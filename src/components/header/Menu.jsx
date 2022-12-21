import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as CartIcon } from "../../assets/svg/cart-shopping-solid.svg";
import { actions } from "../../store";
import { ReactComponent as ProfileIcon } from "../../assets/svg/user-solid.svg";
import WarningModal from "../modals/WarningModal";
import styles from "./Menu.module.css";

export default function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const promptForLogin = () => dispatch(actions.loginModalActions.open());

  if (!auth.isLoggedIn)
    return (
      <li className="nav-item">
        <div
          className={`btn btn-dark bold ${styles["btn-header"]}`}
          onClick={promptForLogin}
        >
          <ProfileIcon
            style={{
              width: "20px",
              height: "20px",
              fill: "white",
              marginRight: "8px",
            }}
          />
          Login
        </div>
      </li>
    );

  return (
    <>
      <li className="nav-item">
        <div className={`btn btn-dark bold ${styles["btn-header"]}`}>
          <Link to="/cart">
            <CartIcon
              style={{
                width: "20px",
                height: "20px",
                fill: "white",
                marginRight: "8px",
              }}
            />
            Cart
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <div className={`btn btn-dark bold ${styles["btn-header"]}`}>
          <Link to="/orders">
            <CartIcon
              style={{
                width: "20px",
                height: "20px",
                fill: "white",
                marginRight: "8px",
              }}
            />
            Orders
          </Link>
        </div>
      </li>
      <li className="nav-item">
        <div
          className={`btn btn-dark bold ${styles["btn-header"]}`}
          onClick={() => setIsWarningOpen(true)}
        >
          <ProfileIcon
            style={{
              width: "20px",
              height: "20px",
              fill: "white",
              marginRight: "8px",
            }}
          />
          Logout
        </div>
      </li>
      <WarningModal
        isOpen={isWarningOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        onCancel={() => setIsWarningOpen(false)}
        onConfirm={() => {
          dispatch(actions.authActions.logout());
          setIsWarningOpen(false);
        }}
      />
    </>
  );
}
