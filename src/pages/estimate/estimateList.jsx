import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import LoadingOrError from '../../components/LoadingOrError';
import { Link } from 'react-router-dom';
import { ESTIMATE_STATUS } from '../../constants/estimateStatus';
import { useEstimateData } from '../../hooks/estimate/useEstimateData';
import { useAuth }    from '../../contexts/AuthContext';
import { useService } from '../../contexts/ServiceContext';
import Pagination, { paginate } from '../../components/Pagination';

function EstimateList() {
  const { user } = useAuth();
  const { serviceType } = useService();
  const [ongoingPage, setOngoingPage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);

  const role = serviceType === 'buyer' ? 'buyer' : 'supplier';
  console.log('▶ EstimateList user:', user, 'role:', role);
  
  // API 호출
  const { estimates, loading, error } = useEstimateData();
    const getStatus = (estimate) => {
    if (role === 'supplier') {
      // 응답 안 했으면 status를 강제로 1로 간주
      if (!estimate.response) return 1;
        return estimate.response.status ?? estimate.request.status;
    } else {
      return estimate.request.status;
    }
  };

  // 진행중(1,2) / 완료(3,4) 분리
  const ongoing = estimates.filter(estimate => {
    const status = getStatus(estimate);
    return status && [1, 2].includes(status);
  });
  const completed = estimates.filter(estimate => {
    const status = getStatus(estimate);
    return status && [3, 4].includes(status);
  });

  // 페이지네이션 설정
  const itemsPerPage = 10;
  const paginatedOngoing = paginate(ongoing, ongoingPage, itemsPerPage);
  const paginatedCompleted = paginate(completed, completedPage, itemsPerPage);

  return (
    <>
    <LoadingOrError loading={loading} error={error} />
      {!loading && !error && (
      <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">견적 관리</h2>
            {serviceType === 'buyer' && (
              <Link to="/estimateSheet" className="btn btn-primary">
                견적 요청서 작성
              </Link>
            )}
          </div>

          {/* 진행중인 계약 (status 1,2) */}
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
                    {ongoing.length === 0 ? (
                      <tr><td colSpan={6} className="text-center text-muted">수신된 제안서가 없습니다.</td></tr>
                    ) : (
                      paginatedOngoing.map(estimate => {
                        const { request, response, items = [] } = estimate;
                        const status = getStatus(estimate);
                        const { label, badgeColor } = ESTIMATE_STATUS[status] || { label: '-', badgeColor: 'secondary' };
                        const showButton = status === 1;

                        return (
                          <tr key={request.request_id}>
                            <td>{request.request_id}</td>
                            <td>{request.company_name || '-'}</td>
                            <td>
                              {items.map(i => i.detail_category_name).join(', ').length > 10
                                ? items.map(i => i.detail_category_name).join(', ').slice(0, 10) + '...'
                                : items.map(i => i.detail_category_name).join(', ')
                              }
                            </td>
                            <td>{request.created_at}</td>
                            <td>{request.due_date}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className={`badge bg-${badgeColor}`}>{label}</span>
                                {showButton && (
                                  <Link
                                    to={
                                      response?.response_id
                                      ? `/estimate/${request.request_id}/${response.response_id}`
                                      : `/estimate/${request.request_id}`}
                                    className="btn btn-sm ms-2 btn-outline-warning"
                                  >
                                    확인/승인
                                  </Link>
                                )}
                                {status === 2 && (
                                  <Link
                                    to={
                                        role === 'buyer'
                                        ? `/estimate/${request.request_id}`
                                          : response?.response_id
                                        ? `/estimate/${request.request_id}/${response.response_id}`
                                        : `/estimate/${request.request_id}`}
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
          {/* 진행중인 계약 페이징 */}
          <Pagination
            currentPage={ongoingPage}
            totalPages={Math.ceil(ongoing.length / itemsPerPage)}
            onPageChange={setOngoingPage}
          />

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
                    {!completed || completed.length === 0 ? (
                      <tr><td colSpan={7} className="text-center text-muted">발송 내역이 없습니다.</td></tr>
                    ) : (
                      paginatedCompleted.map(estimate => {
                        const { request, response, items = [] } = estimate;
                        const status = getStatus(estimate);
                        const { label, badgeColor } = ESTIMATE_STATUS[status] || { label: '-', badgeColor: 'secondary' };

                        return (
                          <tr key={request.request_id}>
                            <td>{status === 3 ? response?.response_id || '-' : '-'}</td>
                            <td>{request.request_id}</td>
                            <td>{request.company_name || '-'}</td>
                            <td>
                              {items.map(i => i.detail_category_name).join(', ').length > 10
                                ? items.map(i => i.detail_category_name).join(', ').slice(0, 10) + '...'
                                : items.map(i => i.detail_category_name).join(', ')
                              }
                            </td>
                            <td>{status === 3 ? `${response?.total_price.toLocaleString()}원` : '-'}</td>
                            <td>{status === 3 ? response?.created_at || '-' : '-'}</td>
                            <td>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className={`badge bg-${badgeColor}`}>{label}</span>
                                <Link
                                  to={`/estimate/${request.request_id}/${response.response_id}`}
                                  className={`btn btn-sm btn-outline-${status === 3 ? 'primary' : 'danger'}`}
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
          {/* 완료된 계약 페이징 */}
          <Pagination
            currentPage={completedPage}
            totalPages={Math.ceil(completed.length / itemsPerPage)}
            onPageChange={setCompletedPage}
          />
        </div>
      </div>
      )}
    </>
  );
}

export default EstimateList;