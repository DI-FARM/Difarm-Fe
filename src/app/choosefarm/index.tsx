import React, { useEffect, useState } from 'react';
import { useFarms } from '@/hooks/api/farms';
import { CheckIcon } from '@mantine/core';
import { MapPinIcon } from '@heroicons/react/24/outline';
import IconRouter from '@/components/Icon/IconRouter';
import IconUser from '@/components/Icon/IconUser';
import IconSolana from '@/components/Icon/IconSolana';

function ChooseFarm() {
  const { farms, loading, error, fetchFarms }: any = useFarms();
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  useEffect(() => {
    fetchFarms();
  }, []);

  const handleSelectFarm = (farmId: string) => {
    setSelectedFarmId(farmId);
    localStorage.setItem('FarmId', farmId);
    console.log(`Selected Farm ID: ${farmId}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold text-primary mb-8">Please choose a Farm:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-center">
        {farms?.data?.map((farm: any) => (
          <div
            key={farm.id}
            onClick={() => handleSelectFarm(farm.id)}
            className={`relative border-4 rounded-xl p-8 w- cursor-pointer shadow-lg
              ${selectedFarmId === farm.id ? 'border-primary bg-primary-light' : 'border-gray-300 bg-white'} 
              hover:shadow-2xl transition-transform transform hover:-translate-y-2 w-80 mb-6 sm:mb-0`}
          >
            <h3 className="text-xl font-bold mb-4 text-center">{farm.name}</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-700 flex items-center"><MapPinIcon className="w-5 h-5 mr-2" /> <strong>Location:</strong> {farm.location}</p>
              <p className="text-sm text-gray-700 flex items-center"><IconRouter className="w-5 h-5 mr-2" /> <strong>Size:</strong> {farm.size} sqm</p>
              <p className="text-sm text-gray-700 flex items-center"><IconSolana className="w-5 h-5 mr-2" /> <strong>Type:</strong> {farm.type}</p>
              <p className="text-sm text-gray-700 flex items-center"><IconUser className="w-5 h-5 mr-2" /> <strong>Owner:</strong> {farm.owner.fullname}</p>
            </div>
            {selectedFarmId === farm.id && (
              <>
                <CheckIcon className="w-10 h-10 text-white bg-primary rounded-full absolute top-4 right-4 p-2 shadow-lg" />
                <button
                  className="btn btn-primary absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  onClick={() => window.location.href = '/account'}
                >
                  Login
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseFarm;
