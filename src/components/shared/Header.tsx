import "./Header.css";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logos/Logo_A_Ese_Light.png";
import LanguageSwitcher from "./localization/LanguageSwitcher";
import { useNavigate } from "react-router-dom";
import {
  ABOUT_ME_ROUTES_PATH,
  AUTH_ROUTES_PATH,
  DEVELOPMENT_ROUTES_PATH,
} from "../../utils/constants";
import RegularButton from "./buttons/RegularButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedSelector } from "../../store/selectors/AuthSelectors/authSelectors";
import { logout } from "../../api/client";
import { AppDispatch } from "../../store/store";
import { resetLogin } from "../../store/slices/loginSlice";

const Header = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [showBurgerBars, setShowBurgerBars] = useState(true);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [showLogout, setShowLogout] = useState(false);
  const [showLanguageList, setShowLanguageList] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedSelector);

  useEffect(() => {
    if (isLoggedIn) {
      setShowLogout(true);
    } else {
      setShowLogout(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowBurgerBars(false);
        setWindowSize(768);
      } else {
        setShowBurgerBars(true);
        setWindowSize(425);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenBurgerMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowBurgerBars(false);
  };
  const handleCloseBurgerMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowBurgerBars(true);
  };

  const handleNavigateTo = (route: string) => {
    setShowBurgerBars(true);
    navigate(route);
  };

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    logout();
    dispatch(resetLogin());
  };

  const handleShowLangFlags = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowLanguageList(!showLanguageList);
    setShowBurgerBars(true);
  };

  return (
    <header className="header">
      <div className="header__mask"></div>
      <figure className="header__image">
        <img
          src={logo}
          alt="Logo ¡A Ese!"
          onClick={() => navigate("/")}
        />
      </figure>
      <div className="burger">
        {showBurgerBars ? (
          <i
            className="fa-solid fa-bars"
            onClick={handleOpenBurgerMenu}
          ></i>
        ) : (
          <i
            className="fa-solid fa-xmark"
            onClick={handleCloseBurgerMenu}
          ></i>
        )}
      </div>
      <nav
        className={
          showBurgerBars && windowSize < 768 ? "hidden" : "header__nav"
        }
      >
        <ul className="header__nav__list">
          <li className="lang__switcher">
            {!showLanguageList ? (
              <div onClick={handleShowLangFlags}> {t("generic.language")}</div>
            ) : (
              <div onClick={handleShowLangFlags}>
                <LanguageSwitcher
                  className="lang__content"
                  flag={true}
                />
              </div>
            )}
          </li>
          <li className="header__nav__list__item">
            <p
              className="header__link"
              onClick={() => handleNavigateTo(ABOUT_ME_ROUTES_PATH)}
            >
              {t("bio.title")}
            </p>
          </li>
          <li className="header__nav__list__item">
            <p
              className="header__link"
              onClick={() => handleNavigateTo(DEVELOPMENT_ROUTES_PATH)}
            >
              {t("admin.development")}
            </p>
          </li>

          <li className="header__nav__list__item">
            <RegularButton
              $skin="danger"
              onClick={() => handleNavigateTo(AUTH_ROUTES_PATH)}
            >
              {t("generic.contact")}
            </RegularButton>
          </li>
          {showLogout && (
            <li className="header__nav__list__item">
              <RegularButton onClick={handleLogout}>
                {t("admin.logout")}
              </RegularButton>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
