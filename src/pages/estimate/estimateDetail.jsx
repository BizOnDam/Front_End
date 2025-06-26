
import { useParams, useNavigate } from 'react-router-dom';
import { useEstimateDetail } from '../../hooks/estimate/useEstimateDetail';
import { rejectEstimate } from '../../api/estimateApi';
import { generateContract } from '../../api/contractApi';
import { useAuth }    from '../../contexts/AuthContext';
import { useService } from '../../contexts/ServiceContext';
import { ESTIMATE_STATUS } from '../../constants/estimateStatus';
import { findMatchingRequestItem } from '../../utils/estimateTransform';
import { formatDateToYYYYMMDD, formatCurrency } from '../../utils/dateUtils';
import 'bootstrap/dist/css/bootstrap.min.css';

const EstimateDetail = () => {
  const { user } = useAuth();
  const { serviceType } = useService();
  const { requestId, responseId } = useParams();
  console.log('▶ EstimateDetail user:', user);
  console.log('▶ requestId:', requestId, '▶ responseId:', responseId);
  console.log('▶ user.role:', serviceType);
  const navigate = useNavigate();

  const { estimate, loading, error } = useEstimateDetail(requestId, responseId);

  const handleReject = async () => {
    if (window.confirm('계약을 거절하겠습니까?')) {
      try {
        await rejectEstimate(requestId, serviceType, user.userId);
        navigate(`/estimateList?companyId=${user?.companyId}`);
      } catch (error) {
        alert(`견적 거절에 실패했습니다: ${error.message}`);
      }
    }
  };

  const handleAccept = async () => {
    if (window.confirm('계약을 수락하겠습니까?')) {
      try {
        await generateContract(requestId, responseId);
        navigate(`/contracts`);
      } catch (error) {
        alert(`견적 수락에 실패했습니다: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">견적 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
        <div className="container py-5 text-center">
          <h3 className="text-danger">오류가 발생했습니다</h3>
          <p>{error}</p>
          <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
      </div>
    );
  }

  if (!estimate) {
    return (
      <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
        <div className="container py-5 text-center">
          <h3>해당 견적 요청 정보를 찾을 수 없습니다.</h3>
          <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
      </div>
    );
  }

  const { request, items = [], response, response_items = [] } = estimate;

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>
            ←
          </button>
          <h2 className="mb-0">견적번호 <span className="text-primary">{request.request_id}</span> 상세정보</h2>
        </div>

        {/* 견적 요청 정보 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
            <h5 className="mb-0 text-primary">견적 요청 정보</h5>
          </div>
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>상태:</strong> <span className={`badge bg-${ESTIMATE_STATUS[request.status]?.badgeColor || 'secondary'}`}>
                  {ESTIMATE_STATUS[request.status]?.label || '-'}
                </span>
              </div>
              <div className="col-md-6">
                <strong>납품 기한:</strong> {formatDateToYYYYMMDD(request.due_date) || '-'}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>요청일시:</strong> {formatDateToYYYYMMDD(request.created_at) || '-'}
              </div>
              <div className="col-md-6">
                <strong>상세 설명:</strong> {request.detail || '-'}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>구매사:</strong> {request.buyer_company_name || '-'}
              </div>
              <div className="col-md-6">
                <strong>공급사:</strong> {request.supplier_company_name || '-'}
              </div>
            </div>
          </div>
        </div>

        {/* 견적 요청 품목 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
            <h5 className="mb-0 text-primary">견적 요청 품목</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>품목</th>
                    <th>세부 품목</th>
                    <th>수량</th>
                    <th className="text-end">규격</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center">품목 정보가 없습니다.</td>
                    </tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item.item_id}>
                        <td>{item.category_name || '-'}</td>
                        <td>{item.detail_category_name || '-'}</td>
                        <td>{item.quantity || '-'}</td>
                        <td className="text-end">{item.specification || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* SUPPLIER / 요청 상태 2일 때 */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          {request.status === 2 && serviceType === 'supplier' && (
            <>
              <button className="btn btn-outline-danger" onClick={handleReject}>거절</button>
              <button 
                className="btn btn-primary"
                onClick={() => navigate(`/estimate/${requestId}/response`)}
              >
                견적 제안서 작성
              </button>
            </>
          )}
        </div>

        {/* 견적 응답 정보 */}
        {response && response.response_id && (
          <>
            <div className="card shadow-sm mb-4">
              <div className="card-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                <h5 className="mb-0 text-success">견적 응답 정보</h5>
              </div>
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>응답 ID:</strong> {response.response_id || '-'}
                  </div>
                  <div className="col-md-6">
                    <strong>상태:</strong> <span className={`badge bg-${ESTIMATE_STATUS[response.status]?.badgeColor || 'secondary'}`}>
                      {ESTIMATE_STATUS[response.status]?.label || '-'}
                    </span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>결제 조건:</strong> {response.payment_terms || '-'}
                  </div>
                  <div className="col-md-6">
                    <strong>보증:</strong> {response.warranty || '-'}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>특별 조항:</strong> {response.special_terms || '-'}
                  </div>
                  <div className="col-md-6">
                    <strong>총 견적 금액:</strong> {formatCurrency(response.total_price)}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>응답 생성일시:</strong> {formatDateToYYYYMMDD(response.created_at) || '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* 견적 응답 품목 */}
            <div className="card shadow-sm mb-4">
              <div className="card-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                <h5 className="mb-0 text-success">견적 응답 품목</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>품목</th>
                        <th>세부 품목</th>
                        <th className="text-end">단가</th>
                        <th className="text-end">납품 소요일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {response_items.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center">응답 품목 정보가 없습니다.</td>
                        </tr>
                      ) : (
                        response_items.map((responseItem) => {
                          const requestItem = findMatchingRequestItem(items, responseItem);
                          return (
                            <tr key={responseItem.response_item_id}>
                              <td>{requestItem?.category_name || '-'}</td>
                              <td>{requestItem?.detail_category_name || '-'}</td>
                              <td className="text-end">
                                {formatCurrency(responseItem.unit_price)}
                              </td>
                              <td className="text-end">{responseItem.delivery_days ? `${responseItem.delivery_days}일` : '-'}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* BUYER / 응답 상태 2일 때 */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              {response?.status === 2 && serviceType === 'buyer' && (
                <>
                  <button className="btn btn-outline-danger" onClick={handleReject}>거절</button>
                  <button className="btn btn-success" onClick={handleAccept}>수락</button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EstimateDetail; 