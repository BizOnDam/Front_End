import { useState, useEffect } from 'react';
import axios from 'axios';
import { ESTIMATE_STATUS } from '../../constants/estimateStatus';

// 1) API 데이터 호출 훅
export function useEstimateData(companyId, role) {
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!companyId || !role) {
      console.log('▶ companyId 또는 role이 없음:', { companyId, role });
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const url = role === 'BUYER'
          ? 'http://localhost:8083/api/contracts/for-buyer'
          : 'http://localhost:8083/api/contracts/for-supplier';
        
        console.log('▶ API 호출:', { url, companyId, role });
        const response = await axios.get(url, { params: { companyId } });
        const flat = response.data.data || [];
        
        // flat → nested 구조로 변환
        const nested = flat.map(e => {
          // SUPPLIER이고 responseStatus가 null인 경우 1로 설정
          const isSupplierReceived = role === 'SUPPLIER' && e.responseStatus === null;

          return {
            request: {
              request_id: e.requestId,
              status: role === 'BUYER' ? e.requestStatus : (isSupplierReceived ? 1 : e.responseStatus),
              created_at: e.requestCreatedAt,
              due_date: e.dueDate,
              detail: e.detail,
              buyer_company_id: e.buyerCompanyId,
              supplier_company_id: e.supplierCompanyId,
              company_name: role === 'BUYER' ? e.supplierCompanyName : e.buyerCompanyName
            },
            response: e.responseId != null
              ? {
                  response_id: e.responseId,
                  status: e.responseStatus,
                  total_price: e.totalPrice,
                  created_at: e.responseCreatedAt,
                }
              : null,
            items: Array.isArray(e.items)
              ? e.items.map(item => ({
                  detail_category_name: item.detailCategoryName,
                  product_id: item.productId,
                  quantity: item.quantity,
                }))
              : []
          };
        });

        console.log('▶ 변환된 nested:', nested);
        setEstimates(nested);
        setError(null);
      } catch (err) {
        console.error('▶ 조회 에러:', err.response?.data || err);
        setError(err.response?.data?.message || '견적 리스트 조회 실패');
      } finally {
        setLoading(false);
      }
    })();
  }, [companyId, role]);

  return { estimates, loading, error };
}

// 2) 상태별 리스트 필터링
export function filterEstimates(estimates, statuses) {
  return estimates.filter(est => statuses.includes(est.request.status));
}

// 3) 상태 정보 매핑
export function getStatusInfo(status) {
  return ESTIMATE_STATUS[status] || { label: '-', badgeColor: 'secondary', button: false };
}
