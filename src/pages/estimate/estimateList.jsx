import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { mockEstimateRequests } from '../../data/MockEstimateList';
import { ESTIMATE_REQUEST_STATUS } from '../../constants/estimateStatus';

function EstimateList() {
  const [estimates] = useState(mockEstimateRequests);

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">견적 관리</h2>
          <Link to="/estimateSheet" className="btn btn-primary">견적 요청서 작성</Link>
        </div>
        {/* 1. 미확인, 미승인된 견적 제안서 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">미처리된 견적 제안서</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>견적번호</th>
                    <th>공급기업</th>
                    <th>품목</th>
                    <th>요청일</th>
                    <th>납품기한</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {estimates.length === 0 ? (
                    <tr><td colSpan={6} className="text-center text-muted">수신된 제안서가 없습니다.</td></tr>
                  ) : (
                    estimates
                      .filter(estimate => [1, 2, 3].includes(estimate.request.status))
                      .map(estimate => {
                        const { request, response, items } = estimate;
                        const { label, badgeColor } = ESTIMATE_REQUEST_STATUS[request.status] || { label: '-', badgeColor: 'secondary' };
                        const showButton = request.status === 3;

                        return (
                          <tr key={request.request_id}>
                            <td>{request.request_id}</td>
                            <td>{`공급기업 ${request.supplier_id}`}</td>
                            <td>
                              {items.map(item => item.detail_category_name).join(', ').length > 10 
                                ? items.map(item => item.detail_category_name).join(', ').substring(0, 10) + '...'
                                : items.map(item => item.detail_category_name).join(', ')}
                            </td>
                            <td>{request.created_at}</td>
                            <td>{request.due_date}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <span className={`badge bg-${badgeColor}`}>{label}</span>
                              {showButton && (
                                <Link to={`/received-proposals/${response.response_id}`} className={`btn btn-sm ms-2 btn-outline-warning`}>
                                  확인/승인
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

        {/* 2. 계약이 체결되었거나, 거절된 견적 제안서 내역*/}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">처리된 견적 제안서</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>계약번호</th>
                    <th>견적번호</th>
                    <th>공급기업</th>
                    <th>품목</th>
                    <th>거래금액</th>
                    <th>체결일</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {estimates.length === 0 ? (
                    <tr><td colSpan={7} className="text-center text-muted">발송 내역이 없습니다.</td></tr>
                  ) : (
                    estimates
                      .filter(estimate => estimate.request.status === 4 || estimate.request.status === 5)
                      .map(estimate => {
                        const { request, contract, items } = estimate;
                        const { label, badgeColor } = ESTIMATE_REQUEST_STATUS[request.status] || { label: '-', badgeColor: 'secondary' };

                        return (
                          <tr key={request.request_id}>
                            <td>{request.status === 4 ? contract.contract_id : '-'}</td>
                            <td>{request.request_id}</td>
                            <td>공급기업 {request.status === 4 ? contract.supplier_company_id : request.supplier_id}</td>
                            <td>
                              {items.map(item => item.detail_category_name).join(', ').length > 10 
                                ? items.map(item => item.detail_category_name).join(', ').substring(0, 10) + '...'
                                : items.map(item => item.detail_category_name).join(', ')}
                            </td>
                            <td>
                              {request.status === 4 ? (
                                estimate.response_items.reduce((sum, item) => sum + item.unit_price, 0).toLocaleString() + '원'
                              ) : '-'}
                            </td>
                            <td>{request.status === 4 ? contract.created_at : '-'}</td>
                            <td>
                              <div className="d-flex justify-content-between align-items-center">
                                <span className={`badge bg-${badgeColor}`}>{label}</span>
                                <Link to={`/estimateDetail/${request.request_id}`} className="btn btn-sm btn-outline-primary">상세보기</Link>
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