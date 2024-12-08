import "./Messages.css";
import { useTranslation } from "react-i18next";
import MessageInterface from "../../@types/Message";
import { useEffect, useState } from "react";
import { deleteMessage, updateMessageStatus } from "./contactMesagesService";
import { AxiosError } from "axios";
import StandardResponseInterface from "../../@types/StandardResponse";
import RegularButton from "../../components/shared/buttons/RegularButton";
import MarkdownRenderer from "../../components/shared/MarkdownRenderer";

interface MessageProps {
  message: MessageInterface;
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
}

const Message: React.FC<MessageProps> = ({ message, setRefreshList }) => {
  const { t } = useTranslation();
  const [error, setError] = useState<AxiosError | null>(null);
  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const [formData, setFormData] = useState<{ [key: string]: boolean }>({
    read: message.read,
    answered: message.answered,
  });

  useEffect(() => {
    const updateMessage = async () => {
      if (!message._id) {
        return;
      }
      const updatedStatus = {
        read: formData.read,
        answered: formData.answered,
      };
      try {
        const response = await updateMessageStatus(message._id, updatedStatus);
        console.log((response as unknown as StandardResponseInterface).message);
        setRefreshList(true);
      } catch (error) {
        setError(error as AxiosError);
        console.error((error as AxiosError).message);
      }
    };
    updateMessage();
  }, [formData.read, formData.answered, setRefreshList, message._id, t]);

  const handleOnChange = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const { name } = event.currentTarget.dataset;
    if (name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: !prevFormData[name],
      }));
    }
  };

  const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const response = await deleteMessage(message._id);
      console.log((response as unknown as StandardResponseInterface).message);
      setRefreshList(true);
    } catch (error) {
      setError(error as AxiosError);
      console.error((error as AxiosError).message);
    }
  };

  return (
    <>
      {!error && (
        <ul
          key={message._id}
          className="one__message"
        >
          <li className="message__name">
            <h2>{message.name}</h2>
          </li>
          <li>{message.email}</li>
          <li>{message.subject.join(", ")}</li>
          <li className="message__content">
            <MarkdownRenderer content={message.content} />
          </li>
          <div className="message_check_list_container">
            <i
              data-name="read"
              className={`fa-solid fa-envelope-circle-check ${
                !formData.read ? "unchecked" : "checked"
              }`}
              onClick={(e) => {
                handleOnChange(e);
              }}
            ></i>
            <i
              data-name="answered"
              className={`fa-solid fa-comment-dots ${
                !formData.answered ? "unchecked" : "checked"
              }`}
              onClick={(e) => {
                handleOnChange(e);
              }}
            ></i>
            <i
              className="fa-solid fa-trash"
              onClick={() => setConfirmDeletion(true)}
            ></i>
          </div>
        </ul>
      )}
      {confirmDeletion && (
        <section className="confirm__delete__job__overlay">
          <div className="overlay__content">
            <div className="overlay__message">
              {t("generic.confirm_deletion")}
            </div>
            <span className="overlay__buttons">
              <RegularButton onClick={() => setConfirmDeletion(false)}>
                {t("generic.cancel")}
              </RegularButton>
              <RegularButton
                $skin="danger"
                onClick={handleDelete}
              >
                {t("generic.yes")}
              </RegularButton>
            </span>
          </div>
        </section>
      )}
    </>
  );
};

export default Message;
