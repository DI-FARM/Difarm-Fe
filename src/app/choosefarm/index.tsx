import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '@/hooks/api/auth';
import { api } from '@/hooks/api';
import { CheckIcon } from '@mantine/core';
import { MapPinIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';
import IconRouter from '@/components/Icon/IconRouter';
import IconUser from '@/components/Icon/IconUser';
import IconSolana from '@/components/Icon/IconSolana';
import { setFarmId } from '@/utils/farmId';
import Logo from '@/assets/logo.png';

type Farm = {
  id: string;
  name: string;
  location: string;
  size: string;
  type: string;
  status?: boolean;
  owner?: { fullname?: string };
};

function normalizeFarms(payload: unknown): Farm[] {
  if (!payload || typeof payload !== 'object') return [];
  const body = payload as { data?: unknown };
  const list = body.data;
  return Array.isArray(list) ? (list as Farm[]) : [];
}

function ChooseFarm() {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const accountId = user?.id;

  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFarmId, setSelectedFarmId] = useState<string | null>(null);

  useEffect(() => {
    if (!accountId) {
      navigate('/login', { replace: true });
      return;
    }

    let cancelled = false;

    const loadFarms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/farms');
        if (cancelled) return;
        const all = normalizeFarms(response.data);
        const active = all.filter((f) => f.status !== false);
        setFarms(active);
      } catch (err: unknown) {
        if (cancelled) return;
        const message =
          (err as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || 'Could not load farms. Please try again.';
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadFarms();
    return () => {
      cancelled = true;
    };
  }, [accountId, navigate]);

  const handleSelectFarm = (farmId: string) => {
    setSelectedFarmId(farmId);
    setFarmId(farmId);
  };

  const handleContinue = () => {
    if (!selectedFarmId) return;
    navigate('/account');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0faf9] to-white dark:from-black dark:to-[#0a0f0f] font-outfit">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <img src={Logo} alt="DI-FARM" className="w-28 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-primary">Choose your farm</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Select a farm to manage. You can switch farms later from the Farms page.
          </p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 dark:text-gray-400">Loading farms…</p>
          </div>
        )}

        {!loading && error && (
          <div className="max-w-md mx-auto text-center p-6 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300">
            <p>{error}</p>
            <button
              type="button"
              className="btn btn-primary mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && farms.length === 0 && (
          <div className="max-w-md mx-auto text-center p-8 rounded-2xl bg-white dark:bg-[#111] shadow-lg border border-gray-100 dark:border-gray-800">
            <BuildingOffice2Icon className="w-14 h-14 mx-auto text-primary mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">No active farms yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
              Create a farm or ask a super admin to activate your farm, then return here.
            </p>
            {user?.role === 'SUPERADMIN' && (
              <button
                type="button"
                className="btn btn-primary mt-6"
                onClick={() => navigate('/account/farms')}
              >
                Go to Farms
              </button>
            )}
          </div>
        )}

        {!loading && !error && farms.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {farms.map((farm) => {
                const selected = selectedFarmId === farm.id;
                return (
                  <article
                    key={farm.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectFarm(farm.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectFarm(farm.id);
                      }
                    }}
                    className={`relative flex flex-col rounded-2xl border-2 bg-white dark:bg-[#111] p-6 shadow-md transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary
                      ${selected
                        ? 'border-primary ring-2 ring-primary/30 scale-[1.02] shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-lg'
                      }`}
                  >
                    {selected && (
                      <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow">
                        <CheckIcon className="w-5 h-5" />
                      </span>
                    )}

                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BuildingOffice2Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-10">
                      {farm.name}
                    </h3>

                    <ul className="mt-4 flex-1 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-start gap-2">
                        <MapPinIcon className="w-5 h-5 shrink-0 text-primary" />
                        <span>
                          <span className="font-medium text-gray-800 dark:text-gray-300">Location: </span>
                          {farm.location || '—'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <IconRouter className="w-5 h-5 shrink-0 text-primary" />
                        <span>
                          <span className="font-medium text-gray-800 dark:text-gray-300">Size: </span>
                          {farm.size ? `${farm.size} sqm` : '—'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <IconSolana className="w-5 h-5 shrink-0 text-primary" />
                        <span>
                          <span className="font-medium text-gray-800 dark:text-gray-300">Type: </span>
                          {farm.type || '—'}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <IconUser className="w-5 h-5 shrink-0 text-primary" />
                        <span>
                          <span className="font-medium text-gray-800 dark:text-gray-300">Owner: </span>
                          {farm.owner?.fullname || '—'}
                        </span>
                      </li>
                    </ul>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                disabled={!selectedFarmId}
                className="btn btn-primary px-10 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleContinue}
              >
                Continue to dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChooseFarm;
