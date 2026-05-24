import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import EventCard from "../components/EventCard";

import api from "../api/axios";

function HomePage() {

    /*
    |--------------------------------------------------------------------------
    | STATES
    |--------------------------------------------------------------------------
    */
    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [lastPage, setLastPage] = useState(1);

    /*
    |--------------------------------------------------------------------------
    | FETCH EVENTS
    |--------------------------------------------------------------------------
    */
    const fetchEvents = async () => {

        try {

            setLoading(true);

            let url = `/events?page=${currentPage}`;

            /*
            |--------------------------------------------------------------------------
            | SEARCH
            |--------------------------------------------------------------------------
            */
            if (search) {

                url += `&search=${search}`;
            }

            /*
            |--------------------------------------------------------------------------
            | CATEGORY FILTER
            |--------------------------------------------------------------------------
            */
            if (category) {

                url += `&category=${category}`;
            }

            const response = await api.get(url);

            setEvents(
                response.data.events.data
            );

            setLastPage(
                response.data.events.last_page
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | FETCH WHEN FILTERS CHANGE
    |--------------------------------------------------------------------------
    */
    useEffect(() => {

        fetchEvents();

    }, [currentPage, category]);

    /*
    |--------------------------------------------------------------------------
    | SEARCH BUTTON
    |--------------------------------------------------------------------------
    */
    const handleSearch = () => {

        setCurrentPage(1);

        fetchEvents();
    };

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */
    if (loading) {

        return (

            <div className="text-center mt-20 text-3xl font-bold">

                Loading events...

            </div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */
    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            {/* HERO */}
            <div className="bg-black text-white py-24 px-10 text-center">

                <h1 className="text-6xl font-bold">
                    Discover Amazing Events 🚀
                </h1>

                <p className="mt-6 text-xl text-gray-300">
                    Join conferences, concerts,
                    hackathons, expos and more.
                </p>

            </div>

            {/* CONTENT */}
            <div className="max-w-7xl mx-auto p-10">

                {/* SEARCH + FILTERS */}
                <div className="bg-white shadow-xl rounded-3xl p-6 flex flex-col lg:flex-row gap-5 mb-12">

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="flex-1 border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    {/* SEARCH BUTTON */}
                    <button
                        onClick={handleSearch}
                        className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition"
                    >
                        Search
                    </button>

                    {/* CATEGORY FILTER */}
                    <select
                        value={category}
                        onChange={(e) => {

                            setCategory(
                                e.target.value
                            );

                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
                    >

                        <option value="">
                            All Categories
                        </option>

                        <option value="Tech">
                            Tech
                        </option>

                        <option value="Music">
                            Music
                        </option>

                        <option value="AI">
                            AI
                        </option>

                        <option value="Gaming">
                            Gaming
                        </option>

                        <option value="Science">
                            Science
                        </option>

                        <option value="Startup">
                            Startup
                        </option>

                        <option value="Photography">
                            Photography
                        </option>

                    </select>

                </div>

                {/* HEADING */}
                <div className="flex items-center justify-between mb-10">

                    <h2 className="text-5xl font-bold">
                        Upcoming Events
                    </h2>

                    <span className="text-gray-500 text-lg">
                        {events.length} events found
                    </span>

                </div>

                {/* EVENTS GRID */}
                {events.length === 0 ? (

                    <div className="bg-white shadow-xl rounded-3xl p-16 text-center">

                        <h2 className="text-4xl font-bold mb-4">
                            No Events Found 😢
                        </h2>

                        <p className="text-gray-500 text-lg">
                            Try another search or category
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                        {events.map((event) => (

                            <EventCard
                                key={event.id}
                                event={event}
                            />

                        ))}

                    </div>

                )}

                {/* PAGINATION */}
                <div className="flex justify-center items-center gap-5 mt-16">

                    <button
                        disabled={currentPage === 1}
                        onClick={() =>
                            setCurrentPage(
                                currentPage - 1
                            )
                        }
                        className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <div className="text-2xl font-bold">

                        Page {currentPage}

                    </div>

                    <button
                        disabled={currentPage === lastPage}
                        onClick={() =>
                            setCurrentPage(
                                currentPage + 1
                            )
                        }
                        className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-40"
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>
    );
}

export default HomePage;