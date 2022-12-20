import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginModal from "./LoginModal";
import WarningModal from "./WarningModal";
import Logo from "../assets/img/logo.png";
import styles from "../styles/Header.module.css";
import { actions } from "../store";
import { ReactComponent as CartIcon } from "../assets/svg/cart-shopping-solid.svg";
import { ReactComponent as ProfileIcon } from "../assets/svg/user-solid.svg";

export default function Header() {
  return (
    <nav
      className={`navbar navbar-expand-sm navbar-dark bg-dark ${styles.navbar}`}
    >
      <div className={`container-fluid ${styles["navbar-container"]}`}>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Brand />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Cart />
            </li>
            <li className="nav-item">
              <Profile />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Brand() {
  return (
    <p className={`navbar-brand bold ${styles["navbar-brand"]}`}>
      <Link to="/">
        <img src={Logo} alt="" />
        &nbsp; Ecommerce
      </Link>
    </p>
  );
}

function Cart() {
  return (
    <Link className={`btn btn-dark bold ${styles["btn-header"]}`} to="/cart">
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
  );
}

function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const LoggedInMenu = (
    <>
      <li>
        <Link to="/my-orders">
          <button className="dropdown-item">My Orders</button>
        </Link>
      </li>
      <li>
        <button
          className="dropdown-item"
          onClick={() => setIsWarningOpen(true)}
        >
          Logout
        </button>
      </li>
    </>
  );
  const LoggedOutMenu = (
    <>
      <li>
        <button className="dropdown-item" onClick={() => setIsLoginOpen(true)}>
          Login
        </button>
      </li>
    </>
  );

  return (
    <div className="dropdown">
      <button
        className={"btn btn-dark bold dropdown-toggle " + styles["btn-header"]}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <ProfileIcon style={{ width: "18px", height: "18px", fill: "white" }} />
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        {auth.email !== null ? LoggedInMenu : LoggedOutMenu}
      </ul>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
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
    </div>
  );
}
