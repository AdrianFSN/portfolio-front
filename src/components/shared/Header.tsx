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

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showBurgerBars, setShowBurgerBars] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowBurgerBars(false);
      } else {
        setShowBurgerBars(true);
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
      <nav className={showBurgerBars ? "hidden" : "header__nav"}>
        <ul className="header__nav__list">
          <li className="lang__switcher">
            <LanguageSwitcher
              className="lang__content"
              flag={true}
            />
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
              className="btn"
              $skin="danger"
              onClick={() => handleNavigateTo(AUTH_ROUTES_PATH)}
            >
              {t("generic.contact")}
            </RegularButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
