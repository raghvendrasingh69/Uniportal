import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import EventDetailsPage from "../pages/EventDetailsPage";
import MyRegistrationsPage from "../pages/MyRegistrationsPage";
import TicketPage from "../pages/TicketPage";
import NotificationsPage from "../pages/NotificationsPage";
import CreateEventPage from "../pages/CreateEventPage";
import AdminPendingEventsPage from "../pages/AdminPendingEventsPage";
import DashboardPage from "../pages/DashboardPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import MyBookmarksPage from "../pages/MyBookmarksPage";

function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route path="/events/:id" element={<EventDetailsPage />} />
                <Route
                    path="/my-registrations"
                    element={<MyRegistrationsPage />}
                />

                <Route
                    path="/ticket/:id"
                    element={<TicketPage />}
                />

                <Route
                    path="/notifications"
                    element={<NotificationsPage />}
                />

                <Route
                    path="/create-event"
                    element={<CreateEventPage />}
                />

                <Route
                    path="/admin/pending-events"
                    element={<AdminPendingEventsPage />}
                />

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboardPage />}
                />

                <Route
                    path="/my-bookmarks"
                    element={<MyBookmarksPage />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;