import { Routes, Route, Navigate } from 'react-router-dom';
import Widget from '@/app/dashboard/Widget';
import AdminLayout from '@/components/Admin/DefaultLayout';
import { Report } from "@/components/Report/Report";
import Sidebar from "@/components/Admin/Sidebar";
import Header from "@/components/Admin/Header";
import Login from '@/app/Auth/login';

export default function AppRoutes() {
    return (
        <>
        {/* <Header />
        <Sidebar /> */}
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="admin/reports" element={<Report />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Widget />} />
            </Route>
        </Routes>
        </>
    );
}
