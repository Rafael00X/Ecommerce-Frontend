import { Link } from "react-router-dom";

import ProfileMenu from "./ProfileMenu";
import Logo from "../../assets/img/logo.png";
import styles from "./Header.module.css";
import { ReactComponent as CartIcon } from "../../assets/svg/cart-shopping-solid.svg";

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
              <ProfileMenu />
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
