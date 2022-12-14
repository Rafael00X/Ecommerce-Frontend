import Logo from "../assets/img/logo.png";
import { ReactComponent as CartIcon } from "../assets/svg/cart-shopping-solid.svg";
import { ReactComponent as ProfileIcon } from "../assets/svg/user-solid.svg";
import styles from "../styles/Header.module.css";

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
      <img src={Logo} alt="" />
      &nbsp; Ecommerce
    </p>
  );
}

function Cart() {
  return (
    <a className={`btn btn-dark bold ${styles["btn-header"]}`} href="/cart">
      <CartIcon
        style={{
          width: "20px",
          height: "20px",
          fill: "white",
          marginRight: "8px",
        }}
      />
      Cart
    </a>
  );
}

function Profile() {
  return (
    <div class="dropdown">
      <button
        class={"btn btn-dark bold dropdown-toggle " + styles["btn-header"]}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <ProfileIcon style={{ width: "18px", height: "18px", fill: "white" }} />
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <button class="dropdown-item">Login</button>
        </li>
      </ul>
    </div>
  );
}
