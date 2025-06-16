import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { ESTIMATE_STATUS } from '../../constants/estimateStatus';
import { useEstimateData } from './ProcessEstimateList';

function EstimateList({ user }) {
  console.log('▶ EstimateList user:', user);
  
  const { estimates, loading, error } = useEstimateData(user.companyId, user.role);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  // role에 따라 사용할 status 결정
  const getStatus = (estimate) => {
    if (user.role === 'BUYER') {
      return estimate.request.status;
    } else {
      return estimate.response?.status || estimate.request.status;
    }
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">견적 관리</h2>
          <Link to="/estimateSheet" className="btn btn-primary">견적 요청서 작성</Link>
        </div>
        {/* 진행중 계약 (status 1,2) */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">진행중인 계약</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>견적번호</th>
                    <th>기업명</th>
                    <th>품목</th>
                    <th>요청일</th>
                    <th>납품기한</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {!estimates || estimates.length === 0 ? (
                    <tr><td colSpan={6} className="text-center text-muted">수신된 제안서가 없습니다.</td></tr>
                  ) : (
                    estimates
                      .filter(estimate => {
                        const status = getStatus(estimate);
                        return status && [1, 2].includes(status);
                      })
                      .map(estimate => {
                        const { request, response, items = [] } = estimate;
                        const status = getStatus(estimate);
                        const { label, badgeColor } = ESTIMATE_STATUS[status] || { label: '-', badgeColor: 'secondary' };
                        const showButton = status === 1;

                        return (
                          <tr key={request.request_id}>
                            <td>{request.request_id}</td>
                            <td>{request.company_name || '-'}</td>
                            <td>
                              {items?.map(item => item.detail_category_name).join(', ').length > 10 
                                ? items.map(item => item.detail_category_name).join(', ').substring(0, 10) + '...'
                                : items?.map(item => item.detail_category_name).join(', ')}
                            </td>
                            <td>{request.created_at}</td>
                            <td>{request.due_date}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className={`badge bg-${badgeColor}`}>{label}</span>
                                {showButton && (
                                  <Link
                                  to={
                                    response
                                    ? `/estimate/${request.request_id}/${response.response_id}`
                                    : `/estimate/${request.request_id}`
                                  }
                                  className="btn btn-sm ms-2 btn-outline-warning"
                                  >
                                    확인/승인
                                  </Link>
                                )}
                                {status === 2 && (
                                  <Link
                                    to={
                                      user.role === 'BUYER'
                                        ? `/estimate/${request.request_id}`
                                        : `/estimate/${request.request_id}/${response.response_id}`
                                    }
                                    className="btn btn-sm ms-2 btn-outline-success"
                                  >
                                    상세보기
                                  </Link>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 완료된 계약 (status 3,4) */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">완료된 계약</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>계약번호</th>
                    <th>견적번호</th>
                    <th>기업명</th>
                    <th>품목</th>
                    <th>거래금액</th>
                    <th>체결일</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {!estimates || estimates.length === 0 ? (
                    <tr><td colSpan={7} className="text-center text-muted">발송 내역이 없습니다.</td></tr>
                  ) : (
                    estimates
                      .filter(estimate => {
                        const status = getStatus(estimate);
                        return status && [3, 4].includes(status);
                      })
                      .map(estimate => {
                        const { request, response, items = [] } = estimate;
                        const status = getStatus(estimate);
                        const { label, badgeColor } = ESTIMATE_STATUS[status] || { label: '-', badgeColor: 'secondary' };

                        return (
                          <tr key={request.request_id}>
                            <td>{request.status === 3 ? response?.response_id || '-' : '-'}</td>
                            <td>{request.request_id}</td>
                            <td>{request.company_name || '-'}</td>
                            <td>
                              {items?.map(item => item.detail_category_name).join(', ').length > 10 
                                ? items.map(item => item.detail_category_name).join(', ').substring(0, 10) + '...'
                                : items?.map(item => item.detail_category_name).join(', ')}
                            </td>
                            <td>
                              {request.status === 3 ? (
                                response?.total_price?.toLocaleString() + '원'
                              ) : '-'}
                            </td>
                            <td>{request.status === 3 ? response?.created_at || '-' : '-'}</td>
                            <td>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className={`badge bg-${badgeColor}`}>{label}</span>
                                <Link 
                                  to={`/estimate/${request.request_id}/${response.response_id}`} 
                                  className={`btn btn-sm btn-outline-${request.status === 3 ? 'primary' : 'danger'}`}
                                >
                                  상세보기
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstimateList; 