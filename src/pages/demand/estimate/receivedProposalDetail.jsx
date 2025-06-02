import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { estimateRequestsData, estimateResponsesData, contractsData } from '../data/contractsData';

function ReceivedProposalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [request, setRequest] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const responseId = Number(id);

    // 견적 제안서 정보 찾기
    const foundResponse = estimateResponsesData.find(r => r.response_id === responseId);
    if (!foundResponse) return;

    setResponse(foundResponse);

    // 견적 요청 정보 찾기
    const foundRequest = estimateRequestsData.find(r => r.request_id === foundResponse.request_id);
    setRequest(foundRequest || null);

    // 계약 정보 찾기
    const foundContract = contractsData.find(c => c.response_id === foundResponse.response_id);
    setContract(foundContract || null);
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
    new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);

  const getStatusText = (isRead) => {
    switch (isRead) {
      case 1:
        return '미확인';
      case 2:
        return '수정요청';
      case 3:
        return '승인대기';
      case 4:
        return '계약체결';
      default:
        return '미확인';
    }
  };

  const isCompleted = response.is_read === 4;

  const handleApprove = () => {
    alert(`제안서 ${response.response_id} 전자 계약 승인 요청`);
    // TODO: 실제 전자계약 승인 API 호출 처리
  };

  return (
    <div>
      <h2 className="mb-4"><span className="text-primary">{response.response_id}</span> 제안서 상세정보</h2>

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
            <div className="col-md-6"><strong>품목:</strong> {request.category}</div>
            <div className="col-md-6"><strong>제안금액:</strong> {formatCurrency(response.unit_price)}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6"><strong>수신일:</strong> {response.created_at}</div>
            <div className="col-md-6"><strong>상태:</strong> {getStatusText(response.is_read)}</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6"><strong>납기일:</strong> {response.delivery_days}일</div>
            <div className="col-md-6"><strong>수량:</strong> {request.quantity}개</div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6"><strong>제안서 파일:</strong>{' '}{response.proposal_file_url? 
            (
            <a href={response.proposal_file_url} target="_blank" rel="noopener noreferrer">다운로드</a>
            ) : '-'}
            </div>
          </div>
        </div>
      </div>

      {/* 계약 승인 버튼 */}
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-success btn-lg" onClick={handleApprove} disabled={isCompleted}> {/* TODO 로직 추가히기 */}
          전자 계약 승인
        </button>
      </div>
    </div>
  );
}

export default ReceivedProposalDetail;
