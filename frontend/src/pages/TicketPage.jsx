import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import api from "../api/axios";

function TicketPage() {

    const { id } = useParams();

    const [ticket, setTicket] = useState(null);

    useEffect(() => {

        fetchTicket();

    }, []);

    const fetchTicket = async () => {

        try {

            const response = await api.get(
                `/ticket/${id}`
            );

            setTicket(response.data.ticket);

        } catch (error) {

            console.log(error);
        }
    };

    if (!ticket) {

        return (

            <div className="text-center mt-20 text-3xl font-bold">
                Loading Ticket...
            </div>
        );
    }

    return (

        <div>

            <Navbar />

            <div className="max-w-3xl mx-auto p-10">

                <div className="bg-white shadow-2xl rounded-3xl p-10">

                    <h1 className="text-4xl font-bold mb-8">
                        Event Ticket 🎟️
                    </h1>

                    <h2 className="text-2xl font-bold">
                        {ticket.event.title}
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Ticket Code
                    </p>

                    <p className="text-3xl font-bold">
                        {ticket.ticket_code}
                    </p>

                    <img
                        src={`http://127.0.0.1:8000/storage/${ticket.qr_code}`}
                        alt=""
                        className="w-64 mt-10"
                    />

                </div>

            </div>

        </div>
    );
}

export default TicketPage;