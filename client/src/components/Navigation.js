import { Link, useNavigate } from "react-router-dom";
import styles from "./dashboard-page/Dashboard.module.css";
import { useContext } from "react";
import { axiosInstance } from "../utils";
import { AuthContext } from "../contexts/authContext";

export const Navigation = () => {
  const location = window.location.pathname.split("/")[1];

  const { auth, setAuthUser } = useContext(AuthContext);

  const navigateTo = useNavigate();

  const logoutHandler = async (ev) => {
    ev.preventDefault();

    if (window.confirm("Are you sure you want to logout?")) {
      try {
        await axiosInstance.get("/auth/logout", { withCredentials: true });
        setAuthUser(null)
        sessionStorage.clear();
        navigateTo("/", { replace: true });
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      navigateTo("/dashboard");
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        {auth && (
          <ul>
            <Link to="/dashboard" className={styles.welcomeLink}>
              Welcome, {auth.email.split("@")[0]}
            </Link>
            {location === "dashboard" && (
              <Link
                to="/progress"
                className={styles.navigationLinks}
              >
                Track Progress
              </Link>
            )}
            {location !== "dashboard" && (
              <Link to="/dashboard" className={styles.navigationLinks}>
                Dashboard
              </Link>
            )}
            <Link
              to="/dashboard"
              onClick={logoutHandler}
              className={styles.navigationLinks}
            >
              Log Out
            </Link>
          </ul>
        )}
      </nav>
    </header>
  );
};
