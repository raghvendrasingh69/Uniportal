import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../api/axios";

function AdminPendingEventsPage() {

    const [events, setEvents] = useState([]);

    useEffect(() => {

        fetchPendingEvents();

    }, []);

    const fetchPendingEvents = async () => {

        try {

            const response = await api.get(
                "/admin/pending-events"
            );

            setEvents(response.data.events);

        } catch (error) {

            console.log(error);
        }
    };

    const approveEvent = async (id) => {

        try {

            await api.put(
                `/admin/events/approve/${id}`
            );

            alert("Event approved 🚀");

            fetchPendingEvents();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-10">

                <h1 className="text-5xl font-bold mb-10">
                    Pending Events 🚀
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {events.map((event) => (

                        <div
                            key={event.id}
                            className="bg-white p-8 rounded-3xl shadow-xl"
                        >

                            <h2 className="text-3xl font-bold">
                                {event.title}
                            </h2>

                            <p className="mt-4 text-gray-600">
                                {event.description}
                            </p>

                            <button
                                onClick={() =>
                                    approveEvent(event.id)
                                }
                                className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600"
                            >
                                Approve
                            </button>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default AdminPendingEventsPage;