import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import api from "../api/axios";

import { AuthContext } from "../context/AuthContext";

function LoginPage() {

    const navigate = useNavigate();

    // Updated Auth Context
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({

        email: "",

        password: "",
    });

    /*
    |--------------------------------------------------------------------------
    | HANDLE INPUT CHANGE
    |--------------------------------------------------------------------------
    */
    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        });
    };

    /*
    |--------------------------------------------------------------------------
    | HANDLE LOGIN
    |--------------------------------------------------------------------------
    */
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(

                "/login",

                formData
            );

            // Save token + user
            login(

                response.data.token,

                response.data.user
            );

            alert("Login successful 🚀");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Login failed"
            );
        }
    };

    return (

        <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black">

            <Navbar />

            <div className="flex items-center justify-center px-5 py-20">

                <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10">

                    {/* Heading */}
                    <div className="text-center mb-10">

                        <h2 className="text-5xl font-bold">
                            Welcome Back 🚀
                        </h2>

                        <p className="text-gray-500 mt-4">
                            Login to continue exploring events
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Email */}
                        <div>

                            <label className="block mb-2 font-semibold">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block mb-2 font-semibold">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition duration-300"
                        >
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default LoginPage;