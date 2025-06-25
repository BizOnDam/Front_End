// src/hooks/dashboard/useDashboardStats.js
import { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../../api/contractApi';

export const useDashboardStats = (companyId) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) return;

    const fetchData = async () => {
      try {
        const data = await fetchDashboardStats(companyId);
        setStats(data);
      } catch (err) {
        console.error('전체 거래 현황 API 오류:', err);
        setError('전체 거래 현황 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  return { stats, loading, error };
};
