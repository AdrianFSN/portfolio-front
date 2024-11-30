import "./Header.css";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logos/Logo_A_Ese_Light.png";
import LanguageSwitcher from "./localization/LanguageSwitcher";
import { useNavigate } from "react-router-dom";
import {
  ABOUT_ME_ROUTES_PATH,
  AUDIO_ROUTES_PATH,
  CONTACT_ROUTES_PATH,
  DESIGN_ROUTES_PATH,
  DEVELOPMENT_ROUTES_PATH,
  LIVEOPS_ROUTES_PATH,
  MESSAGES_ROUTES_PATH,
  PHOTOGRAPHY_ROUTES_PATH,
  VIDEO_ROUTES_PATH,
  WRITING_ROUTES_PATH,
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
  const [showReadMessages, setShowReadMessages] = useState(false);
  const [showLanguageList, setShowLanguageList] = useState(false);
  const isLoggedIn = useSelector(getIsLoggedSelector);
  const portfolioSubjects = [
    {
      subject: t("admin.development"),
      url: DEVELOPMENT_ROUTES_PATH,
    },
    {
      subject: t("admin.liveOps"),
      url: LIVEOPS_ROUTES_PATH,
    },
    {
      subject: t("admin.writing"),
      url: WRITING_ROUTES_PATH,
    },
    {
      subject: t("admin.audio"),
      url: AUDIO_ROUTES_PATH,
    },
    {
      subject: t("admin.video"),
      url: VIDEO_ROUTES_PATH,
    },
    {
      subject: t("admin.design"),
      url: DESIGN_ROUTES_PATH,
    },
    {
      subject: t("admin.photography"),
      url: PHOTOGRAPHY_ROUTES_PATH,
    },
  ];

  useEffect(() => {
    if (isLoggedIn) {
      setShowLogout(true);
      setShowReadMessages(true);
    } else {
      setShowLogout(false);
      setShowReadMessages(false);
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
    setShowBurgerBars(true);
  };
  const handleToMessages = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(MESSAGES_ROUTES_PATH);
    setShowBurgerBars(true);
  };

  const handlePortfolioChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedUrl = event.target.value;
    if (selectedUrl) {
      setShowBurgerBars(true);
      navigate(selectedUrl);
    }
  };

  const handleShowLangFlags = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowLanguageList(true);
    setShowBurgerBars(false);
  };
  const handleHideLangFlags = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setShowLanguageList(false);
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
              <div className="header__nav__list__item">
                <div
                  className="header__link"
                  onClick={handleShowLangFlags}
                >
                  {t("generic.language")}
                </div>
              </div>
            ) : (
              <div onClick={handleHideLangFlags}>
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
            <div className="header__link">
              <select
                className="portfolio__select"
                onChange={handlePortfolioChange}
                defaultValue=""
              >
                <option
                  value=""
                  disabled
                >
                  {t("generic.select_portfolio_subject")}
                </option>
                {portfolioSubjects.map((item, index) => (
                  <option
                    key={index}
                    value={item.url}
                  >
                    {item.subject}
                  </option>
                ))}
              </select>
            </div>
          </li>

          <li className="header__nav__list__item">
            <RegularButton
              $skin="danger"
              onClick={() => handleNavigateTo(CONTACT_ROUTES_PATH)}
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
          {showReadMessages && (
            <li className="header__nav__list__item">
              <RegularButton onClick={handleToMessages}>
                {t("admin.read")}
              </RegularButton>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
