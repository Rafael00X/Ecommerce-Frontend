import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { actions } from "../../store";
import { ReactComponent as ProfileIcon } from "../../assets/svg/user-solid.svg";
import WarningModal from "../modals/WarningModal";
import styles from "./ProfileMenu.module.css";

export default function Profile() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isWarningOpen, setIsWarningOpen] = useState(false);

  const promptForLogin = () => dispatch(actions.loginModalActions.open());

  const LoggedInMenu = (
    <>
      <li>
        <Link to="/orders">
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
        <button className="dropdown-item" onClick={promptForLogin}>
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
        {auth.jwt !== null ? LoggedInMenu : LoggedOutMenu}
      </ul>
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
