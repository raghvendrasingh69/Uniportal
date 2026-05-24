import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import api from "../api/axios";

function MyRegistrationsPage() {

    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {

        fetchRegistrations();

    }, []);

    const fetchRegistrations = async () => {

        try {

            const response = await api.get(
                "/my-registrations"
            );

            setRegistrations(
                response.data.registrations
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
                    My Registrations
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {registrations.map((registration) => (

                        <div
                            key={registration.id}
                            className="bg-white shadow-lg rounded-2xl p-6"
                        >

                            <h2 className="text-2xl font-bold">
                                {registration.event.title}
                            </h2>

                            <p className="mt-3 text-gray-600">
                                Ticket Code
                            </p>

                            <p className="font-bold text-lg">
                                {registration.ticket_code}
                            </p>

                            <img
                                src={registration.qr_url}
                                alt=""
                                className="w-48 mt-5"
                            />

                            <Link
                                to={`/ticket/${registration.id}`}
                                className="block mt-5 bg-black text-white text-center py-3 rounded-xl"
                            >
                                View Ticket
                            </Link>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}

export default MyRegistrationsPage;