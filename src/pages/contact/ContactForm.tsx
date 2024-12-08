import { useEffect, useState } from "react";
import "./ContactForm.css";
import { useTranslation } from "react-i18next";
import RegularButton from "../../components/shared/buttons/RegularButton";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import {
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  NOT_ALLOWED_HTML_TAGS,
  VALID_CATEGORIES,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import { AxiosError } from "axios";
import StandardResponseInterface from "../../@types/StandardResponse";
import extractErrorMessage from "../../utils/extractErrorMessage";
import { createNewMessage } from "../admin/contactMesagesService";
import decodeHtmlEntities from "../../utils/decodedHtmlEntities";

const CreateNewMessage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toBackPage = -1;
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);

  interface ContactFormInterface {
    name: string;
    email: string;
    subject: string[];
    content: string;
    opt_in: boolean;
    read: boolean;
    answered: boolean;
  }

  const [formData, setFormData] = useState<ContactFormInterface>({
    name: "",
    email: "",
    subject: [],
    content: "",
    opt_in: false,
    read: false,
    answered: false,
  });

  useEffect(() => {
    if (formData.content.length > MESSAGE_MAX_LENGTH) {
      setError(new Error(`${t("errors.message_too_long")}`) as AxiosError);
    } else {
      setError(null);
    }
  }, [formData.content, t]);

  useEffect(() => {
    const decodedName = decodeHtmlEntities(formData.name);
    const decodedEmail = decodeHtmlEntities(formData.email);
    const decodedMessage = decodeHtmlEntities(formData.content);
    const regex = new RegExp(
      `</?(${NOT_ALLOWED_HTML_TAGS.join("|")})(\\s|>|/|$)`,
      "gi"
    );

    if (
      regex.test(decodedMessage) ||
      regex.test(decodedName) ||
      regex.test(decodedEmail)
    ) {
      setError(new Error(`${t("errors.not_allowed_tags")}`) as AxiosError);
    } else {
      setError(null);
    }
  }, [formData.name, formData.email, formData.content, t]);

  useEffect(() => {
    if (error) {
      setAlertMessage(error.message);
      setDisableSubmit(true);
    } else {
      setAlertMessage("");
    }
  }, [error]);

  useEffect(() => {
    if (
      formData.name &&
      formData.email &&
      formData.opt_in &&
      formData.content &&
      !error
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [error, formData.name, formData.email, formData.opt_in, formData.content]);

  const handleFormOnChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type } = event.target;

    if (event.target instanceof HTMLSelectElement) {
      const selectedValues = Array.from(event.target.options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedValues,
      }));
    } else if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: (event.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: event.target.value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await createNewMessage(formData);
      setAlertMessage(
        (response as unknown as StandardResponseInterface).message
      );
      setError(null);
      setFormData({
        name: "",
        email: "",
        subject: [],
        content: "",
        opt_in: false,
        read: false,
        answered: false,
      });
    } catch (error) {
      setError(error as AxiosError);
      setAlertMessage(extractErrorMessage(error, t));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAlertMessage("");
  };

  const handleToBackPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(toBackPage);
  };

  return (
    <main className="contact__message__form">
      <h1>{t("contact.write_a_message_title")}</h1>
      {alertMessage && (
        <CustomAlert
          type={error ? "error" : "success"}
          onClick={handleCloseAlert}
        >
          {alertMessage}
        </CustomAlert>
      )}
      <form
        className="contact__form"
        noValidate
        onSubmit={handleSubmit}
      >
        <fieldset className="form__fieldset">
          <legend>
            <h3>{t("contact.your_data")}</h3>
          </legend>
          <div className="form__fieldset__field">
            <label
              className="form__label"
              htmlFor="name"
            >
              <h4>{t("contact.name")}</h4>
            </label>
            <input
              className="form__input"
              type="text"
              value={formData.name}
              onChange={handleFormOnChange}
              name="name"
              id="name"
              placeholder={t("contact.your_name")}
              max-length={NAME_MAX_LENGTH}
            />
          </div>
          <div className="form__fieldset__field">
            <label
              className="form__label"
              htmlFor="email"
            >
              <h4>{t("generic.email")}</h4>
            </label>
            <input
              className="form__input"
              type="text"
              value={formData.email}
              onChange={handleFormOnChange}
              name="email"
              id="email"
              placeholder={t("contact.your_email")}
              max-length={EMAIL_MAX_LENGTH}
            />
          </div>
          <div className="form__fieldset__field">
            <label
              className="form__label"
              htmlFor="content"
            >
              <h4>{t("contact.message")}</h4>
            </label>
            <textarea
              className="form__textarea"
              value={formData.content}
              onChange={handleFormOnChange}
              name="content"
              id="content"
              max-length={MESSAGE_MAX_LENGTH}
              placeholder={t("contact.your_message")}
              wrap="hard"
            />
            <p>{`${formData.content.length} / ${MESSAGE_MAX_LENGTH} ${t(
              "generic.characters"
            )}`}</p>
          </div>
        </fieldset>
        <fieldset className="form__fieldset first__fieldset">
          <legend>
            <h3>{t("contact.subject_of_the_message")}</h3>
          </legend>
          <div className="form__fieldset__field">
            <label
              className="form__label"
              htmlFor="subject"
            >
              <h4>{t("generic.category")}</h4>
            </label>
            <select
              className="form__select"
              value={formData.subject}
              onChange={handleFormOnChange}
              name="subject"
              id="subject"
              multiple
            >
              {VALID_CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {t(`generic.${category}`)}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <div className="form__accept">
          <label
            className="form__label"
            htmlFor="opt_in"
          >
            <input
              type="checkbox"
              name="opt_in"
              id="opt_in"
              onChange={handleFormOnChange}
              checked={formData.opt_in}
            />
            <p>{t("contact.accept_save_contact_data")}</p>
          </label>
        </div>

        <div className="form__submit__cancel__buttons">
          <RegularButton
            className="btn form__button"
            type="submit"
            disabled={disableSubmit}
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
          <RegularButton
            className="btn form__button"
            type="button"
            $skin="danger"
            onClick={handleToBackPage}
          >
            {t("generic.back")}
          </RegularButton>
        </div>
      </form>
    </main>
  );
};

export default CreateNewMessage;
