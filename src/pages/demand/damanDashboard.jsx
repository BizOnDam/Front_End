import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { statsData, quoteData, contractData, historyData } from '../../data/demandDashboardData';
import { supplierDetailData } from '../../data/supplierData';

function DamanDashboard() {
  const [stats] = useState(statsData);
  const companyName = "(주)비즈온담"; // 임시 하드코딩

  const maxRows = 3;
  // 공급기업 (상위 3개만, 평가점수 높은순)
  const suppliersToShow = [...supplierDetailData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, maxRows);
  while (suppliersToShow.length < maxRows) suppliersToShow.push(null);
  // 견적
  const quotesToShow = [...quoteData];
  while (quotesToShow.length < maxRows) quotesToShow.push(null);
  // 계약
  const contractsToShow = [...contractData];
  while (contractsToShow.length < maxRows) contractsToShow.push(null);
  // 이력
  const historiesToShow = [...historyData];
  while (historiesToShow.length < maxRows) historiesToShow.push(null);

  return (
    <div>
      {/* Main Content */}
      <div style={{ backgroundColor: '#e9eff6', minHeight: 'calc(100vh - 56px)' }}>
        <div className="container py-4">
          <h2 className="mb-4"><span className="text-primary">{companyName}</span> 수요 서비스 대시보드</h2>

          {/* 1. 전체 거래 현황 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">전체 거래 현황</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3">
                  <h3 className="text-primary">{stats.totalTransactions}</h3>
                  <p className="text-muted">전체 거래 건수</p>
                </div>
                <div className="col-md-3">
                  <h3 className="text-success">{stats.activeContracts}</h3>
                  <p className="text-muted">진행중인 계약</p>
                </div>
                <div className="col-md-3">
                  <h3 className="text-warning">{stats.pendingQuotes}</h3>
                  <p className="text-muted">대기중인 견적</p>
                </div>
                <div className="col-md-3">
                  <h3 className="text-info">{stats.completedDeliveries}</h3>
                  <p className="text-muted">완료된 납품</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. 공급 기업 조회 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">공급 기업 조회</h5>
              <Link to="/demand/suppliersList" className="btn btn-outline-primary btn-sm">전체보기</Link>
            </div>
            <div className="card-body">
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
                    {suppliersToShow.map((supplier, idx) => (
                      supplier ? (
                        <tr key={supplier.businessNumber}>
                          <td>{supplier.name}</td>
                          <td>{supplier.businessNumber}</td>
                          <td>{supplier.mainItems}</td>
                          <td>{supplier.rating}/5.0</td>
                          <td>
                            <Link to={`/demand/supplier/${supplier.businessNumber}`} className="btn btn-sm btn-outline-primary">보기</Link>
                          </td>
                        </tr>
                      ) : (
                        <tr key={`empty-supplier-${idx}`}>
                          <td colSpan={5}>&nbsp;</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 3. 견적 관리 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">견적 관리</h5>
              <Link to="/estimate" className="btn btn-outline-primary btn-sm">상세보기</Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>견적번호</th>
                      <th>품목</th>
                      <th>요청일</th>
                      <th>마감일</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotesToShow.map((quote, idx) => (
                      quote ? (
                        <tr key={quote.id}>
                          <td>{quote.id}</td>
                          <td>{quote.item}</td>
                          <td>{quote.requestDate}</td>
                          <td>{quote.dueDate}</td>
                          <td><span className={`badge bg-${quote.status === '완료' ? 'success' : quote.status === '검토중' ? 'info' : 'warning'}`}>{quote.status}</span></td>
                        </tr>
                      ) : (
                        <tr key={`empty-quote-${idx}`}>
                          <td colSpan={6}>&nbsp;</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 4. 진행 중인 계약/납품 일정 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">진행 중인 계약/납품 일정</h5>
              <Link to="/contracts" className="btn btn-outline-primary btn-sm">상세보기</Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>계약번호</th>
                      <th>공급기업</th>
                      <th>품목</th>
                      <th>계약금액</th>
                      <th>납품예정일</th>
                      <th>진행상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contractsToShow.map((contract, idx) => (
                      contract ? (
                        <tr key={contract.id}>
                          <td>{contract.id}</td>
                          <td>{contract.supplier}</td>
                          <td>{contract.item}</td>
                          <td>{contract.amount}</td>
                          <td>{contract.deliveryDate}</td>
                          <td><span className={`badge bg-${contract.status === '진행중' ? 'info' : contract.status === '검수중' ? 'warning' : 'primary'}`}>{contract.status}</span></td>
                        </tr>
                      ) : (
                        <tr key={`empty-contract-${idx}`}>
                          <td colSpan={6}>&nbsp;</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 5. 거래 이력 및 후기 작성 */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">거래 이력 및 후기 작성</h5>
              <Link to="/demand/history" className="btn btn-outline-primary btn-sm">상세보기</Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>계약번호</th>
                      <th>공급기업</th>
                      <th>품목</th>
                      <th>계약금액</th>
                      <th>완료일</th>
                      <th>후기작성</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historiesToShow.map((history, idx) => (
                      history ? (
                        <tr key={history.id}>
                          <td>{history.id}</td>
                          <td>{history.supplier}</td>
                          <td>{history.item}</td>
                          <td>{history.amount}</td>
                          <td>{history.completionDate}</td>
                          <td>
                            <button className={`btn btn-sm ${history.hasReview ? 'btn-secondary' : 'btn-outline-primary'}`} disabled={history.hasReview}>
                              {history.hasReview ? '작성완료' : '작성하기'}
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={`empty-history-${idx}`}>
                          <td colSpan={6}>&nbsp;</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DamanDashboard; 