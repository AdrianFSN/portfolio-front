import "./LanguageSwitcher.css";
import i18n from "i18next";
import FlagSelector from "./FlagSelector";
import { useTranslation } from "react-i18next";
//import Cookies from "js-cookie";
import RegularButton from "../buttons/RegularButton";
import {
  LANGUAGE_CODES,
  LOCALIZABLE_LANGUAGES,
} from "../../../utils/constants";

interface LanguageSwitcherProps {
  flag: boolean;
  className: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  flag,
  className,
}) => {
  const { t } = useTranslation();
  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    //Cookies.set("formatLanguage", lng, 365);
  };

  return (
    <div className={className}>
      {LOCALIZABLE_LANGUAGES.map((language) => (
        <RegularButton
          key={language}
          className="lang__switcher__button"
          onClick={() => handleLanguageChange(language)}
          aria-label={`${t(
            "generic.switch_language_to"
          )} ${language.toUpperCase()}`}
        >
          {flag ? (
            <FlagSelector
              countryCode={LANGUAGE_CODES[language]}
              customWidth={"30px"}
              customHeight={"18px"}
            />
          ) : (
            language.toUpperCase()
          )}
        </RegularButton>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
