import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function EstimateSheet() {
  const [form, setForm] = useState({
    item: '',
    quantity: '',
    deadline: '',
    region: '',
    method: '',
    request: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`입력값 확인:\n\n품목명: ${form.item}\n수량: ${form.quantity}\n납기일: ${form.deadline}\n지역: ${form.region}\n인쇄/제작 방식: ${form.method}\n요청 사항: ${form.request}`);
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <h2 className="mb-4">견적 요청서 작성</h2>
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">품목명</label>
                <input type="text" className="form-control" name="item" value={form.item} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">수량</label>
                <input type="number" className="form-control" name="quantity" value={form.quantity} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">납기일</label>
                <input type="date" className="form-control" name="deadline" value={form.deadline} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">지역</label>
                <input type="text" className="form-control" name="region" value={form.region} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">인쇄/제작 방식</label>
                <input type="text" className="form-control" name="method" value={form.method} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">요청 사항</label>
                <textarea className="form-control" name="request" value={form.request} onChange={handleChange} placeholder="예: 친환경 포장" rows="4"></textarea>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary px-5" type="submit">견적 요청</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstimateSheet; 