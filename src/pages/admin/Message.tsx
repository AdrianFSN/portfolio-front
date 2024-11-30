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
