import { Link } from "react-router-dom";
function EventCard({ event }) {

    return (

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">

            {/* Banner */}
            <img
                src={
                    event.banner_url
                        ? event.banner_url
                        : "https://picsum.photos/400/200"
                }
                alt=""
                className="w-full h-52 object-cover"
            />

            {/* Content */}
            <div className="p-5">

                <h2 className="text-2xl font-bold">
                    {event.title}
                </h2>

                <p className="text-gray-600 mt-2">
                    {event.description}
                </p>

                <div className="mt-4 space-y-2">

                    <p>
                        📍 {event.city}
                    </p>

                    <p>
                        🏷️ {event.category}
                    </p>

                    <p>
                        👥 Capacity: {event.max_capacity}
                    </p>

                </div>

                <Link to={`/events/${event.id}`}>
                    <button
                        className="mt-5 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
                    >
                        View Details
                    </button>
                </Link>



            </div>

        </div>
    );
}

export default EventCard;