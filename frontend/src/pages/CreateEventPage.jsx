import { useState } from "react";

import Navbar from "../components/Navbar";

import api from "../api/axios";

function CreateEventPage() {

    const [formData, setFormData] = useState({

        title: "",
        description: "",
        location: "",
        city: "",
        category: "",
        start_date: "",
        end_date: "",
        price: "",
        max_capacity: ""
    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/events",
                formData
            );

            alert(response.data.message);

        } catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Event creation failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-3xl mx-auto mt-10 bg-white p-10 rounded-3xl shadow-2xl">

                <h1 className="text-5xl font-bold mb-10 text-center">
                    Create Event 🚀
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Event Title"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                    />

                    <input
                        type="date"
                        name="start_date"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                    />

                    <input
                        type="date"
                        name="end_date"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                    />

                    <input
                        type="number"
                        name="max_capacity"
                        placeholder="Max Capacity"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Ticket Price"
                        onChange={handleChange}
                        className="w-full border p-4 rounded-xl"
                    />

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition text-xl"
                    >
                        Create Event
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateEventPage;