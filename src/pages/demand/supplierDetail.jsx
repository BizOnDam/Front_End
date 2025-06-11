import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MockCompanies from '../../data/MockCompanies';
import { mockEstimateRequests } from '../../data/MockEstimateList';
import { ESTIMATE_STATUS } from '../../constants/estimateStatus';

function SupplierDetail() {
  const navigate = useNavigate();
  const { businessNumber } = useParams();
  const supplier = MockCompanies.find(s => String(s.business_number) === String(businessNumber));
  
  // 해당 공급기업의 거래 이력 필터링
  const transactionHistory = mockEstimateRequests.filter(
    estimate => String(estimate.request.supplier_id) === String(businessNumber)
  );

  if (!supplier) {
    return (
      <div className="container py-5 text-center">
        <h3>해당 공급기업 정보를 찾을 수 없습니다.</h3>
        <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    );
  }

  const formatValue = (value) => {
    return value || '-';
  };

  const formatProducts = (products) => {
    if (!products || !Array.isArray(products)) return '-';
    return products.map(product => product.product_id).join(', ');
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        {/* 상단: 뒤로가기 및 기업명 */}
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>
            ←
          </button>
          <h2 className="mb-0"><span className="text-primary">{formatValue(supplier.company_name_kr)}</span> 상세정보</h2>
        </div>

        {/* 기본 정보 섹션 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">기본 정보</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>사업자등록번호</strong>
                  </div>
                  <div>{formatValue(supplier.business_number)}</div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>업태/업종</strong>
                  </div>
                  <div>{formatValue(supplier.business_type)}</div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>주요 품목</strong>
                  </div>
                  <div>{formatProducts(supplier.company_products)}</div>
                </div>
              </div>
              {/* <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>평가점수</strong>
                  </div>
                  <div>{formatValue(supplier.average_rating)} / 5.0</div>
                </div>
              </div> */}
              <div className="col-12 mb-3">
                <div className="d-flex align-items-start">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>기업 소개</strong>
                  </div>
                  <div>{formatValue(supplier.description)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 정보 섹션 */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">상세 정보</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>대표자명</strong>
                  </div>
                  <div>{formatValue(supplier.ceo_name_kr)}</div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>대표전화번호</strong>
                  </div>
                  <div>{formatValue(supplier.phone_number)}</div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>개업일</strong>
                  </div>
                  <div>{formatValue(supplier.start_date)}</div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>팩스번호</strong>
                  </div>
                  <div>{formatValue(supplier.fax_number)}</div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>우편번호</strong>
                  </div>
                  <div>{formatValue(supplier.postcode)}</div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="d-flex align-items-center">
                  <div className="me-3" style={{ width: '120px' }}>
                    <strong>주소</strong>
                  </div>
                  <div>{formatValue(supplier.address)} {formatValue(supplier.address_detail)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 거래 이력 섹션 */}
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
                  {transactionHistory.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center text-muted">거래 이력이 없습니다.</td>
                    </tr>
                  ) : (
                    transactionHistory.map(estimate => {
                      const { request, contract, items } = estimate;
                      const { label, badgeColor } = ESTIMATE_STATUS[request.status] || { label: '-', badgeColor: 'secondary' };
                      
                      return (
                        <tr key={request.request_id}>
                          <td>{request.status === 3 ? contract.contract_id : '-'}</td>
                          <td>
                            {items.map(item => item.detail_category_name).join(', ').length > 20 
                              ? items.map(item => item.detail_category_name).join(', ').substring(0, 20) + '...'
                              : items.map(item => item.detail_category_name).join(', ')}
                          </td>
                          <td>
                            {request.status === 3 
                              ? estimate.response_items.reduce((sum, item) => sum + item.unit_price, 0).toLocaleString() + '원'
                              : '-'}
                          </td>
                          <td>{request.status === 3 ? contract.created_at : '-'}</td>
                          <td>
                            <span className={`badge bg-${badgeColor}`}>{label}</span>
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

export default SupplierDetail; 