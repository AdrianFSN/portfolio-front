import "./Messages.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getAllMessages } from "./contactMesagesService";
import { getIsLoggedSelector } from "../../store/selectors/AuthSelectors/authSelectors";
import { AxiosError } from "axios";
import CustomAlert from "../../components/shared/alert/CustomAlert";
import CustomPulseLoader from "../../components/shared/spinner/CustomPulseLoader";
import Message from "./Message";
import MessageInterface from "../../@types/Message";
import RegularButton from "../../components/shared/buttons/RegularButton";
import { useNavigate } from "react-router-dom";

const MessagesList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toBackPage = -1;
  const [messagesList, setMessagesList] = useState([]);
  const isLogged = useSelector(getIsLoggedSelector);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [refreshMessagesList, setrefreshMessagesList] = useState(false);

  useEffect(() => {
    console.log("Esto es refreshMessagesList: ", refreshMessagesList);
  }, [refreshMessagesList]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (isLogged || (isLogged && refreshMessagesList)) {
          setIsLoading(true);
          const messages = await getAllMessages();
          if (messages.data.messagesList) {
            setMessagesList(messages.data.messagesList);
            setAlertMessage(messages.data.message);
            setrefreshMessagesList(true);
          }
        }
      } catch (error) {
        setError(error as AxiosError);
        setAlertMessage((error as AxiosError).message);
        setrefreshMessagesList(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [isLogged, refreshMessagesList]);

  useEffect(() => {
    console.log("Esto es messagesList: ", messagesList);
  }, [messagesList]);

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
      {messagesList && messagesList.length > 0 ? (
        <ul>
          {messagesList.map((message: MessageInterface) => (
            <li key={message._id}>
              <Message
                message={message}
                setRefreshMessagesList={setrefreshMessagesList}
              />
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
