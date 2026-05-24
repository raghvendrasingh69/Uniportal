import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import api from "../api/axios";

function EventDetailsPage() {

    const { id } = useParams();

    const [event, setEvent] = useState(null);

    const [loading, setLoading] = useState(true);

    /*
    |----------------------------------------------------------------------
    | FETCH EVENT
    |----------------------------------------------------------------------
    */
    useEffect(() => {

        fetchEvent();

    }, []);

    const fetchEvent = async () => {

        try {

            const response = await api.get(
                `/events/${id}`
            );

            setEvent(response.data.event);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    /*
    |----------------------------------------------------------------------
    | FREE EVENT REGISTRATION
    |----------------------------------------------------------------------
    */
    const registerForEvent = async () => {

        try {

            const response = await api.post(
                `/events/register/${id}`
            );

            alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    /*
    |----------------------------------------------------------------------
    | MOCK PAYMENT
    |----------------------------------------------------------------------
    */
    const payNow = async () => {

        try {

            const response = await api.post(
                `/mock-payment/${id}`
            );

            alert(
                response.data.message
            );

            console.log(response.data);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Payment failed"
            );
        }
    };

    /*
    |----------------------------------------------------------------------
    | BOOKMARK EVENT
    |----------------------------------------------------------------------
    */
    const bookmarkEvent = async () => {

        try {

            const response = await api.post(
                `/events/bookmark/${id}`
            );

            alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Bookmark failed"
            );
        }
    };

    /*
    |----------------------------------------------------------------------
    | LOADING
    |----------------------------------------------------------------------
    */
    if (loading) {

        return (

            <div className="text-center mt-20 text-4xl font-bold">
                Loading Event...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            {/* Banner */}
            <div className="relative">

                <img
                    src={
                        event.banner_url
                            ? event.banner_url
                            : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                    }
                    alt=""
                    className="w-full h-[450px] object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">

                    <h1 className="text-white text-6xl font-bold text-center px-5">
                        {event.title}
                    </h1>

                </div>

            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto p-10">

                {/* Description */}
                <div className="bg-white rounded-3xl shadow-xl p-10">

                    <h2 className="text-3xl font-bold mb-6">
                        About Event
                    </h2>

                    <p className="text-gray-700 text-lg leading-relaxed">
                        {event.description}
                    </p>

                </div>

                {/* Event Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">
                            📍 Location
                        </h3>

                        <p>{event.location}</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">
                            🏙️ City
                        </h3>

                        <p>{event.city}</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">
                            🏷️ Category
                        </h3>

                        <p>{event.category}</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">
                            👥 Capacity
                        </h3>

                        <p>{event.max_capacity}</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">
                            📅 Start Date
                        </h3>

                        <p>{event.start_date}</p>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="font-bold text-xl mb-2">
                            💰 Ticket Price
                        </h3>

                        <p className="text-2xl font-bold text-green-600">
                            ₹{event.price}
                        </p>
                    </div>

                </div>

                {/* Buttons */}
                <div className="mt-12 flex flex-wrap gap-5">

                    {/* Free Event */}
                    {event.price == 0 ? (

                        <button
                            onClick={registerForEvent}
                            className="bg-black text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 transition"
                        >
                            Register Free 🚀
                        </button>

                    ) : (

                        <button
                            onClick={payNow}
                            className="bg-green-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-green-600 transition"
                        >
                            Pay ₹{event.price}
                        </button>

                    )}

                    {/* Bookmark */}
                    <button
                        onClick={bookmarkEvent}
                        className="bg-yellow-400 px-10 py-4 rounded-2xl text-lg font-semibold hover:bg-yellow-300 transition"
                    >
                        Bookmark 🔖
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EventDetailsPage;