import "./Header.css";
import logo from "../../assets/logos/Logo_A_Ese_Light.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header__mask"></div>
      <figure className="header__image">
        <a href="./index.html">
          <img
            src={logo}
            alt="Logo ¡A Ese!"
          />
        </a>
      </figure>
      <input
        type="checkbox"
        id="show__burger__menu"
      />
      <label
        htmlFor="show__burger__menu"
        className="burger"
      >
        <i className="fa-solid fa-bars"></i>
        <i className="fa-solid fa-xmark"></i>
      </label>
      <nav className="header__nav">
        <ul className="header__nav__list">
          <li className="header__nav__list__item">
            <a
              className="header__link"
              href="../index.html"
            >
              Bio
            </a>
          </li>
          <li className="header__nav__list__item">
            <a
              className="header__link"
              href="../vistas/porfolio.html"
            >
              Porfolio
            </a>
          </li>
          <li className="header__nav__list__item">
            <a
              className="header__link"
              href="../index.html#banner"
            >
              Banner
            </a>
          </li>
          <li className="header__nav__list__item">
            <a
              className="btn"
              href="../vistas/contacto.html"
            >
              CONTACTO
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
