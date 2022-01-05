import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
var CryptoJs = require("crypto-js");

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId, userName) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {

      var secret = CryptoJs.SHA256(roomId);
      var bytes = CryptoJs.AES.decrypt(message, secret.toString().substring(0,18));
      var decryptedData = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));

      const incomingMessage = {
        ...decryptedData,
        ownedByCurrentUser: decryptedData.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {

    var dataToSend = {
      body: messageBody,
      senderId: socketRef.current.id,
      username: userName,
    }
    var secret = CryptoJs.SHA256(roomId);

    var cipherText = CryptoJs.AES.encrypt(JSON.stringify(dataToSend),secret.toString().substring(0,18)).toString();
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, cipherText);
  };

  return { messages, sendMessage };
};

export default useChat;