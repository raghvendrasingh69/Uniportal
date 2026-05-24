import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../api/axios";

function AdminDashboardPage() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await api.get(
                "/admin/dashboard"
            );

            setStats(
                response.data.dashboard
            );

        } catch (error) {

            console.log(error);
        }
    };

    if (!stats) {

        return (

            <div className="text-center mt-20 text-4xl font-bold">
                Loading Admin Dashboard...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-10">

                {/* Heading */}
                <div className="mb-10">

                    <h1 className="text-5xl font-bold">
                        Admin Dashboard 🚀
                    </h1>

                    <p className="text-gray-600 mt-3 text-lg">
                        Manage users, events and platform analytics
                    </p>

                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Users */}
                    <div className="bg-black text-white p-8 rounded-3xl shadow-2xl">

                        <h2 className="text-2xl font-bold">
                            Total Users
                        </h2>

                        <p className="text-6xl mt-5">
                            {stats.total_users}
                        </p>

                    </div>

                    {/* Events */}
                    <div className="bg-blue-500 text-white p-8 rounded-3xl shadow-2xl">

                        <h2 className="text-2xl font-bold">
                            Total Events
                        </h2>

                        <p className="text-6xl mt-5">
                            {stats.total_events}
                        </p>

                    </div>

                    {/* Approved */}
                    <div className="bg-green-500 text-white p-8 rounded-3xl shadow-2xl">

                        <h2 className="text-2xl font-bold">
                            Approved Events
                        </h2>

                        <p className="text-6xl mt-5">
                            {stats.approved_events}
                        </p>

                    </div>

                    {/* Pending */}
                    <div className="bg-yellow-400 p-8 rounded-3xl shadow-2xl">

                        <h2 className="text-2xl font-bold">
                            Pending Events
                        </h2>

                        <p className="text-6xl mt-5">
                            {stats.pending_events}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboardPage;