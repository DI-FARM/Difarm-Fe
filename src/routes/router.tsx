import { Routes, Route } from 'react-router-dom';
import Login from '@/app/Auth/login';
import Widget from '@/app/dashboard/Widget';
import AdminLayout from '@/components/Admin/DefaultLayout';

export default function AppRoutes() {
    return (
        <Routes>
              <Route path="/" element={<AdminLayout />} />
            <Route path="login" element={<Login />} />
            <Route path="admin" element={<AdminLayout />}>
                <Route index element={<Widget />} />
            </Route>
        </Routes>
    );
}
