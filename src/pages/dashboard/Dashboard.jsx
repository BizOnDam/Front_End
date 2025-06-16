import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getInitialStatsData, getInitialQuoteData, getInitialContractData, getInitialHistoryData, getTopSuppliers } from './DashboardProcess';

const Dashboard = ({ userType, user }) => {
  console.log('Dashboard user:', user); // user prop 값 확인을 위한 console.log
  const [statsData, setStatsData] = useState({
    totalTransactions: 0,
    activeContracts: 0,
    pendingQuotes: 0,
    completedDeliveries: 0
  });

  const [quoteData, setQuoteData] = useState([]);
  const [contractData, setContractData] = useState([]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (!user?.companyId) return;

    // TODO: API 연동 전까지는 mock 데이터 사용
    setStatsData(getInitialStatsData());
    setQuoteData(getInitialQuoteData());
    setContractData(getInitialContractData());
    setHistoryData(getInitialHistoryData());
  }, [user]);

  const maxRows = 3;
  const emptyRows = Array(maxRows - quoteData.length).fill(null);
  const emptyContractRows = Array(maxRows - contractData.length).fill(null);
  const emptyHistoryRows = Array(maxRows - historyData.length).fill(null);

  // 공급기업 (상위 3개만, 평가점수 높은순)
  const suppliersToShow = getTopSuppliers(maxRows);

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">{userType === 'supplier' ? '공급' : '수요'} 서비스 대시보드</h2>
      
      {/* 전체 거래 현황 */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-4">전체 거래 현황</h5>
          <div className="row text-center">
            <div className="col-md-3">
              <h3 className="text-primary">{statsData.totalTransactions}</h3>
              <p className="text-muted">전체 거래 건수</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-success">{statsData.activeContracts}</h3>
              <p className="text-muted">진행중인 계약</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-warning">{statsData.pendingQuotes}</h3>
              <p className="text-muted">대기중인 견적</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-info">{statsData.completedDeliveries}</h3>
              <p className="text-muted">완료된 납품</p>
            </div>
          </div>
        </div>
      </div>

      {/* 공급 기업 조회 (수요 서비스에서만 표시) */}
      {userType === 'demand' && (
        <div className="card mb-4">
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
                        <td>
                          <Link to={`/demand/supplier/${supplier.businessNumber}`} className="btn btn-sm btn-outline-primary">보기</Link>
                        </td>
                      </tr>
                    ) : (
                      <tr key={`empty-supplier-${idx}`}>
                        <td colSpan={4}>&nbsp;</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 견적 관리 */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="card-title mb-0">견적 관리</h5>
            <Link 
              to={`/estimateList?companyId=${user?.companyId}`}
              className="btn btn-outline-primary"
            >
              더보기
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>견적명</th>
                  <th>요청일</th>
                  <th>마감일</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {quoteData.map(quote => (
                  <tr key={quote.id}>
                    <td>{quote.id}</td>
                    <td>{quote.title}</td>
                    <td>{quote.date}</td>
                    <td>{quote.dueDate}</td>
                    <td><span className={`badge bg-${quote.status === '완료' ? 'success' : quote.status === '검토중' ? 'info' : 'warning'}`}>{quote.status}</span></td>
                  </tr>
                ))}
                {emptyRows.map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td colSpan="5" className="text-center text-muted">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 진행중인 계약/납품 일정 */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="card-title mb-0">진행중인 계약/납품 일정</h5>
            <Link to={userType === 'supplier' ? "/supplier/contract" : "/contracts"} className="btn btn-outline-primary">더보기</Link>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>{userType === 'supplier' ? '수요기업' : '공급기업'}</th>
                  <th>계약명</th>
                  <th>계약금액</th>
                  <th>납품일</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {contractData.map(contract => (
                  <tr key={contract.id}>
                    <td>{contract.id}</td>
                    <td>{contract.company}</td>
                    <td>{contract.title}</td>
                    <td>{contract.amount}</td>
                    <td>{contract.date}</td>
                    <td><span className={`badge bg-${contract.status === '진행중' ? 'info' : contract.status === '검수중' ? 'warning' : 'primary'}`}>{contract.status}</span></td>
                  </tr>
                ))}
                {emptyContractRows.map((_, index) => (
                  <tr key={`empty-contract-${index}`}>
                    <td colSpan="6" className="text-center text-muted">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 거래 이력 */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="card-title mb-0">거래 이력</h5>
            <Link to={userType === 'supplier' ? "/supplier/history" : "/history"} className="btn btn-outline-primary">더보기</Link>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>{userType === 'supplier' ? '수요기업' : '공급기업'}</th>
                  <th>계약명</th>
                  <th>계약금액</th>
                  <th>완료일</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map(history => (
                  <tr key={history.id}>
                    <td>{history.id}</td>
                    <td>{history.company}</td>
                    <td>{history.title}</td>
                    <td>{history.amount}</td>
                    <td>{history.date}</td>
                  </tr>
                ))}
                {emptyHistoryRows.map((_, index) => (
                  <tr key={`empty-history-${index}`}>
                    <td colSpan="5" className="text-center text-muted">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


