import { useEffect, useState } from 'react';
import { fetchMatchingData } from '../../api/matchingApi';
import { processMatchingData } from '../../utils/matchingUtils';
import { useAuth } from '../../contexts/AuthContext';

export const useMatchingData = (requestId) => {
  const { user } = useAuth();  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [matchingData, setMatchingData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        if (!user || !user.accessToken) {
          console.log('▶ 아직 user가 준비 안 됨. 대기 중...');
          return;
        }

        const raw = await fetchMatchingData(requestId, user.accessToken);
        if (!raw) throw new Error('데이터가 없습니다.');
        setMatchingData(processMatchingData(raw));
      } catch (err) {
        setError(err?.response?.data?.message || err.message || '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

  if (requestId && user) {
    load();
  } else if (!requestId) {
    setError('요청 ID가 없습니다.');
    setLoading(false);
  }
  }, [requestId, user]);

  return { matchingData, loading, error };
};
