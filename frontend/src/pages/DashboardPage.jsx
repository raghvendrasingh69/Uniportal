import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import api from "../api/axios";

function DashboardPage() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const response = await api.get(
                "/proposer/dashboard"
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

            <div className="text-center mt-20 text-3xl font-bold">
                Loading Dashboard...
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-10">

                <h1 className="text-5xl font-bold mb-10">
                    Proposer Dashboard 🚀
                </h1>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Total Events */}
                    <div className="bg-black text-white p-10 rounded-3xl shadow-2xl">

                        <h2 className="text-2xl font-bold">
                            Total Events
                        </h2>

                        <p className="text-6xl mt-5">
                            {stats.total_events}
                        </p>

                    </div>

                    {/* Approved */}
                    <div className="bg-green-500 text-white p-10 rounded-3xl shadow-2xl">

                        <h2 className="text-2xl font-bold">
                            Approved Events
                        </h2>

                        <p className="text-6xl mt-5">
                            {stats.approved_events}
                        </p>

                    </div>

                    {/* Pending */}
                    <div className="bg-yellow-400 p-10 rounded-3xl shadow-2xl">

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

export default DashboardPage;