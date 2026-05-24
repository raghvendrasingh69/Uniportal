import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../api/axios";

function RegisterPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
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

            await api.post(
                "/register",
                formData
            );

            alert("Registration successful 🚀");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Registration failed");
        }
    };

    return (

        <div>

            <Navbar />

            <div className="flex items-center justify-center mt-20">

                <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

                    <h2 className="text-3xl font-bold mb-6">
                        Register
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                        <select
                            name="role"
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >
                            <option value="">
                                Select Role
                            </option>

                            <option value="end_user">
                                End User
                            </option>

                            <option value="proposer">
                                Proposer
                            </option>
                        </select>

                        <button
                            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
                        >
                            Register
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default RegisterPage;