import "./Footer.css";
import logo from "../../assets/logos/Logo_A_Ese_Light.png";
import { AS_GIT_HUB, AS_LINKEDIN } from "../../utils/constants";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer__section footer__logos">
        <figure className="footer__brand__logo">
          <a href="/">
            <img
              src={logo}
              alt="Logo ¡A Ese!"
            />
          </a>
        </figure>
        <nav>
          <ul className="social__icons">
            <li className="footer__social__icon__item">
              <a
                href={AS_LINKEDIN}
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li className="footer__social__icon__item">
              <a
                href={AS_GIT_HUB}
                target="_blank"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <section className="footer__section">
        <div className="footer__copyright">
          <p>2024 - Todos los derechos reservados.</p>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
