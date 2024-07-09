import {
    Avatar,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";

export default function TestWebSocket() {
    const [message, setMessage] = useState("");
    const [roomChat, setRoomChat] = useState([]);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [senderName, setSenderName] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [privateChat, setPrivateChat] = useState([]);
    const [privateMessage, setPrivateMessage] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const [onJoin, setOnJoin] = useState(false);

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const client = over(socket);

        client.connect({}, () => {
            client.subscribe("/topic/message", (message) => {
                const value = JSON.parse(message.body);
                setReceivedMessage(value);
            });
        });

        setStompClient(client);
    }, []);

    useEffect(() => {
        if (privateMessage !== null) {
            if (privateChat.length === 0) {
                const chatMessage = {
                    receiverName: privateMessage.senderName,
                    messages: [privateMessage],
                };
                privateChat.push(chatMessage);
                setPrivateChat(privateChat);
            } else {
                let flag = 0;
                const temptPrivateChat = privateChat.filter((chat) => {
                    if (chat.receiverName === privateMessage.senderName) {
                        flag++;
                        return chat.messages.push(privateMessage);
                    }
                    return chat;
                });
                if (flag === 0) {
                    const chatMessage = {
                        receiverName: privateMessage.senderName,
                        messages: [privateMessage],
                    };
                    temptPrivateChat.push(chatMessage);
                }
                setPrivateChat(temptPrivateChat);
            }
        }
        setPrivateMessage(null);
    }, [privateMessage]);

    useEffect(() => {
        if (receivedMessage != null) {
            if (receivedMessage.status === "JOIN") {
                if (
                    roomChat.filter(
                        (user) => user === receivedMessage.senderName
                    ).length === 0
                ) {
                    roomChat.push(receivedMessage.senderName);
                }
            } else if (receivedMessage.status === "MESSAGE") {
            }
            setReceivedMessage(null);
        }
    }, [receivedMessage]);

    const handleJoin = () => {
        const chatMessage = {
            senderName: senderName,
            receiverName: receiverName,
            message: message,
            status: "JOIN",
        };
        stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
        stompClient.subscribe("/user/" + senderName + "/private", (message) => {
            const value = JSON.parse(message.body);
            console.log(value);
            setPrivateMessage(value);
        });
        setMessage("");
        setOnJoin(true);
    };

    const onJoinPrivateChat = (receiverName) => {
        setReceiverName(receiverName);
    };

    const handleLeave = () => {
        setReceiverName("");
    };

    const handleSendMessage = () => {
        const chatMessage = {
            senderName: senderName,
            receiverName: receiverName,
            message: message,
            status: "MESSAGE",
        };

        stompClient.send("/app/user-chat", {}, JSON.stringify(chatMessage));

        if (privateChat.length === 0) {
            const temptChat = {
                receiverName: receiverName,
                messages: [chatMessage],
            };
            privateChat.push(temptChat);
            setPrivateChat(privateChat);
        } else {
            let flag = 0;
            const temptPrivateChat = privateChat.filter((chat) => {
                if (chat.receiverName === chatMessage.receiverName) {
                    flag++;
                    return chat.messages.push(chatMessage);
                }
                return chat;
            });
            if (flag === 0) {
                const temptChat = {
                    receiverName: receiverName,
                    messages: [chatMessage],
                };
                temptPrivateChat.push(temptChat);
            }
            setPrivateChat(temptPrivateChat);
        }
        setMessage("");
    };

    console.log(privateChat);

    return (
        <>
            <h1>Test web socket</h1>
            {roomChat.length > 0 ? <h1>Room Chat</h1> : null}
            <List>
                {roomChat.map((user, index) => {
                    return user !== senderName ? (
                        <ListItem key={index}>
                            <Button onClick={() => onJoinPrivateChat(user)}>
                                {user}
                            </Button>
                        </ListItem>
                    ) : null;
                })}
            </List>
            {receiverName !== "" ? (
                <div>
                    <input
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        placeholder="Enter message"
                    ></input>
                    <Button onClick={handleSendMessage}>Send</Button>
                    <Button onClick={handleLeave}>Leave</Button>
                </div>
            ) : null}
            {privateChat.map((chat, index) => {
                const tempt = [];
                if (chat.receiverName === receiverName) {
                    chat.messages.map((chat, index) => {
                        if (chat.receiverName !== senderName) {
                            tempt.push(
                                <div style={{ marginLeft: 90 }} key={index}>
                                    {chat.message}
                                </div>
                            );
                        } else {
                            tempt.push(<div key={index}>{chat.message}</div>);
                        }
                    });
                    return tempt;
                }
            })}
            {onJoin === false ? (
                <div>
                    <input
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Enter username"
                    ></input>
                    <Button onClick={handleJoin}>Join</Button>
                </div>
            ) : null}
        </>
    );
}
