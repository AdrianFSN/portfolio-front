import { useEffect, useState } from "react";
import RegularButton from "../../components/shared/buttons/RegularButton";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginThunk } from "../../store/thunks/loginThunk";
import { AppDispatch } from "../../store/store";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  useEffect(() => {
    if (!inputEmail || !inputPassword) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [inputEmail, inputPassword]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginThunk({ email: inputEmail, password: inputPassword }));
  };

  return (
    <main className="main__login">
      <h1>Login</h1>
      <section>
        <form
          className="login__form"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="form__fieldset">
            <legend>
              <h3>Credentials</h3>
            </legend>
            <div className="login__fieldset__field">
              <label
                className="form__label"
                htmlFor="email"
              >
                <h4>Email</h4>
              </label>
              <input
                className="form__input"
                type="text"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                name="Email"
                id="email"
                placeholder="Your email"
                required
              />
            </div>
            <div className="login__fieldset__field">
              <label
                className="form__label"
                htmlFor="password"
              >
                <h4>Password</h4>
              </label>
              <input
                className="form__input"
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                name="Password"
                id="password"
                placeholder="Your password"
                required
              />
            </div>
          </fieldset>
          <RegularButton
            className="btn form__button"
            disabled={disableSubmit}
            type="submit"
          >
            Submit
          </RegularButton>
        </form>
      </section>
    </main>
  );
};

export default Login;
