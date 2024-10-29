import "./Footer.css";
import logo from "../../assets/logos/Logo_A_Ese_Light.png";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer__section footer__logos">
        <figure className="footer__brand__logo">
          <a href="../index.html#bio">
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
                href="https://www.linkedin.com/in/adriansotes/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
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
