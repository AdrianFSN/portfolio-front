import "./Messages.css";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

  const [refreshList, setRefreshList] = useState(true);

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
          $customHeight="200px"
        />
      )}
      {isLogged && messagesList && messagesList.length > 0 ? (
        <ul>
          {messagesList.map((message: MessageInterface) => (
            <li key={message._id}>
              <Message
                message={message}
                setRefreshList={setRefreshList}
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
          className="mail_box_back"
        >
          {t("generic.back")}
        </RegularButton>
      </div>
    </main>
  );
};

export default MessagesList;
