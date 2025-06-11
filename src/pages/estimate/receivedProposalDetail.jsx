import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEstimateRequests } from '../../data/MockEstimateList';
import { ESTIMATE_STATUS } from '../../constants/estimateStatus';

function ReceivedProposalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [request, setRequest] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const responseId = Number(id);

    // 견적 제안서 정보 찾기
    const foundEstimate = mockEstimateRequests.find(estimate => 
      estimate.response && estimate.response.response_id === responseId
    );

    if (!foundEstimate) return;

    setResponse(foundEstimate.response);
    setRequest(foundEstimate.request);
    setContract(foundEstimate.contract || null);
  }, [id]);

  if (!response || !request) {
    return (
      <div className="text-center py-5">
        <h3>해당 견적 제안 정보를 찾을 수 없습니다.</h3>
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    );
  }

  const formatCurrency = (amount) =>
    amount ? new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount) : '-';

  const isCompleted = response.status === 3;

  const handleApprove = () => {
    alert(`제안서 ${response.response_id} 전자 계약 승인 요청`);
    // TODO: 실제 전자계약 승인 API 호출 처리
  };

  return (
    <div>
      {/* 상단: 뒤로가기 및 기업명 */}
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>
          ←
        </button>
        <h2 className="mb-0">견적번호 <span className="text-primary">{response.response_id}</span> 제안서 상세정보</h2>
      </div>

      {/* 제안서 정보 카드 */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-white">
          <h5 className="mb-0">제안 정보</h5>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col-md-6"><strong>견적번호:</strong> {request.request_id}</div>
            <div className="col-md-6"><strong>공급기업:</strong> {contract ? contract.supplier_company_name : `예시 기업 ${response.supplier_id}`}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6"><strong>품목:</strong> {request.detail || '-'}</div>
            <div className="col-md-6"><strong>제안금액:</strong> {formatCurrency(response.total_price)}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6"><strong>수신일:</strong> {response.created_at || '-'}</div>
            <div className="col-md-6">
              <strong>상태:</strong>{' '}
              <span className={`badge bg-${ESTIMATE_STATUS[response.status]?.badgeColor || 'secondary'}`}>
                {ESTIMATE_STATUS[response.status]?.label || '-'}
              </span>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6"><strong>납기일:</strong> {response.delivery_days ? `${response.delivery_days}일` : '-'}</div>
            <div className="col-md-6"><strong>수량:</strong> {request.items?.length || '-'}개</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6">
              <strong>제안서 파일:</strong>{' '}
              {response.proposal_file_url ? (
                <a href={response.proposal_file_url} target="_blank" rel="noopener noreferrer">다운로드</a>
              ) : '-'}
            </div>
          </div>
        </div>
      </div>

      {/* 계약 승인 버튼 */}
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-success btn-lg" onClick={handleApprove} disabled={isCompleted}>
          전자 계약 승인
        </button>
      </div>
    </div>
  );
}

export default ReceivedProposalDetail;
