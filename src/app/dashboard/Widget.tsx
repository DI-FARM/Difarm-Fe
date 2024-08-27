import IconAirplay from '@/components/Icon/IconAirplay';
import IconChatNotification from '@/components/Icon/IconChatNotification';
import { IRootState, useAppSelector } from '@/store';
import ReactApexChart from 'react-apexcharts';
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import IconTrash from '@/components/Icon/IconTrash';


export default function Widget() {
    return (
        <>
            <div className="grid sm:grid-cols-4 md:grid-cols-3 gap-2 grid-cols-2">
                <Card
                    icon={<IconChatNotification />}
                    title="Total Cows"
                    value="100"
                    percentage="+20%"
                />
                <Card
                    icon={<IconAirplay />}
                    title="Total Bulls"
                    value="700"
                    percentage="-10%"
                />
                <Card
                    icon={<IconAirplay />}
                    title="Total Bulls"
                    value="700"
                    percentage="-10%"
                />
                <Card
                    icon={<IconAirplay />}
                    title="Total Bulls"
                    value="700"
                    percentage="-10%"
                />
            </div>
            <div className='panel'>
              <div>
                <p className='text-lg font-bold  '>Cattle status</p>
              </div>
                <Chart />
            </div>
            <div className='panel mt-3 '>
            <div>
                <p className='text-lg font-bold  '>Latest Cattle</p>
              </div>
              <Table/>
            </div>
        </>
    );
}

function Card({ icon, title, value, percentage }: any) {
    return (
        <div className="relative flex flex-col items-center justify-center min-w-0 mb-6 break-words bg-green-200 shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
                <div className="flex flex-wrap -mx-3">
                    <div className="flex-none w-2/3 max-w-full px-3">
                        <div>
                            <p className="mb-0 font-sans font-semibold leading-normal text-sm">
                                {title}
                            </p>
                            <h5 className="mb-0 font-bold">
                                {value}
                                <span className="leading-normal text-sm font-weight-bolder text-lime-500">
                                    {percentage}
                                </span>
                            </h5>
                        </div>
                    </div>
                    <div className="w-4/12 max-w-full px-3 ml-auto text-right flex-0">
                        <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-green-700 to-green-500 shadow-soft-2xl flex items-center justify-center">
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Chart() {
    const isDark = useAppSelector(
        (state: IRootState) =>
            state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode
    );
    const isRtl = useAppSelector(
        (state: IRootState) => state.themeConfig.rtlClass === 'rtl'
    );
    const columnChart4: any = {
      series: [
          {
              name: 'Cows',
              data: [23, 55, 70, 88, 400, 60, 50, 90, 120, 150, 200, 300],
          },
          {
              name: 'Bulls',
              data: [23, 55, 70, 88, 223, 57, 89, 110, 130, 170, 180, 250],
          },
      ],
  
      options: {
          chart: {
              height: 300,
              type: 'bar',
              zoom: {
                  enabled: false,
              },
              toolbar: {
                  show: false,
              },
          },
          colors: ['#66CC66', '#128A33'],
          dataLabels: {
              enabled: false,
          },
          stroke: {
              show: true,
              width: 2,
              colors: ['transparent'],
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  endingShape: 'rounded',
              },
          },
          grid: {
              borderColor: isDark ? '#191e3a' : '#e0e6ed',
          },
          xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              axisBorder: {
                  color: isDark ? '#191e3a' : '#e0e6ed',
              },
          },
          yaxis: {
              opposite: isRtl ? true : false,
              labels: {
                  offsetX: isRtl ? -10 : 0,
              },
          },
          tooltip: {
              theme: isDark ? 'dark' : 'light',
              y: {
                  formatter: function (val: any) {
                      return val;
                  },
              },
          },
      },
  };
  
    return (
        <div>
            <ReactApexChart
                series={columnChart4.series}
                options={columnChart4.options}
                className="rounded-lg bg-white dark:bg-black overflow-hidden"
                type="bar"
                height={300}
            />
        </div>
    );
}




function Table() {
  const tableData = [
      {
          id: 1,
          name: 'Bessie',
          breed: 'Holstein',
          age: 5,
          milkProduction: '30 liters/day',
          status: 'Active',
          location: 'Barn 1',
      },
      {
          id: 2,
          name: 'Moo-ry',
          breed: 'Jersey',
          age: 3,
          milkProduction: '25 liters/day',
          status: 'Inactive',
          location: 'Barn 2',
      },
      {
          id: 3,
          name: 'Daisy',
          breed: 'Guernsey',
          age: 4,
          milkProduction: '28 liters/day',
          status: 'Active',
          location: 'Barn 1',
      },
      {
          id: 4,
          name: 'Spot',
          breed: 'Ayrshire',
          age: 6,
          milkProduction: '32 liters/day',
          status: 'Active',
          location: 'Barn 2',
      },
  ];

  return (
    <div className="table-responsive mb-5">
      <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Breed</th>
                  <th>Age</th>
                  <th>Milk Production</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th className="text-center">Action</th>
              </tr>
          </thead>
          <tbody>
              {tableData.map((data) => {
                  return (
                      <tr key={data.id}>
                          <td>
                              <div className="whitespace-nowrap">{data.name}</div>
                          </td>
                          <td>{data.breed}</td>
                          <td>{data.age}</td>
                          <td>{data.milkProduction}</td>
                          <td>
                              <div
                                  className={`whitespace-nowrap ${
                                      data.status === 'Active'
                                          ? 'text-success'
                                          : 'text-danger'
                                  }`}
                              >
                                  {data.status}
                              </div>
                          </td>
                          <td>{data.location}</td>
                          <td className="text-center">
                              <Tippy content="View Details">
                                  <button type="button">
                                      <IconTrash/>
                                  </button>
                              </Tippy>
                          </td>
                      </tr>
                  );
              })}
          </tbody>
      </table>
    </div>
  );
}
