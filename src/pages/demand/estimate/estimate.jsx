import { useState } from 'react';
import DemandNavbar from '../../../components/DemandNavbar';
import Footer from '../../../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { contractsData, estimateRequestsData, estimateResponsesData } from '../data/contractsData';

function Estimate() {
  const [contracts] = useState(contractsData);
  const [requests] = useState(estimateRequestsData);
  const [responses] = useState(estimateResponsesData);
  const readStatusMap = {
    1: { label: '미확인',  button: false, badgeColor: 'secondary' },   // 버튼 숨김, 회색
    2: { label: '수정요청', button: true, badgeColor: 'warning'  },   // 확인/승인 버튼 노출, 노란색
    3: { label: '승인대기', button: false, badgeColor: 'success'  },   // 버튼 숨김, 초록색
    4: { label: '계약체결', button: false, badgeColor: 'primary' }    // 버튼 숨김, 파란색
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <h2 className="mb-4">견적 관리</h2>

        {/* 1. 견적 요청서 발송 내역 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">견적 요청서 발송 내역</h5>
            <Link to="/demand/estimateSheet" className="btn btn-primary btn-sm">견적 요청서 작성</Link>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>견적번호</th>
                    <th>품목</th>
                    <th>요청일</th>
                    <th>마감일</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length === 0 ? (
                    <tr><td colSpan={5} className="text-center text-muted">발송 내역이 없습니다.</td></tr>
                  ) : (
                    requests.map(request => {
                      const hasResponse = responses.some(r => r.request_id === request.request_id);
                      return (
                        <tr key={request.request_id}>
                          <td>{request.request_id}</td>
                          <td>{request.category}</td>
                          <td>{request.created_at}</td>
                          <td>{request.due_date}</td>
                          <td>
                            <div className="d-flex justify-content-between align-items-center">
                              <span>{hasResponse ? request.status : '미확인'}</span>
                              <Link to={`/demand/sent-estimates/${request.request_id}`} className="btn btn-sm btn-outline-primary">상세보기</Link>
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

        {/* 2. 견적 제안서 수신 확인 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">견적 제안서 수신 확인</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>제안서번호</th>
                    <th>견적번호</th>
                    <th>공급기업</th>
                    <th>품목</th>
                    <th>제안금액</th>
                    <th>수신일</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.length === 0 ? (
                    <tr><td colSpan={7} className="text-center text-muted">수신된 제안서가 없습니다.</td></tr>
                  ) : (
                    responses.map(response => {
                      const request = requests.find(r => r.request_id === response.request_id);
                      const contract = contracts.find(c => c.response_id === response.response_id);
                      const { label, badgeColor, button: showButton } = readStatusMap[response.is_read] || { label: '-', badgeColor: 'secondary', button: false };

                      return (
                        <tr key={response.response_id}>
                          <td>{response.response_id}</td>
                          <td>{response.request_id}</td>
                          <td>{contract ? contract.supplier_company_name : `예시 기업 ${response.supplier_id}`}</td>
                          <td>{request ? request.category : '-'}</td>
                          <td>{formatCurrency(response.unit_price)}</td>
                          <td>{response.created_at}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <span className={`badge bg-${badgeColor}`}>{label}</span>
                            {showButton && (
                              <Link to={`/demand/received-proposals/${response.response_id}`} className={`btn btn-sm ms-2 btn-outline-warning`}>
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
      </div>
    </div>
  );
}

export default Estimate; 