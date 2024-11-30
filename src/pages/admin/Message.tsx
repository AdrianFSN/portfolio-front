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
  setRefreshList: React.Dispatch<React.SetStateAction<boolean>>;
}

const Message: React.FC<MessageProps> = ({ message, setRefreshList }) => {
  const { t } = useTranslation();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [formData, setFormData] = useState<{ [key: string]: boolean }>({
    read: false,
    answered: false,
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
        console.log("Esto es updatedStatus: ", updatedStatus);
        await updateMessageStatus(message._id, updatedStatus);
        setRefreshList(true);
      } catch (error) {
        setError(error as AxiosError);
        setAlertMessage(extractErrorMessage(error, t));
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
      setIsLoading(true);
      const response = await deleteMessage(message._id);
      setAlertMessage(
        (response as unknown as StandardResponseInterface).message
      );
      console.log("Esto es alertMessage: ", alertMessage);
      setRefreshList(true);
    } catch (error) {
      setError(error as AxiosError);
      setAlertMessage(extractErrorMessage(error, t));
      console.log("Esto es alertMessage: ", alertMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Esto es formData: ", formData);
  }, [formData]);

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
          onClick={(e) => {
            handleDelete(e);
          }}
        ></i>
      </div>
    </ul>
  );
};

export default Message;
