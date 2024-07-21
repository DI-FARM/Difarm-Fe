import { Routes, Route, Navigate } from 'react-router-dom';
import Widget from '@/app/dashboard/Widget';
import AdminLayout from '@/components/Admin/DefaultLayout';
import { Report } from "@/components/Report/Report";
import Sidebar from "@/components/Admin/Sidebar";
import Header from "@/components/Admin/Header";
import Login from '@/app/Auth/login';
import ProfilePage from '@/app/profile';
import FarmsList from '@/app/dashboard/farms';
import CattleList from '@/app/dashboard/cattles';
import Users from '@/app/dashboard/users';
import Production from '@/app/dashboard/production';
import StockManagement from '@/app/dashboard/stock';
import StockTransactionManagement from '@/app/dashboard/stock_transaction';

export default function AppRoutes() {
    return (
        <>
        {/* <Header />
        <Sidebar /> */}
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="admin/reports" element={<Report />} />
            <Route path="login" element={<Login />} />
            <Route path="account" element={<AdminLayout />}>

                <Route index element={<Widget />} />
                <Route path='profile' element={<ProfilePage />} />
                <Route path='farms' element={<FarmsList />} />
                <Route path='users' element={<Users />} />
                <Route path='production' element={<Production />} />
                <Route path='stock' element={<StockManagement />} />
                <Route path='stock_transactions' element={<StockTransactionManagement />} />
                <Route path='cattle' element={<CattleList />} />
            </Route>
        </Routes>
        </>
    );
}
