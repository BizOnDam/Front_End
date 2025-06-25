import { useState, useEffect } from 'react';
import { getContractSummaries } from '../../api/contractApi';

export const useContractHistory = (companyId) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId) return;

    const fetchData = async () => {
      try {
        const data = await getContractSummaries(companyId);
        setContracts(data);
      } catch (err) {
        setError(err.message || '데이터 로드 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  return { contracts, loading, error };
};
