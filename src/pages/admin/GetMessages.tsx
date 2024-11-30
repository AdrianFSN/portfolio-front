import "./Messages.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import {
  deleteMessage,
  getAllMessages,
  updateMessageStatus,
} from "./contactMesagesService";
import { getIsLoggedSelector } from "../../store/selectors/AuthSelectors/authSelectors";
import { AxiosError } from "axios";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import Message from "./Message";
import MessageInterface from "../../@types/Message";
import RegularButton from "../../components/shared/buttons/RegularButton";
import { useNavigate } from "react-router-dom";
import StandardResponseInterface from "../../@types/StandardResponse";
import extractErrorMessage from "../../utils/extractErrorMessage";

const MessagesList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toBackPage = -1;
  const [messagesList, setMessagesList] = useState([]);
  const isLogged = useSelector(getIsLoggedSelector);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [messageId, setMesssageId] = useState("");
  const [formData, setFormData] = useState<{ [key: string]: boolean }>({
    read: false,
    answered: false,
  });

  const [forceRead, setForceRead] = useState(false);
  const [forceAnswered, setForceAnswered] = useState(false);

  const [refreshList, setRefreshList] = useState(true);
  useEffect(() => {
    console.log("Esto es refreshList: ", refreshList);
  }, [refreshList]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (refreshList) {
          setIsLoading(true);
          const messages = await getAllMessages();
          if (messages.data.messagesList) {
            setMessagesList(messages.data.messagesList);
            setAlertMessage(messages.data.message);
          }
        }
      } catch (error) {
        setError(error as AxiosError);
        setAlertMessage((error as AxiosError).message);
      } finally {
        setIsLoading(false);
        setRefreshList(false);
      }
    };
    fetchMessages();
  }, [refreshList]);

  useEffect(() => {
    const updateMessage = async () => {
      if (!messageId) {
        return;
      }
      const updatedStatus = {
        read: formData.read,
        answered: formData.answered,
      };
      try {
        console.log("Esto es updatedStatus: ", updatedStatus);
        await updateMessageStatus(messageId, updatedStatus);
        setRefreshList(true);
        //console.log("Esto es alertMessage: ", alertMessage);
      } catch (error) {
        setError(error as AxiosError);
        setAlertMessage(extractErrorMessage(error, t));
        //console.log("Esto es alertMessage: ", alertMessage);
      }
    };
    updateMessage();
  }, [formData.read, formData.answered, messageId, t]);

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
      const response = await deleteMessage(messageId);
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

  useEffect(() => {
    console.log("Esto es messagesList: ", messagesList);
  }, [messagesList]);
  useEffect(() => {
    console.log("Esto es messageId: ", messageId);
  }, [messageId]);

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAlertMessage("");
    setError(null);
  };

  return (
    <main className="messages__list__container">
      <h1>{t("contact.mailbox")}</h1>
      {alertMessage && (
        <CustomAlert
          type={error ? "error" : "success"}
          onClick={handleCloseAlert}
        >
          {alertMessage}
        </CustomAlert>
      )}
      {isLoading && (
        <CustomPulseLoader
          isLoading={isLoading}
          $customHeight="100%"
        />
      )}
      {isLogged && messagesList && messagesList.length > 0 ? (
        <ul>
          {messagesList.map((message: MessageInterface) => (
            <li key={message._id}>
              <Message message={message} />
              <div className="message_check_list_container">
                <i
                  data-name="read"
                  className={`fa-solid fa-envelope-circle-check ${
                    !formData.read ? "unchecked" : "checked"
                  }`}
                  onClick={(e) => {
                    setMesssageId(message._id);
                    handleOnChange(e);
                  }}
                ></i>
                <i
                  data-name="answered"
                  className={`fa-solid fa-comment-dots ${
                    !formData.answered ? "unchecked" : "checked"
                  }`}
                  onClick={(e) => {
                    setMesssageId(message._id);
                    handleOnChange(e);
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  onClick={(e) => {
                    setMesssageId(message._id);
                    handleDelete(e);
                  }}
                ></i>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        t("generic.empty_list")
      )}
      <div>
        <RegularButton
          $skin="danger"
          onClick={() => navigate(toBackPage)}
        >
          {t("generic.back")}
        </RegularButton>
      </div>
    </main>
  );
};

export default MessagesList;
