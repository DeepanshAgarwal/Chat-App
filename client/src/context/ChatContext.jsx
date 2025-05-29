import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});
    const [latestMessages, setLatestMessages] = useState({});
    const { socket, axios, onlineUsers } = useContext(AuthContext);

    //get all users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
                setLatestMessages(data.latestMessages);
            }
        } catch {
            toast.error("Failed to fetch users");
        }
    };

    //get messages for selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    //send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(
                `/api/messages/send/${selectedUser._id}`,
                messageData
            );
            if (data.success) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    data.newMessage,
                ]);
                getUsers();
            } else {
                toast.error(data.success);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    //subscribe to messages for selected user
    const subscribeToMessages = async () => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId]: prevUnseenMessages[
                        newMessage.senderId
                    ]
                        ? prevUnseenMessages[newMessage.senderId] + 1
                        : 1,
                }));
            }
            getUsers();
        });
    };

    //unsubscribe from messages
    const unsubscribeToMessages = () => {
        if (socket) socket.off("newMessage");
    };

    // Fetch latest selectedUser data if onlineUsers changes and selectedUser is now offline
    useEffect(() => {
        if (selectedUser && !onlineUsers.includes(selectedUser._id)) {
            // Re-fetch user data for selectedUser
            axios.get('/api/messages/users').then(({ data }) => {
                if (data.success) {
                    const updated = data.users.find(u => u._id === selectedUser._id);
                    if (updated) setSelectedUser(updated);
                }
            });
        }
    }, [onlineUsers, selectedUser, axios]);

    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeToMessages();
    }, [socket, selectedUser]);

    const value = {
        users,
        getUsers,
        messages,
        getMessages,
        sendMessage,
        selectedUser,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
        latestMessages,
    };

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};
