import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEstimateForm } from '../../hooks/estimate/useEstimateForm';
import { useAuth } from '../../contexts/AuthContext';

function EstimateSheet() {
  const { user } = useAuth(); 
  console.log("EstimateSheet", user);
  const navigate = useNavigate();
  const onSuccess = (requestId) => navigate(`/demand/matching/${requestId}`);

    const {
    form, items, categories, loading, error, selectedDetailCategories,
    handleFormChange, 
    handleCategoryChange, 
    handleDetailCategoryChange,
    handleItemChange, 
    addItem, 
    removeItem, 
    handleSubmit
  } = useEstimateForm(onSuccess);


  if (loading) {
    return (
      <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
        <div className="container py-4">
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <h2 className="mb-4">견적 요청서 작성</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card shadow-sm mb-4">
          <div className="card-body">
             <form onSubmit={handleSubmit}>
              {items.map((item, index) => (
                <div key={item.id} className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="mb-0">품목 {index + 1}</h5>
                    {items.length > 1 && (
                      <button 
                        type="button" 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeItem(item.id)}
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
                        value={item.category_name} 
                        onChange={e => handleCategoryChange(item.id, e.target.value)}
                        required
                      >
                        <option value="">품명을 선택하세요</option>
                        {Array.isArray(categories) && categories.map((categoryName) => (
                          <option key={categoryName} value={categoryName}>
                            {categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">세부품명</label>
                      <select 
                        className="form-select" 
                        value={item.detail_category_name} 
                        onChange={(e) =>
                          handleDetailCategoryChange(item.id, e.target.value)
                        }
                        required
                        disabled={!item.category_name}
                      >
                        <option value="">세부품명을 선택하세요</option>
                        {Array.isArray(selectedDetailCategories[item.id]) && 
                          selectedDetailCategories[item.id].map(detail => (
                            <option key={detail.productId} value={detail.detailCategoryName}>
                              {detail.detailCategoryName}
                            </option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">수량</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        value={item.quantity} 
                        onChange={(e) =>
                          handleItemChange(item.id, 'quantity', e.target.value)
                        }
                        required 
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">품목 규격</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        value={item.specification} 
                        onChange={(e) =>
                          handleItemChange(item.id, 'specification', e.target.value)
                        }
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
                  onClick={addItem}
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
                <button className="btn btn-primary px-5" type="submit" disabled={loading}>
                  {loading ? '요청 중...' : '견적 요청'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EstimateSheet;
