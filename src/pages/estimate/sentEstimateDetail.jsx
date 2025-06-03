import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {estimateRequestsData, estimateResponsesData, contractsData} from '../../data/contractsData';


function SentEstimateDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const requestId = Number(id);

  // estimate 요청 찾기
  const estimate = estimateRequestsData.find(item => item.request_id === requestId);

  console.log('sentEstimates', estimateRequestsData);
  console.log('looking for id', id, 'found', estimate);


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

  // estimate → response → contract 순으로 찾기
  const response = estimateResponsesData.find(r => r.request_id === estimate.request_id);
  const contract = response ? contractsData.find(c => c.response_id === response.response_id) : null;
  
  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }} className='relative'>
      <div className="container py-4">
        <h2 className="mb-4"><span className="text-primary">{estimate.request_id}</span> 상세정보</h2>

        {/* 요청 정보 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">견적 요청 정보</h5>
          </div>
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>품목명:</strong> {estimate.category}
              </div>
              <div className="col-md-6">
                <strong>수량:</strong> {estimate.quantity}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>납기일:</strong> {estimate.due_date}
              </div>
              <div className="col-md-6">
                <strong>요청일:</strong> {estimate.created_at}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>상태:</strong> {estimate.status}
              </div>
              <div className="col-md-6">
                <strong>요청 사항:</strong> {estimate.detail}
              </div>
            </div>
          </div>
        </div>

        {/* 계약 정보 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">계약 정보</h5>
          </div>
          <div className="card-body">
            {contract ? (
              <>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>계약번호:</strong> {contract.contract_id}
                  </div>
                  <div className="col-md-6">
                    <strong>공급업체:</strong> {contract.supplier_company_name}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>계약일:</strong> {contract.contract_date}
                  </div>
                  <div className="col-md-6">
                    <strong>총 금액:</strong> {new Intl.NumberFormat('ko-KR', {
                      style: 'currency', currency: 'KRW'
                    }).format(contract.total_price)}
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-md-6">
                    <strong>상태:</strong> {contract.status}
                  </div>
                  <div className="col-md-6">
                    <strong>운송장:</strong> {contract.tracking_number || '-'}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted">아직 계약이 체결되지 않았습니다.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default SentEstimateDetail; 