import { useGeneralStatistics, useStatisticsByFarmId } from '@/hooks/api/statistics';
import React, { useEffect } from 'react';
import { FaChartLine, FaWarehouse, FaSyringe, FaProcedures, FaCrow } from 'react-icons/fa';

const StatisticsDashboard = () => {
  const farmId:any = localStorage.getItem('FarmId');
  const { fetchStatisticsByFarmId, statistics: statisticsData, loading } :any= useStatisticsByFarmId(farmId);

  useEffect(() => {
    fetchStatisticsByFarmId();
  }, []);

  if (loading) return <div className="text-center text-lg dark:text-white">Loading...</div>;

  if (!statisticsData) return <div className="text-center text-lg dark:text-white">No data available</div>;

  const { cattle, production, stock, insemination, vaccination } = statisticsData.data;

  const SectionCard = ({ icon, title, color, children }:any) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 p-4 border-${color}-500 dark:border-${color}-400`}>
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold ml-2 dark:text-white">{title}</h3>
      </div>
      <div className="grid gap-2">{children}</div>
    </div>
  );

  const StatisticCard = ({ label, value, percentage }:any) => (
    <div className={`p-3 shadow-sm flex justify-between items-center rounded-md ${
      label === 'Total' || label === 'Total Quantity' 
        ? 'bg-blue-100 border border-blue-300 dark:bg-blue-900 dark:border-blue-700' 
        : 'bg-gray-100 dark:bg-gray-700'
    }`}>
      <p className={`text-sm font-medium ${label === 'Total' || label === 'Total Quantity' 
        ? 'text-blue-700 dark:text-blue-300' 
        : 'text-gray-600 dark:text-gray-300'}`}>
        {label}
      </p>
      <div className="text-right">
        <p className={`text-md font-semibold ${label === 'Total' || label === 'Total Quantity' 
          ? 'text-blue-700 dark:text-blue-300' 
          : 'dark:text-white'}`}>
          {value}
        </p>
        {percentage !== undefined && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{percentage.toFixed(2)}%</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 font-outfit">
      <SectionCard
        icon={<FaWarehouse className="text-blue-500 text-2xl dark:text-blue-300" />}
        title="Cattle Statistics"
        color="blue"
      >
        <StatisticCard label="Total" value={cattle.total} />
        <StatisticCard label="Healthy" value={cattle.healthy.count} percentage={cattle.healthy.percentage} />
        <StatisticCard label="Sick" value={cattle.sick.count} percentage={cattle.sick.percentage} />
        <StatisticCard label="Sold" value={cattle.sold.count} percentage={cattle.sold.percentage} />
        <StatisticCard label="Processed" value={cattle.processed.count} percentage={cattle.processed.percentage} />
      </SectionCard>

      <SectionCard
        icon={<FaChartLine className="text-green-500 text-2xl dark:text-green-300" />}
        title="Production Statistics"
        color="green"
      >
        <StatisticCard label="Total Quantity" value={production.totalQuantity} />
        {production.byProduct.map((product:any, index:any) => (
          <StatisticCard key={index} label={product.productName} value={product.quantity} percentage={product.percentage} />
        ))}
      </SectionCard>

      <SectionCard
        icon={<FaWarehouse className="text-yellow-500 text-2xl dark:text-yellow-300" />}
        title="Stock Statistics"
        color="yellow"
      >
        <StatisticCard label="Total Quantity" value={stock.totalQuantity} />
        {stock.byType.map((item:any, index:any) => (
          <StatisticCard key={index} label={item.type} value={item.quantity} percentage={item.percentage} />
        ))}
      </SectionCard>

      <SectionCard
        icon={<FaProcedures className="text-indigo-500 text-2xl dark:text-indigo-300" />}
        title="Insemination Statistics"
        color="indigo"
      >
        <StatisticCard label="Total" value={insemination.total} />
        {insemination.byType.map((type:any, index:any) => (
          <StatisticCard key={index} label={type.type} value={type.count} percentage={type.percentage} />
        ))}
      </SectionCard>

      <SectionCard
        icon={<FaSyringe className="text-red-500 text-2xl dark:text-red-300" />}
        title="Vaccination Statistics"
        color="red"
      >
        <StatisticCard label="Total" value={vaccination.total} />
        {vaccination.byVaccineType.map((vaccine:any, index:any) => (
          <StatisticCard key={index} label={vaccine.vaccineType} value={vaccine.count} percentage={vaccine.percentage} />
        ))}
      </SectionCard>
    </div>
  );
};

export default StatisticsDashboard;
