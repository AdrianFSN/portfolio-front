import "./Messages.css";
import { useTranslation } from "react-i18next";
import TextReader from "../../components/shared/TextReader";
import MessageInterface from "../../@types/Message";
import { useEffect, useState } from "react";
import { deleteMessage, updateMessageStatus } from "./contactMesagesService";
import { AxiosError } from "axios";
import StandardResponseInterface from "../../@types/StandardResponse";
import extractErrorMessage from "../../utils/extractErrorMessage";

interface MessageProps {
  message: MessageInterface;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { t } = useTranslation();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState<{ [key: string]: boolean }>({
    read: message.read,
    answered: message.answered,
  });

  useEffect(() => {
    console.log("Esto es formData: ", formData);
  }, [formData]);

  const handleOnChange = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const { name } = event.currentTarget.dataset;
    if (name) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: !prevFormData[name],
      }));

      const updatedStatus = {
        read: formData.read,
        answered: formData.answered,
      };
      try {
        console.log("Esto es updatedStatus: ", updatedStatus);
        const response = await updateMessageStatus(message._id, updatedStatus);
        setAlertMessage(
          (response as unknown as StandardResponseInterface).message
        );
        console.log("Esto es alertMessage: ", alertMessage);
      } catch (error) {
        setError(error as AxiosError);
        setAlertMessage(extractErrorMessage(error, t));
        console.log("Esto es alertMessage: ", alertMessage);
      }
    }
  };

  const handleDelete = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await deleteMessage(message._id);
      setAlertMessage(
        (response as unknown as StandardResponseInterface).message
      );
      console.log("Esto es alertMessage: ", alertMessage);
    } catch (error) {
      setError(error as AxiosError);
      setAlertMessage(extractErrorMessage(error, t));
      console.log("Esto es alertMessage: ", alertMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ul
      key={message._id}
      className="one__message"
    >
      <li className="message__name">
        <h2>{message.name}</h2>
      </li>
      <li>{message.email}</li>
      <li>{message.subject}</li>
      <li>
        <TextReader value={message.content} />
      </li>
      <div className="message_check_list_container">
        <i
          data-name="read"
          className={`fa-solid fa-envelope-circle-check ${
            !formData.read ? "unchecked" : ""
          }`}
          onClick={handleOnChange}
        ></i>

        <i
          data-name="answered"
          className={`fa-solid fa-comment-dots ${
            !formData.answered ? "unchecked" : ""
          }`}
          onClick={handleOnChange}
        ></i>
        <i
          className="fa-solid fa-trash"
          onClick={handleDelete}
        ></i>
      </div>
    </ul>
  );
};

export default Message;
