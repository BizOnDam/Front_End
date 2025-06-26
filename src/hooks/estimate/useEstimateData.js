import { useState, useEffect } from 'react';
import { axiosInstance } from '../../api/axiosInstance';
import { mapFlatToNested } from '../../utils/estimateTransform';
import { useAuth }    from '../../contexts/AuthContext';
import { useService } from '../../contexts/ServiceContext';

// API 호출 훅
export function useEstimateData() {
  const { user } = useAuth();
  const { serviceType } = useService();
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.companyId || !serviceType || !user.userId) return;
    (async () => {
      try {
        setLoading(true);
        const path = serviceType === 'buyer'
          ? '/estimate-service/api/contracts/requestList-buyer'
          : '/estimate-service/api/contracts/requestList-supplier';
        const { data } = await axiosInstance.get(path, {
          params: { companyId: user.companyId },
          headers: {
            'X-User-Id': user.userId,
            'X-User-Role': user.roleInCompany,
          },
        });
        setEstimates(mapFlatToNested(data.data || [], serviceType));
      } catch (e) {
        setError(e.response?.data?.message || e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, serviceType]);

  console.log("견적 관리", estimates);
  return { estimates, loading, error };
}