import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../../contexts/AuthContext';
import { useService } from '../../contexts/ServiceContext';
import { useContracts } from '../../hooks/contract/useContracts';
import ContractDetailModal from './ContractDetailModal';
import Pagination from '../../components/Pagination';
import { getEventsForDate, getSortedContracts, getPaginationData, } from '../../utils/contractUtils';
import { fetchContractDetail } from '../../api/contractApi';
import { formatCurrency } from '../../utils/dateUtils';

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

function Contracts() {
  const { user } = useAuth();
  const { serviceType } = useService();
  const { contracts } = useContracts(user, serviceType);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const selectedDateEvents = getEventsForDate(selectedDate, contracts);
  const sortedContracts = getSortedContracts(contracts);
  const { totalPages, currentContracts } = getPaginationData(sortedContracts, currentPage, itemsPerPage);

  const handleViewDetail = async (contract) => {
    setDetailLoading(true);
    console.log("handleViewDetail", contract);
    try {
      const detail = await fetchContractDetail(contract.requestId, contract.responseId);
      setSelectedContract(detail);
      setShowModal(true);
    } catch {
      setDetailError('상세 정보를 불러오지 못했습니다.');
    } finally {
      setDetailLoading(false);
    }
  };

  // 달력에 점 찍는 함수
  const tileContent = ({ date }) => {
    const events = getEventsForDate(date, contracts);
    if (events.length > 0) {
      return (
        <div style={{ height: '10%' }}>
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

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
      <style>{calendarStyles}</style>
      <div className="container py-4">
        <h2 className="mb-4">계약/납품 일정</h2>

        {/* 달력 */}
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
                    <h6 className="mb-0">
                      {selectedDate.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} 일정
                    </h6>
                  </div>
                  <div className="card-body">
                    {selectedDateEvents.length === 0 ? (
                      <p className="text-muted">해당 날짜의 일정이 없습니다.</p>
                    ) : (
                      <ul className="list-unstyled">
                        {selectedDateEvents.map((event, index) => (
                          <li
                            key={index}
                            className="mb-2"
                            role="button"
                            onClick={() => {
                              const matched = contracts.find(c => c.contractId === event.contractId);
                              console.log("requestId:", matched?.requestId);
                              console.log("responseId:", matched?.responseId);
                              if (matched) handleViewDetail(matched);
                            }}
                          >
                            <div className="d-flex align-items-center">
                              <span className={`badge bg-${event.type === '계약체결' ? 'primary' : 'success'} me-2`}>
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

        {/* 테이블 */}
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
                      <td>{contract.itemNames?.join(', ')}</td>
                      <td>{formatCurrency(contract.totalPrice)}</td>
                      <td>{contract.contractDate}</td>
                      <td>{contract.dueDate}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleViewDetail(contract)}>
                          상세보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </div>
        </div>

        <ContractDetailModal
          showModal={showModal}
          selectedContract={selectedContract}
          onClose={() => setShowModal(false)}
          loading={detailLoading}
          error={detailError}
        />
      </div>
    </div>
  );
}

export default Contracts;
