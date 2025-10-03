import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../app/auth/login';
import ChooseFarm from '@/app/choosefarm';
import CattleList from '@/app/dashboard/cattles';
import FarmsList from '@/app/dashboard/farms';
import InseminationRecords from '@/app/dashboard/insemination';
import Production from '@/app/dashboard/production';
import ProductionTotals from '@/app/dashboard/productionTotals';
import ProductionTransactions from '@/app/dashboard/productionTransactions';
import StockManagement from '@/app/dashboard/stock';
import StockTransactionManagement from '@/app/dashboard/stock_transaction';
import Users from '@/app/dashboard/users';
import VaccineRecords from '@/app/dashboard/vaccine';
import Veterinarians from '@/app/dashboard/veterians';
import WasteLogManagement from '@/app/dashboard/waste';
import Widget from '@/app/dashboard/Widget';
import ProfilePage from '@/app/profile';
import AdminLayout from '@/components/Admin/DefaultLayout';
import Home from "@/app/home";
import Health from "@/app/dashboard/health";
import Suppliers from "@/app/dashboard/suppliers";
import StockItems from "@/app/dashboard/items";
import AboutUs from "@/app/home/About";
import ServicesCard from "@/app/home/Service";
import MetricsPage from "@/app/dashboard/OverView/MetricsPage";
import Overview from "@/app/dashboard/OverView";


export default function AppRoutes() {
    return (
        <>
        {/* <Header />
        <Sidebar /> */}
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/home" />} />
            {/* <Route path="/about" element={<AboutUs />}/> */}
            {/* <Route path="/services" element={<ServicesCard />}/> */}
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="choose-farm" element={<ChooseFarm />} />
            <Route path="account/:year?" element={<AdminLayout />}>

                {/* <Route index element={<DashboardOverview />} /> */}
                <Route index element={<Overview />} />
                <Route path='profile' element={<ProfilePage />} />
                <Route path='farms' element={<FarmsList />} />
                <Route path='users' element={<Users />} />
                <Route path='production' element={<Production />} />
                <Route path='stock' element={<StockManagement />} />
                <Route path='waste-logs' element={<WasteLogManagement />} />
                <Route path='production_totals' element={<ProductionTotals />} />
                <Route path='production_transactions' element={<ProductionTransactions />} />
                <Route path='stock_transactions' element={<StockTransactionManagement />} />
                <Route path='cattle' element={<CattleList />} />
                <Route path='health' element={<Health />} />
            </Route>
            <Route path="stock/" element={<AdminLayout />}>

                <Route index element={<Widget />} />
                {/* <Route path='production' element={<Production />} /> */}
                <Route path='suppliers' element={<Suppliers />} />
                <Route path='items' element={<StockItems />} />
                {/* <Route path='waste-logs' element={<WasteLogManagement />} />
                <Route path='production_totals' element={<ProductionTotals />} />
                <Route path='production_transactions' element={<ProductionTransactions />} />
                <Route path='stock_transactions' element={<StockTransactionManagement />} />
                <Route path='cattle' element={<CattleList />} />
                <Route path='health' element={<Health />} /> */}
            </Route>
        </Routes>
        </>
    );
}
