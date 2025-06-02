import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { supplierDetailData } from './data/supplierData';

function SupplierDetail() {
  const navigate = useNavigate();
  const { businessNumber } = useParams();
  const supplier = supplierDetailData.find(s => String(s.businessNumber) === String(businessNumber));

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
          <h2 className="mb-0"><span className="text-primary">{supplier.name}</span> 상세정보</h2>
        </div>

        {/* 기업 정보 카드 */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <strong>사업자등록번호:</strong> {supplier.businessNumber}
              </div>
              <div className="col-md-6 mb-2">
                <strong>주요 품목:</strong> {supplier.mainItems}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-2">
                <strong>평가점수:</strong> {supplier.rating} / 5.0
              </div>
              <div className="col-md-6 mb-2">
                <strong>기업 소개:</strong> {supplier.description}
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
                  {supplier.history.map((h) => (
                    <tr key={h.businessNumber}>
                      <td>{h.businessNumber}</td>
                      <td>{h.item}</td>
                      <td>{h.amount}</td>
                      <td>{h.date}</td>
                      <td><span className="badge bg-success">{h.status}</span></td>
                    </tr>
                  ))}
                  {supplier.history.length < 3 &&
                    Array.from({ length: 3 - supplier.history.length }).map((_, idx) => (
                      <tr key={`empty-history-${idx}`}>
                        <td colSpan={5}>&nbsp;</td>
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