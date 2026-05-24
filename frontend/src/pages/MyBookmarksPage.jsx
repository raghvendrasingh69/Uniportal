import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import EventCard from "../components/EventCard";

import api from "../api/axios";

function MyBookmarksPage() {

    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {

        fetchBookmarks();

    }, []);

    const fetchBookmarks = async () => {

        try {

            const response = await api.get(
                "/my-bookmarks"
            );

            setBookmarks(
                response.data.bookmarks
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="p-10">

                <h1 className="text-5xl font-bold mb-10">
                    My Bookmarks 🔖
                </h1>

                {bookmarks.length === 0 ? (

                    <div className="text-2xl text-gray-500">
                        No bookmarked events yet.
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {bookmarks.map((bookmark) => (

                            <EventCard
                                key={bookmark.id}
                                event={bookmark.event}
                            />

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default MyBookmarksPage;