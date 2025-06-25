import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useService } from '../../contexts/ServiceContext';
import { useAuth } from '../../contexts/AuthContext'; 
import { getTopSuppliers } from './DashboardProcess';
import { useDashboardStats } from '../../hooks/dashboard/useDashboardStats';
import { useEstimateData } from '../../hooks/estimate/useEstimateData';
import { useContracts } from '../../hooks/contract/useContracts';
import { useContractHistory } from '../../hooks/contract/useContractHistory';
import { formatCurrency } from '../../utils/contractUtils';
import { ESTIMATE_STATUS } from '../../constants/estimateStatus';
import LoadingOrError from '../../components/LoadingOrError'; 

const Dashboard = () => {
  const { serviceType } = useService();
  const { user } = useAuth();
  const { stats, loading, error } = useDashboardStats(user?.companyId);
  const { estimates, loading: estimateLoading, error: estimateError } = useEstimateData();
  const { contracts } = useContracts(user, serviceType);
  const { contracts: historyData, loading: historyLoading, error: historyError } = useContractHistory(user?.companyId);

  console.log('Dashboard user:', user);
  console.log('Dashboard serviceType:', serviceType);

  // 최근 견적 이력 필터링
  const recentEstimates = [...estimates]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 3); // 상위 3개만

  // 진행중 계약만 필터링
  const currentContracts = (contracts || [])
    .slice(0, 3); // 상위 3개만

    // 최근 견적 이력 필터링
  const recentContracts = [...historyData]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 3); // 상위 3개만

  const maxRows = 3;
  const emptyRows = Array(maxRows - recentEstimates.length).fill(null);
  const emptyContractRows = Array(maxRows - currentContracts.length).fill(null);
  const emptyHistoryRows = Array(maxRows - recentContracts.length).fill(null);

  // 공급기업 (상위 3개만, 평가점수 높은순)
  const suppliersToShow = getTopSuppliers(maxRows);

  // 로딩 또는 에러 처리
  const isLoading = loading || estimateLoading || historyLoading;
  const hasError = error || estimateError || historyError;
  const loadingOrError = <LoadingOrError loading={isLoading} error={hasError} />;
  if (isLoading || hasError) return loadingOrError;

  return (
    <div className="container-fluid py-4">
      <h2 className="mb-4">{serviceType === 'supplier' ? '공급' : '수요'} 서비스 대시보드</h2>
      
      {/* 전체 거래 현황 */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title mb-4">전체 거래 현황</h5>
          <div className="row text-center">
            <div className="col-md-3">
              <h3 className="text-primary">{stats?.totalContracts ?? 0}</h3>
              <p className="text-muted">전체 거래 건수</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-success">{stats?.inProgressContracts ?? 0}</h3>
              <p className="text-muted">진행중인 계약</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-warning">{stats?.pendingEstimates ?? 0}</h3>
              <p className="text-muted">대기중인 견적</p>
            </div>
            <div className="col-md-3">
              <h3 className="text-info">{stats?.completedContracts ?? 0}</h3>
              <p className="text-muted">완료된 납품</p>
            </div>
          </div>
        </div>
      </div>

      {/* 공급 기업 조회 (수요 서비스에서만 표시) */}
      {serviceType === 'buyer' && (
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
                {recentEstimates.map(quote => (
                  <tr key={quote.request.request_id}>
                    <td>{quote.request.request_id}</td>
                    <td>{quote.request.detail}</td>
                    <td>{quote.request.created_at}</td>
                    <td>{quote.request.due_date}</td>
                    <td>
                      <span className={`badge bg-${ESTIMATE_STATUS[quote.request.status]?.badgeColor || 'secondary'}`}>
                        {ESTIMATE_STATUS[quote.request.status]?.label || '알수없음'}
                      </span>
                    </td>
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
            <Link to="/contracts" className="btn btn-outline-primary">더보기</Link>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>계약번호</th>
                  <th>{serviceType === 'supplier' ? '수요기업' : '공급기업'}</th>
                  <th>품목</th>
                  <th>계약금액</th>
                  <th>계약체결일</th>
                  <th>납품기한</th>
                </tr>
              </thead>
              <tbody>
                {currentContracts.map(contract => (
                    <tr key={contract.contractId}>
                      <td>{contract.contractId}</td>
                      <td>{contract.supplierCompanyId}</td>
                      <td>
                        {contract.itemNames?.join(', ').length > 10 
                        ? contract.itemNames.join(', ').substring(0, 10) + '...'
                        : contract.itemNames.join(', ')}
                      </td>
                      <td>{formatCurrency(contract.totalPrice)}</td>
                      <td>{contract.contractDate}</td>
                      <td>{contract.dueDate}</td>
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
            <Link to="/history" className="btn btn-outline-primary">더보기</Link>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>계약번호</th>
                  <th>계약내용</th>
                  <th>계약일자</th>
                  <th>계약금액</th>
                </tr>
              </thead>
              <tbody>
                {recentContracts.map(history => (
                  <tr key={history.contractId}>
                    <td>{history.contractId}</td>
                    <td>{history.details}</td>
                    <td>{history.contractDate}</td>
                    <td>{history.totalPrice}</td>
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


