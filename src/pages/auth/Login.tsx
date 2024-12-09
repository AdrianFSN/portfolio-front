import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/thunks/loginThunk";
import { AppDispatch } from "../../store/store";
import {
  getAuthErrorSelector,
  getAuthLoadingSelector,
  getAuthMessageSelector,
  getIsLoggedSelector,
} from "../../store/selectors/AuthSelectors/authSelectors";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import { resetLogin } from "../../store/slices/loginSlice";
import { EDIT_ROUTES_PATH } from "../../utils/constants";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const to = EDIT_ROUTES_PATH;
  const dispatch: AppDispatch = useDispatch();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const isLogged = useSelector(getIsLoggedSelector);
  const isLoading = useSelector(getAuthLoadingSelector);
  const successMessage = useSelector(getAuthMessageSelector);
  const [alertMessage, setAlertMessage] = useState("");
  const error = useSelector(getAuthErrorSelector);

  useEffect(() => {
    if (!inputEmail || !inputPassword) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [inputEmail, inputPassword]);

  useEffect(() => {
    if (!error && successMessage) {
      setAlertMessage(successMessage);
    } else {
      setAlertMessage(error as string);
    }
  }, [successMessage, error]);

  useEffect(() => {
    if (isLogged) {
      const timer = setTimeout(() => {
        navigate(to);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLogged, navigate, to]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginThunk({ email: inputEmail, password: inputPassword }));
  };

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAlertMessage("");
    if (error) {
      dispatch(resetLogin());
    }
  };

  return (
    <main className="main__login">
      <h1>{t("login.login")}</h1>
      <section>
        {alertMessage && (
          <CustomAlert
            type={error ? "error" : "success"}
            onClick={handleCloseAlert}
          >
            {alertMessage}
          </CustomAlert>
        )}
        {isLogged ? (
          <div>
            <p>{t("login.already_signed_in")}</p>
          </div>
        ) : (
          <>
            <form
              className="login__form"
              noValidate
              onSubmit={handleSubmit}
            >
              <fieldset className="login__form__fieldset">
                <legend>
                  <h3>{t("login.credentials")}</h3>
                </legend>
                <div className="login__fieldset__field">
                  <label
                    className="login__form__label"
                    htmlFor="email"
                  >
                    <h4>{t("generic.email")}</h4>
                  </label>
                  <input
                    className="login__form__input"
                    type="text"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    name="Email"
                    id="email"
                    placeholder={t("generic.your_email")}
                    required
                  />
                </div>
                <div className="login__fieldset__field">
                  <label
                    className="login__form__label"
                    htmlFor="password"
                  >
                    <h4>{t("generic.password")}</h4>
                  </label>
                  <input
                    className="login__form__input"
                    type="password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    name="Password"
                    id="password"
                    placeholder={t("generic.your_password")}
                    required
                  />
                </div>
              </fieldset>
              <RegularButton
                className="btn login__form__button"
                disabled={disableSubmit}
                type="submit"
              >
                {isLoading ? (
                  <CustomPulseLoader
                    isLoading={isLoading}
                    $customHeight="100%"
                  />
                ) : (
                  t("generic.submit")
                )}
              </RegularButton>
            </form>
          </>
        )}
      </section>
    </main>
  );
};

export default Login;
