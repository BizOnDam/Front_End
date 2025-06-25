import { useState, useEffect } from 'react';
import { fetchContracts } from '../../api/contractApi';

export const useContracts = (user, role) => {
  const [contracts, setContracts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.companyId) return;

    (async () => {
      try {
        const result = await fetchContracts({
          companyId: user.companyId,
          role,
          userId: user.userId,
          userRole: user.roleInCompany,
          date: null, // 선택 날짜 필터링은 이후에 확장
        });
        setContracts(result);
      } catch (err) {
        setError(err.message || '계약 데이터를 불러오지 못했습니다.');
      }
    })();
  }, [user, role]);
  console.log(contracts);
  return { contracts, error };
};
