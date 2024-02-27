import { Routes, Route, Navigate } from 'react-router-dom';
import Widget from '@/app/dashboard/Widget';
import AdminLayout from '@/components/Admin/DefaultLayout';
import Login from '@/app/Auth/login';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Widget />} />
            </Route>
        </Routes>
    );
}
