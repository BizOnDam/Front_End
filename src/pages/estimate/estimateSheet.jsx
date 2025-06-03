import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  categories,
  createInitialItem,
  handleCategoryChange,
  handleDetailCategoryChange,
  handleItemChange,
  addItem,
  removeItem,
  handleSubmit
} from './processEstimateSheet';

function EstimateSheet() {
  const [items, setItems] = useState([createInitialItem(1)]);
  const [form, setForm] = useState({
    due_date: '',
    detail: ''
  });
  const [selectedDetailCategories, setSelectedDetailCategories] = useState({});

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <h2 className="mb-4">견적 요청서 작성</h2>
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e, items, form)}>
              {items.map((item, index) => (
                <div key={item.id} className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">품목 {index + 1}</h5>
                    {items.length > 1 && (
                      <button 
                        type="button" 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeItem(item.id, items, setItems, setSelectedDetailCategories)}
                      >
                        삭제
                      </button>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">품명</label>
                      <select 
                        className="form-select" 
                        value={item.category_code} 
                        onChange={(e) => handleCategoryChange(item.id, e.target.value, items, setItems, setSelectedDetailCategories)}
                        required
                      >
                        <option value="">품명을 선택하세요</option>
                        {categories.map(category => (
                          <option key={category.code} value={category.code}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">세부품명</label>
                      <select 
                        className="form-select" 
                        value={item.detail_category_code} 
                        onChange={(e) => handleDetailCategoryChange(item.id, e.target.value, items, setItems, selectedDetailCategories)}
                        required
                        disabled={!item.category_code}
                      >
                        <option value="">세부품명을 선택하세요</option>
                        {selectedDetailCategories[item.id]?.map(category => (
                          <option key={category.code} value={category.code}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">수량</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={item.quantity} 
                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value, items, setItems)}
                        required 
                      />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label">품목 규격</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={item.specification} 
                        onChange={(e) => handleItemChange(item.id, 'specification', e.target.value, items, setItems)}
                        placeholder="예: 개, kg, m 등"
                        required 
                      />
                    </div>

                  </div>
                </div>
              ))}

              <div className="mb-3">
                <button 
                  type="button" 
                  className="btn btn-outline-primary"
                  onClick={() => addItem(items, setItems)}
                >
                  + 품목 추가
                </button>
              </div>

              <div className="mb-3">
                <label className="form-label">납품기한</label>
                <input 
                  type="date" 
                  className="form-control" 
                  name="due_date" 
                  value={form.due_date} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">요청상세설명</label>
                <textarea 
                  className="form-control" 
                  name="detail" 
                  value={form.detail} 
                  onChange={handleFormChange} 
                  placeholder="견적 요청에 대한 상세 설명을 입력해주세요"
                  rows="4"
                  required
                ></textarea>
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