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
import PageController from "../../components/shared/controllers/PageController";
import {
  MESSAGES_LIST_LIMIT_DEFAULT,
  MESSAGES_LIST_LIMIT_OVER_769,
  MESSAGES_LIST_LIMIT_UNDER_769,
  PAGE_DEFAULT,
} from "../../utils/constants";
import { updateLimitByScreenSize } from "../../utils/updateLimitByScreenSize";

const MessagesList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toBackPage = -1;
  const [messagesList, setMessagesList] = useState<MessageInterface[]>([]);
  const isLogged = useSelector(getIsLoggedSelector);
  const [error, setError] = useState<AxiosError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [refreshList, setRefreshList] = useState(true);
  const [messagesCurrentPage, setMessagesCurrentPage] = useState(0);
  const [messagesTotalPages, setMessagesTotalPages] = useState(0);
  const [page, setPage] = useState(PAGE_DEFAULT);
  const [limit, setLimit] = useState(MESSAGES_LIST_LIMIT_DEFAULT);

  useEffect(() => {
    console.log("Esto es limit: ", limit);
  }, [limit]);

  useEffect(() => {
    updateLimitByScreenSize(
      setLimit,
      MESSAGES_LIST_LIMIT_UNDER_769,
      MESSAGES_LIST_LIMIT_OVER_769
    );
    const handleResize = () =>
      updateLimitByScreenSize(
        setLimit,
        MESSAGES_LIST_LIMIT_UNDER_769,
        MESSAGES_LIST_LIMIT_OVER_769
      );
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [messagesList]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (refreshList) {
          setIsLoading(true);
          const messages = await getAllMessages(page?.toString(), limit);
          if (messages.data.messagesList) {
            setMessagesList(messages.data.messagesList);
            setAlertMessage(messages.data.message);
            setMessagesTotalPages(messages.data.totalPages);
            setMessagesCurrentPage(messages.data.currentPage);
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
  }, [refreshList, limit, page]);

  const handleCloseAlert = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setAlertMessage("");
    setError(null);
  };

  const handleNextPage = () => {
    setPage(((page as number) % messagesTotalPages) + 1);
    setRefreshList(true);
  };
  const handlePrevPage = () => {
    setPage(
      (((page as number) - 2 + messagesTotalPages) % messagesTotalPages) + 1
    );
    setRefreshList(true);
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
          <PageController
            className="messages__list__page__controller"
            page={page}
            limit={limit}
            prev={handlePrevPage}
            next={handleNextPage}
            currentPage={messagesCurrentPage}
            totalPages={messagesTotalPages}
          >
            {messagesList.map((message: MessageInterface) => (
              <li key={message._id}>
                <Message
                  message={message}
                  setRefreshList={setRefreshList}
                />
              </li>
            ))}
          </PageController>
        </ul>
      ) : (
        <p>{t("generic.empty_list")}</p>
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
