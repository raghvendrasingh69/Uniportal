import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../api/axios";

function NotificationsPage() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        fetchNotifications();

    }, []);

    const fetchNotifications = async () => {

        try {

            const response = await api.get(
                "/notifications"
            );

            setNotifications(
                response.data.notifications
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <Navbar />

            <div className="p-10">

                <h1 className="text-4xl font-bold mb-10">
                    Notifications 🔔
                </h1>

                <div className="space-y-5">

                    {notifications.map((notification) => (

                        <div
                            key={notification.id}
                            className="bg-white shadow-lg rounded-2xl p-6"
                        >

                            <h2 className="text-2xl font-bold">
                                {notification.title}
                            </h2>

                            <p className="mt-3 text-gray-600">
                                {notification.message}
                            </p>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default NotificationsPage;