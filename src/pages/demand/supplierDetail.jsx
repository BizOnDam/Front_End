import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MockCompanies from '../../data/MockCompanies';

function SupplierDetail() {
  const navigate = useNavigate();
  const { businessNumber } = useParams();
  const supplier = MockCompanies.find(s => String(s.business_number) === String(businessNumber));

  if (!supplier) {
    return (
      <div className="container py-5 text-center">
        <h3>해당 공급기업 정보를 찾을 수 없습니다.</h3>
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        {/* 상단: 뒤로가기 및 기업명 */}
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>
            ← 뒤로가기
          </button>
          <h2 className="mb-0"><span className="text-primary">{supplier.company_name_kr}</span> 상세정보</h2>
        </div>

        {/* 기업 정보 카드 */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <strong>사업자등록번호:</strong> {supplier.business_number}
              </div>
              <div className="col-md-6 mb-2">
                <strong>주요 품목:</strong> {supplier.business_type}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <strong>평가점수:</strong> {supplier.average_rating} / 5.0
              </div>
              <div className="col-md-6 mb-2">
                <strong>기업 소개:</strong> {supplier.description}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <strong>대표자명:</strong> {supplier.ceo_name_kr}
              </div>
              <div className="col-md-6 mb-2">
                <strong>설립일:</strong> {supplier.start_date}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <strong>연락처:</strong> {supplier.phone_number}
              </div>
              <div className="col-md-6 mb-2">
                <strong>팩스:</strong> {supplier.fax_number}
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-2">
                <strong>주소:</strong> {supplier.address} {supplier.address_detail}
              </div>
            </div>
          </div>
        </div>

        {/* 거래 이력 카드 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">거래 이력</h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>계약번호</th>
                    <th>품목</th>
                    <th>계약금액</th>
                    <th>거래일</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <tr key={`empty-history-${idx}`}>
                      <td colSpan={5} className="text-center text-muted">거래 이력이 없습니다.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupplierDetail; 