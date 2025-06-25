import React from 'react';
import { useParams } from 'react-router-dom';
import { mockEstimateRequests } from '../../data/MockEstimateList';
import 'bootstrap/dist/css/bootstrap.min.css';

const HistoryDetail = () => {
  const { id } = useParams();
  const request = mockEstimateRequests.find(req => req.request.request_id === parseInt(id));

  if (!request) {
    return <div className="container mt-4">계약 정보를 찾을 수 없습니다.</div>;
  }

  const contract = request.contract;
  const items = request.items;

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">계약 상세 정보</h2>

      {/* 기본 정보 섹션 */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">기본 정보</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">계약번호</label>
                <p className="form-control-plaintext">{contract ? `CT-${contract.contract_id}` : `REQ-${request.request.request_id}`}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">공급업체</label>
                <p className="form-control-plaintext">{request.request.detail}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">계약체결일</label>
                <p className="form-control-plaintext">{contract?.created_at || request.request.created_at}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">납품기한</label>
                <p className="form-control-plaintext">{contract?.delivery_date || '-'}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">계약금액</label>
                <p className="form-control-plaintext">
                  {request.response?.total_price ? `${request.response.total_price.toLocaleString()}원` : '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 계약 정보 섹션 */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">계약 정보</h5>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">결제조건</label>
                <p className="form-control-plaintext">{contract?.payment_terms || '-'}</p>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">보증기간</label>
                <p className="form-control-plaintext">{contract?.warranty_period || '-'}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">특이사항</label>
                <p className="form-control-plaintext">{contract?.special_notes || '-'}</p>
              </div>
            </div>
          </div>

          {/* 품목 정보 테이블 */}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>품목</th>
                  <th>수량</th>
                  <th>단위</th>
                  <th>단가</th>
                  <th>금액</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.unit_price?.toLocaleString()}원</td>
                    <td>{(item.quantity * item.unit_price)?.toLocaleString()}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetail; 