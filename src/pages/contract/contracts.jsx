import { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Pagination from '../../components/Pagination';
import ContractDetailModal from './ContractDetailModal';
import { 
  getEventsForDate, 
  getSortedContracts, 
  getPaginationData, 
  formatCurrency,
  handleViewContract,
  handleDownloadContract,
  fetchContractDetail
} from './ProcessContracts';

// 달력 커스텀 스타일
const calendarStyles = `
  .react-calendar__tile--now {
    background: #e3f2fd !important;
    color: #000 !important;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #bbdefb !important;
  }
  .react-calendar__tile {
    height: 60px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
  }
  .react-calendar__tile abbr {
    position: absolute !important;
    top: 30% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
  }
`;

function Contracts({ userType, user }) {
  const [contracts, setContracts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        console.log("보낼 params", { user });
        const date = null; // 또는 selectedDate를 포맷팅해서 필터링
        const response = await axios.get('http://localhost:8083/api/contracts/list', {
          params: {
            userId: user?.userId,
            companyId: user?.companyId,
            role: user?.role,
            ...(date ? { date: date.toISOString().split('T')[0] } : {}),
          },
        });
        console.log("계약 리스트 데이터:", response.data.data);

        setContracts(response.data.data); // 혹시 응답 구조가 다르면 조정 필요
      } catch (error) {
        console.error('계약 정보 불러오기 실패:', error);
        if (error.response) {
          console.error("에러 응답 데이터:", error.response.data);
          console.error("에러 상태 코드:", error.response.status);
          console.error("에러 헤더:", error.response.headers);
        }
      }
    };

    fetchContracts();
  }, [user, userType]);

  // 달력 타일 렌더링 커스터마이징
  const tileContent = ({ date }) => {
    const events = getEventsForDate(date, contracts);
    if (events.length > 0) {
      return (
        <div style={{ height: '10%'}}>
          <div style={{ 
            fontSize: '15px',
            color: events[0].type === '계약체결' ? '#0d6efd' : '#198754',
            fontWeight: 'bold'
          }}>
            ●
            </div>
        </div>
      );
    }
    return null;
  };

  // 선택된 날짜의 이벤트 표시
  const selectedDateEvents = getEventsForDate(selectedDate, contracts);

  const handleViewDetail = async (contract) => {
    setDetailLoading(true);
    setDetailError(null);
    try {
      const detail = await fetchContractDetail(contract.requestId, contract.responseId);
      setSelectedContract(detail);
      setShowModal(true);
    } catch (e) {
      setDetailError('상세 정보를 불러오지 못했습니다.');
    } finally {
      setDetailLoading(false);
    }
  };

  // 마감일 기준으로 정렬된 계약 목록
  const sortedContracts = getSortedContracts(contracts);

  // 페이지네이션 관련 계산
  const { totalPages, currentContracts } = getPaginationData(sortedContracts, currentPage, itemsPerPage);

  const handlePageChange = (pageNumber) => { setCurrentPage(pageNumber); };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <style>{calendarStyles}</style>
      <div className="container py-4">
        <h2 className="mb-4">계약/납품 일정</h2>

        {/* 1. 거래 일정 (달력) */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-white">
            <h5 className="mb-0">거래 일정</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-8">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileContent={tileContent}
                  locale="ko-KR"
                  className="w-100 border-0"
                />
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">{selectedDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })} 일정</h6>
                  </div>
                  <div className="card-body">
                    {selectedDateEvents.length === 0 ? (
                      <p className="text-muted">해당 날짜의 일정이 없습니다.</p>
                    ) : (
                      <ul className="list-unstyled">
                        {selectedDateEvents.map((event, index) => (
                          <li key={index} className="mb-2">
                            <div className="d-flex align-items-center">
                              <span className={`badge bg-${
                                event.type === '계약체결' ? 'primary' : 'success'
                              } me-2`}>
                                {event.type}
                              </span>
                              <span>{event.title}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 계약 목록 */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>계약번호</th>
                    <th>공급기업</th>
                    <th>품목</th>
                    <th>계약금액</th>
                    <th>계약체결일</th>
                    <th>납품기한</th>
                    <th></th>
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
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleViewDetail(contract)}>
                            상세보기
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>

        {/* 계약 상세 모달 */}
        <ContractDetailModal
          showModal={showModal}
          selectedContract={selectedContract}
          onClose={() => setShowModal(false)}
          onViewContract={handleViewContract}
          onDownloadContract={handleDownloadContract}
          loading={detailLoading}
          error={detailError}
        />
      </div>
    </div>
  );
}

export default Contracts; 