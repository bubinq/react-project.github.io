import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage } from "./ErrorMessage";
import { axiosInstance } from "../../utils";
import { AuthContext } from "../../contexts/authContext";

export const RegisterModal = ({ showModalHandler, switchHandler, form }) => {
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isFocused, setFocus] = useState({
    email: false,
    password: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);

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

  async function registerHandler(ev) {
    ev.preventDefault();

    const { email, password, repass } = Object.fromEntries(
      new FormData(ev.target)
    );
    try {
      const response = await axiosInstance.post(
        "/auth/register",
        {
          email: email.trim(),
          password: password.trim(),
          repass: repass.trim(),
        },
        { withCredentials: true }
      );
      setAuthUser(response.data.savedUser);
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
      setErrorMessage("")
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }
  return (
    <>
      <div className="overlay" onClick={showModalHandler}></div>
      <div className="modal-content">
        <h3>Create account</h3>
        <div className="text-wrapper">
          <span>Already have an account?</span>
          <Link to="/" onClick={() => switchHandler(true)}>
            Sign in
          </Link>
        </div>
        {showErrorWhen && <ErrorMessage message={errorMessage}></ErrorMessage>}

        <form onSubmit={registerHandler}>
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

          <div className="password-wrapper">
            <label
              htmlFor="repass"
              className={isFocused.repass ? "focused" : "labels"}
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="repass"
              id="repass"
              onBlur={labelHandler}
              onFocus={labelHandler}
              required
            />
          </div>

          <div className="authBtn">
            <button>Register</button>
          </div>
        </form>
        <div className="modal-close">
          <button onClick={showModalHandler}>&#x2716;</button>
        </div>
      </div>
    </>
  );
};
