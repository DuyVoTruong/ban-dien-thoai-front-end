import { useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;
const ChatRoom = () => {
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: "",
        receivername: "",
        connected: false,
        message: "",
    });

    const handleValue = (event) => {
        const { value, name } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const registerUser = () => {
        let Sock = new SockJS("http://localhost:8080/ws");
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
        stompClient.subscribe(
            "/user/" + userData.username + "/private",
            onPrivateMessageReceived
        );
        userJoin();
    };

    const userJoin = () => {
        let chatMessage = {
            senderName: userData.username,
            status: "JOIN",
        };

        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        setUserData({ ...userData, message: "" });
    };

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    };

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.get(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const onError = (err) => {
        console.log(err);
    };

    const sendPublicMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE",
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: "" });
        }
    };

    const sendPrivateMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                receivername: tab,
                message: userData.message,
                status: "MESSAGE",
            };
            if (userData.username !== tab) {
                privateChats.set(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send(
                "/app/private-message",
                {},
                JSON.stringify(chatMessage)
            );
            setUserData({ ...userData, message: "" });
        }
    };

    return (
        <>
            {userData.connected ? (
                <div>
                    <div>
                        <ul>
                            <li
                                onClick={() => {
                                    setTab("CHATROOM");
                                }}
                            >
                                Chatroom
                            </li>
                            {[...privateChats.keys()].map((name, index) => {
                                <li
                                    onClick={() => {
                                        setTab(name);
                                    }}
                                    key={index}
                                >
                                    {name}
                                </li>;
                            })}
                        </ul>
                    </div>
                    <div>
                        {tab === "CHATROOM" && (
                            <div>
                                {publicChats.map((chat, index) => {
                                    <li key={index}>
                                        {chat.senderName !==
                                            userData.username && (
                                            <div>{chat.senderName}</div>
                                        )}
                                        <div>{chat.message}</div>
                                        {chat.senderName ===
                                            userData.username && (
                                            <div>{chat.senderName}</div>
                                        )}
                                    </li>;
                                })}
                                <div>
                                    <input
                                        name="message"
                                        type="text"
                                        placeholder="Enter public message"
                                        value={userData.message}
                                        onChange={handleValue}
                                    ></input>
                                    <button
                                        type="button"
                                        onClick={sendPublicMessage}
                                    >
                                        send
                                    </button>
                                </div>
                            </div>
                        )}
                        {tab !== "CHATROOM" && (
                            <div>
                                {[...privateChats.get(tab)].map(
                                    (chat, index) => {
                                        <li key={index}>
                                            {chat.senderName !==
                                                userData.username && (
                                                <div>{chat.senderName}</div>
                                            )}
                                            <div>{chat.message}</div>
                                            {chat.senderName ===
                                                userData.username && (
                                                <div>{chat.senderName}</div>
                                            )}
                                        </li>;
                                    }
                                )}
                                <div>
                                    <input
                                        name="message"
                                        type="text"
                                        placeholder={`Enter private message for ${tab}`}
                                        value={userData.message}
                                        onChange={handleValue}
                                    ></input>
                                    <button
                                        type="button"
                                        onClick={sendPrivateMessage}
                                    >
                                        send
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <input
                        id="user-name"
                        name="username"
                        placeholder="Enter the user name"
                        value={userData.username}
                        onChange={handleValue}
                    ></input>
                    <button onClick={registerUser}>connect</button>
                </div>
            )}
        </>
    );
};

export default ChatRoom;
