import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supplierDetailData } from '../../data/supplierData';
import 'bootstrap/dist/css/bootstrap.min.css';

function SuppliersList() {
  const [search, setSearch] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState('score-desc'); // score-desc, score-asc, name-asc, name-desc
  const [mainItem, setMainItem] = useState('');

  // 주요 품목 목록 추출 (중복 제거)
  const mainItems = Array.from(new Set(supplierDetailData.map(s => s.mainItems)));

  // 검색/필터/정렬 적용
  let filtered = supplierDetailData.filter(supplier =>
    (supplier.name.includes(keyword) || supplier.businessNumber.includes(keyword)) &&
    (mainItem === '' || supplier.mainItems === mainItem)
  );
  filtered = filtered.sort((a, b) => {
    if (sort === 'score-desc') return b.rating - a.rating;
    if (sort === 'score-asc') return a.rating - b.rating;
    if (sort === 'name-asc') return a.name.localeCompare(b.name, 'ko');
    if (sort === 'name-desc') return b.name.localeCompare(a.name, 'ko');
    return 0;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(search.trim());
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <div className="container py-4">
        <h2 className="mb-4">공급기업 전체 목록</h2>
        <div className="card shadow-sm">
          <div className="card-body">
            <form className="mb-3" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="기업명 또는 사업자등록번호로 검색"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">검색</button>
              </div>
            </form>
            {/* 정렬/필터 UI */}
            <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
              <div>
                <label className="me-2">정렬:</label>
                <select className="form-select d-inline-block w-auto" value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="score-desc">평가점수 높은순</option>
                  <option value="score-asc">평가점수 낮은순</option>
                  <option value="name-asc">기업명 가나다순</option>
                  <option value="name-desc">기업명 다나가순</option>
                </select>
              </div>
              <div>
                <label className="me-2">주요 품목:</label>
                <select className="form-select d-inline-block w-auto" value={mainItem} onChange={e => setMainItem(e.target.value)}>
                  <option value="">전체</option>
                  {mainItems.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>기업명</th>
                    <th>사업자등록번호</th>
                    <th>주요 품목</th>
                    <th>평가점수</th>
                    <th>상세보기</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={5} className="text-center text-muted">검색 결과가 없습니다.</td></tr>
                  ) : (
                    filtered.map(supplier => (
                      <tr key={supplier.businessNumber}>
                        <td>{supplier.name}</td>
                        <td>{supplier.businessNumber}</td>
                        <td>{supplier.mainItems}</td>
                        <td>{supplier.rating}/5.0</td>
                        <td>
                          <Link to={`/demand/supplier/${supplier.businessNumber}`} className="btn btn-sm btn-outline-primary">상세보기</Link>
                        </td>
                      </tr>
                    ))
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

export default SuppliersList; 