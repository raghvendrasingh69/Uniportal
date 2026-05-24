import { Link } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { token, user, logout } =
        useContext(AuthContext);

    return (

        <nav className="bg-linear-to-br from-black to-gray-900 text-white px-10 py-5 shadow-2xl">

            <div className="flex justify-between items-center">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-3xl font-bold text-yellow-400"
                >
                    Event Platform 🚀
                </Link>

                {/* Links */}
                <div className="flex items-center gap-6 text-lg">

                    <Link
                        to="/"
                        className="hover:text-yellow-400 transition"
                    >
                        Home
                    </Link>

                    {/* ADMIN */}
                    {user?.role === "admin" && (

                        <>

                            <Link
                                to="/admin/dashboard"
                                className="hover:text-yellow-400 transition"
                            >
                                Admin Dashboard
                            </Link>

                            <Link
                                to="/admin/pending-events"
                                className="hover:text-yellow-400 transition"
                            >
                                Pending Events
                            </Link>

                        </>
                    )}

                    {/* PROPOSER */}
                    {user?.role === "proposer" && (

                        <>

                            <Link
                                to="/create-event"
                                className="hover:text-yellow-400 transition"
                            >
                                Create Event
                            </Link>

                            <Link
                                to="/dashboard"
                                className="hover:text-yellow-400 transition"
                            >
                                Dashboard
                            </Link>

                        </>
                    )}

                    {/* END USER */}
                    {user?.role === "end_user" && (

                        <>

                            <Link
                                to="/my-registrations"
                                className="hover:text-yellow-400 transition"
                            >
                                My Tickets
                            </Link>

                            <Link
                                to="/notifications"
                                className="hover:text-yellow-400 transition"
                            >
                                Notifications
                            </Link>

                            <Link
                                to="/my-bookmarks"
                                className="hover:text-yellow-400 transition"
                            >
                                My Bookmarks
                            </Link>

                        </>
                    )}

                    {/* AUTH */}
                    {token ? (

                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition"
                        >
                            Logout
                        </button>

                    ) : (

                        <>

                            <Link
                                to="/login"
                                className="hover:text-yellow-400"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-semibold hover:bg-yellow-300 transition"
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;