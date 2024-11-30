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
  setRefreshMessagesList: React.Dispatch<React.SetStateAction<boolean>>;
}

const Message: React.FC<MessageProps> = ({
  message,
  setRefreshMessagesList,
}) => {
  const { t } = useTranslation();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState<{ [key: string]: boolean }>({
    read: false,
    answered: false,
  });

  useEffect(() => {
    if (message.read || message.answered) {
      setFormData((prevValues) => ({
        ...prevValues,
        read: message.read,
        answered: message.answered,
      }));
    }
  }, [message.read, message.answered]);

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
        setRefreshMessagesList(true);
      } catch (error) {
        setError(error as AxiosError);
        setAlertMessage(extractErrorMessage(error, t));
        console.log("Esto es alertMessage: ", alertMessage);
        setRefreshMessagesList(false);
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
      setRefreshMessagesList(true);
    } catch (error) {
      setError(error as AxiosError);
      setAlertMessage(extractErrorMessage(error, t));
      console.log("Esto es alertMessage: ", alertMessage);
      setRefreshMessagesList(false);
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
    </ul>
  );
};

export default Message;
