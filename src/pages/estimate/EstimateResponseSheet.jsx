import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEstimateDetail } from './ProcessEstimateDetail';
import { processEstimateResponse } from './ProcessEstimateResponseSheet';
import 'bootstrap/dist/css/bootstrap.min.css';

const EstimateResponseSheet = ({ user }) => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    payment_terms: '',
    warranty: '',
    special_terms: '',
    items: []
  });

  useEffect(() => {
    const fetchEstimateDetail = async () => {
      try {
        setLoading(true);
        const data = await getEstimateDetail(requestId);
        setEstimate(data);
        // 초기 아이템 데이터 설정
        setFormData(prev => ({
          ...prev,
          items: data.items.map(item => ({
            item_id: item.item_id,
            unit_price: '',
            delivery_days: ''
          }))
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstimateDetail();
  }, [requestId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await processEstimateResponse(formData, requestId, user, estimate);
      if (response.success) {
        alert(`${response.companyName}에 견적 응답이 발송되었습니다!`);
        navigate('/estimateList');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">견적 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
        <div className="container py-5 text-center">
          <h3 className="text-danger">오류가 발생했습니다</h3>
          <p>{error}</p>
          <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
      </div>
    );
  }

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

  const { request, items = [] } = estimate;

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="d-flex align-items-center mb-4">
          <button className="btn btn-outline-secondary me-3" onClick={() => navigate(-1)}>
            ←
          </button>
          <h2 className="mb-0">견적 제안서 작성</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 견적 요청 정보 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
              <h5 className="mb-0 text-primary">견적 요청 정보</h5>
            </div>
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-md-6">
                  <strong>견적번호:</strong> {request.request_id}
                </div>
                <div className="col-md-6">
                  <strong>납품 기한:</strong> {request.due_date}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6">
                  <strong>구매사:</strong> {request.buyer_company_name}
                </div>
                <div className="col-md-6">
                  <strong>공급사:</strong> {request.supplier_company_name}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <strong>상세 설명:</strong> {request.detail}
                </div>
              </div>
            </div>
          </div>

          {/* 견적 제안 정보 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
              <h5 className="mb-0 text-success">견적 제안 정보</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">결제 조건</label>
                  <input
                    type="text"
                    className="form-control"
                    name="payment_terms"
                    value={formData.payment_terms}
                    onChange={handleInputChange}
                    placeholder="예: 계약금 30%, 잔금 70%"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">보증</label>
                  <input
                    type="text"
                    className="form-control"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleInputChange}
                    placeholder="예: 1년"
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12">
                  <label className="form-label">특별 조항</label>
                  <textarea
                    className="form-control"
                    name="special_terms"
                    value={formData.special_terms}
                    onChange={handleInputChange}
                    placeholder="특별 조항을 입력하세요"
                    rows="3"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 견적 품목 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header" style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
              <h5 className="mb-0 text-success">견적 품목</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>품목</th>
                      <th>세부 품목</th>
                      <th>수량</th>
                      <th>규격</th>
                      <th className="text-end">단가</th>
                      <th className="text-end">납품 소요일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.item_id}>
                        <td>{item.category_name}</td>
                        <td>{item.detail_category_name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.specification}</td>
                        <td>
                          <input
                            type="number"
                            className="form-control text-end"
                            value={formData.items[index].unit_price}
                            onChange={(e) => handleItemChange(index, 'unit_price', e.target.value)}
                            placeholder="단가 입력"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control text-end"
                            value={formData.items[index].delivery_days}
                            onChange={(e) => handleItemChange(index, 'delivery_days', e.target.value)}
                            placeholder="일수 입력"
                            required
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
              취소
            </button>
            <button type="submit" className="btn btn-primary">
              견적 제안서 제출
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EstimateResponseSheet; 