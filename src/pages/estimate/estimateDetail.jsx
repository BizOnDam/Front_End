import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEstimateRequests } from '../../data/MockEstimateList';
import { ESTIMATE_REQUEST_STATUS, ESTIMATE_RESPONSE_STATUS } from '../../constants/estimateStatus';
import 'bootstrap/dist/css/bootstrap.min.css';

const EstimateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const estimate = mockEstimateRequests.find(est => est.request.request_id === parseInt(id));
  const { request, items, response, response_items } = estimate || {};

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

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>
            ←
          </button>
          <h2 className="mb-0">견적번호 <span className="text-primary">{String(request.request_id)}23145</span> 상세정보</h2>
        </div>

        {/* 견적 요청 정보 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
            <h5 className="mb-0 text-primary">견적 요청 정보</h5>
          </div>
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>상태:</strong> <span className={`badge bg-${ESTIMATE_REQUEST_STATUS[request.status].badgeColor}`}>{ESTIMATE_REQUEST_STATUS[request.status].label}</span>
              </div>
              <div className="col-md-6">
                <strong>납품 기한:</strong> {request.due_date}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>생성일시:</strong> {request.created_at}
              </div>
              <div className="col-md-6">
                <strong>상세 설명:</strong> {request.detail}
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
                  {items.map((item) => (
                    <tr key={item.item_id}>
                      <td>{item.category_name}</td>
                      <td>{item.detail_category_name}</td>
                      <td>{item.quantity}</td>
                      <td className="text-end">{item.specification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 견적 응답 정보 */}
        {response && (
          <>
            <div className="card shadow-sm mb-4">
              <div className="card-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                <h5 className="mb-0 text-success">견적 응답 정보</h5>
              </div>
              <div className="card-body">
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>응답 ID:</strong> {response.response_id}
                  </div>
                  <div className="col-md-6">
                    <strong>상태:</strong> <span className={`badge bg-${ESTIMATE_RESPONSE_STATUS[response.status].badgeColor}`}>{ESTIMATE_RESPONSE_STATUS[response.status].label}</span>
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
                    <strong>총 견적 금액:</strong> {response.total_price ? new Intl.NumberFormat('ko-KR', {
                      style: 'currency',
                      currency: 'KRW'
                    }).format(response.total_price) : '-'}
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
                      {response_items?.map((responseItem) => {
                        const requestItem = items.find(
                          (item) => item.item_id === responseItem.item_id
                        );
                        return (
                          <tr key={responseItem.response_item_id}>
                            <td>{requestItem?.category_name || '-'}</td>
                            <td>{requestItem?.detail_category_name || '-'}</td>
                            <td className="text-end">
                              {responseItem.unit_price ? new Intl.NumberFormat('ko-KR', {
                                style: 'currency',
                                currency: 'KRW'
                              }).format(responseItem.unit_price) : '-'}
                            </td>
                            <td className="text-end">{responseItem.delivery_days ? `${responseItem.delivery_days}일` : '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EstimateDetail; 