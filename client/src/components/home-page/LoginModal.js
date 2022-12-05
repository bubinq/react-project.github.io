import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "./ErrorMessage";
import { AuthContext } from "../../contexts/authContext";

import { axiosInstance } from "../../utils";

export const LoginModal = ({ showModalHandler, switchHandler, form }) => {
  const navigateTo = useNavigate();

  const [isFocused, setFocus] = useState({
    email: false,
    password: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { setAuthUser } = useContext(AuthContext);

  const showErrorWhen = isClicked && errorMessage;

  useEffect(() => {
    return () => {
      setIsClicked(true);
    };
  }, [errorMessage]);

  const labelHandler = (ev) => {
    let input = ev.target;
    if (input.value.trim()) {
      setFocus((oldFocus) => ({ ...oldFocus, [input.name]: true }));
      return;
    }
    setFocus((oldFocus) => ({
      ...oldFocus,
      [input.name]: !isFocused[`${input.name}`],
    }));
  };

  async function loginHandler(ev) {
    ev.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(ev.target));

    try {
      const response = await axiosInstance.post(
        "/auth/login",
        {
          email: email.trim(),
          password: password.trim(),
        },
        { withCredentials: true }
      );
      setAuthUser(response.data.details);
      if (form.goal) {
        await axiosInstance.post(
          "/goals/create",
          {
            goal: form.goal,
            duration: form.duration,
            createdAt: form.createdAt,
            expiresAt: form.expiresAt
          },
          { withCredentials: true }
        );
      }
      setErrorMessage("");
      navigateTo("/dashboard");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }

  return (
    <>
      <div className="overlay" onClick={showModalHandler}></div>
      <div className="modal-content">
        <h3>Welcome back</h3>
        <div className="text-wrapper">
          <span>Don't have an account?</span>
          <Link to="/" onClick={() => switchHandler(false)}>
            Sign up
          </Link>
        </div>

        {showErrorWhen && <ErrorMessage message={errorMessage}></ErrorMessage>}

        <form onSubmit={loginHandler}>
          <div className="email-wrapper">
            <label
              htmlFor="email"
              className={isFocused.email ? "focused" : "labels"}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onBlur={labelHandler}
              onFocus={labelHandler}
              autoComplete="off"
              required
            />
          </div>

          <div className="password-wrapper">
            <label
              htmlFor="password"
              className={isFocused.password ? "focused" : "labels"}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onBlur={labelHandler}
              onFocus={labelHandler}
              required
            />
          </div>

          <div className="authBtn">
            <button>Log in</button>
          </div>
        </form>
        <div className="modal-close">
          <button onClick={showModalHandler}>&#x2716;</button>
        </div>
      </div>
    </>
  );
};
