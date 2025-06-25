import { useState, useEffect } from 'react';
import { getEstimateDetail } from '../../api/estimateApi';

export function useEstimateDetail(requestId, responseId) {
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!requestId) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getEstimateDetail(requestId, responseId);
        setEstimate(data);
      } catch (err) {
        setError(err.message || '불러오기 실패');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [requestId, responseId]);

  return { estimate, loading, error };
}
