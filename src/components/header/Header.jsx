import { useNavigate } from "react-router-dom";

import Menu from "./Menu";
import Logo from "../../assets/img/logo.png";
import styles from "./Header.module.css";
import SearchBar from "../forms/SearchBar";

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
        <SearchBar />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <Menu />
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Brand() {
  const navigate = useNavigate();
  return (
    <p
      className={`navbar-brand bold ${styles["navbar-brand"]}`}
      onClick={() => navigate("/")}
    >
      <img src={Logo} alt="" />
      &nbsp; Ecommerce
    </p>
  );
}
