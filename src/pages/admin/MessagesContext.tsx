import React, { createContext, useContext, useState, ReactNode } from "react";
import MessageInterface from "../../@types/Message";

// Definir el tipo para el contexto
interface MessagesContextType {
  messagesList: MessageInterface[];
  setMessagesList: React.Dispatch<React.SetStateAction<MessageInterface[]>>;
  updateMessageStatus: (
    id: string,
    updatedStatus: { read: boolean; answered: boolean }
  ) => void;
  deleteMessageFromList: (id: string) => void;
}

// Crear el contexto con valores predeterminados
const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

// Proveedor del contexto
export const MessagesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messagesList, setMessagesList] = useState<MessageInterface[]>([]);

  // Función para actualizar el estado de un mensaje
  const updateMessageStatus = (
    id: string,
    updatedStatus: { read: boolean; answered: boolean }
  ) => {
    setMessagesList((prevMessages) =>
      prevMessages.map((message) =>
        message._id === id
          ? { ...message, ...updatedStatus } // Actualiza solo los campos que cambiaron
          : message
      )
    );
  };

  // Función para eliminar un mensaje de la lista
  const deleteMessageFromList = (id: string) => {
    setMessagesList((prevMessages) =>
      prevMessages.filter((message) => message._id !== id)
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messagesList,
        setMessagesList,
        updateMessageStatus,
        deleteMessageFromList,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

// Hook para usar el contexto en otros componentes
export const useMessages = (): MessagesContextType => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
