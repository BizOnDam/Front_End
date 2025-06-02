import { useState } from 'react';
import Calendar from 'react-calendar';
import { FaFileContract, FaFileDownload, FaTruck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { contractsData, estimateRequestsData, estimateResponsesData } from '../data/contractsData';

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
`;

function Contracts() {
  const [contracts] = useState(contractsData);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  // 견적 요청에서 마감일 가져오기
  const getDueDate = (contract) => {
    const estimateResponse = estimateResponsesData.find(
      response => response.response_id === contract.response_id
    );
    if (!estimateResponse) return contract.contract_date;
  
    const estimateRequest = estimateRequestsData.find(
      request => request.request_id === estimateResponse.request_id
    );
    return estimateRequest ? estimateRequest.due_date : contract.contract_date;
  };
  

  // 달력에 표시할 이벤트 데이터 생성
  const getEventsForDate = (date) => {
    const events = [];
    
    // 계약 데이터에서 이벤트 추가
    contracts.forEach(contract => {
      const dueDate = getDueDate(contract);
      if (new Date(dueDate).toDateString() === date.toDateString()) {
        events.push({
          type: '계약',
          title: `${contract.supplier_company_name} - ${contract.item_description}`,
          date: dueDate,
          status: contract.status
        });
      }
    });

    return events;
  };

  // 달력 타일 렌더링 커스터마이징
  const tileContent = ({ date }) => {
    const events = getEventsForDate(date);
    if (events.length > 0) {
      return (
        <div className="calendar-event-dot" style={{ 
          color: events[0].type === '계약' ? '#0d6efd' : '#198754'
        }}>
          ●
        </div>
      );
    }
    return null;
  };

  // 선택된 날짜의 이벤트 표시
  const selectedDateEvents = getEventsForDate(selectedDate);

  const getStatusBadge = (status) => {
    const statusMap = {
      'PREPARING_DELIVERY': { text: '배송 준비중', color: 'warning' },
      'DELIVERING': { text: '배송중', color: 'info' },
      'DELIVERED': { text: '배송완료', color: 'success' },
      'CANCELLED': { text: '취소됨', color: 'danger' }
    };
    const { text, color } = statusMap[status] || { text: status, color: 'secondary' };
    return <span className={`badge bg-${color}`}>{text}</span>;
  };

  const handleViewContract = (contractId) => {
    // TODO 전자계약 보기 기능 구현
    console.log('View contract:', contractId);
  };

  const handleDownloadOrder = (contractId) => {
    // TODO 발주서 다운로드 기능 구현
    console.log('Download order:', contractId);
  };

  const handleViewDetail = (contract) => {
    setSelectedContract(contract);
    setShowModal(true);
  };

  // 마감일 기준으로 정렬된 계약 목록
  const sortedContracts = [...contracts].sort((a, b) => {
    const dateA = new Date(getDueDate(a));
    const dateB = new Date(getDueDate(b));
    return dateB - dateA;
  });

  // 페이지네이션 관련 계산
  const totalPages = Math.ceil(sortedContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContracts = sortedContracts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
                                event.type === '계약' ? 'primary' : 'success'
                              } me-2`}>
                                {event.type}
                              </span>
                              <span>{event.title}</span>
                            </div>
                            <small className="text-muted d-block mt-1">상태: {getStatusBadge(event.status)}</small>
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
                    <th>마감일</th>
                    <th>배송상태</th>
                    <th>작업</th>
                  </tr>
                </thead>
                <tbody>
                  {currentContracts.map(contract => (
                    <tr key={contract.contract_id}>
                      <td>{contract.contract_id}</td>
                      <td>{contract.supplier_company_name}</td>
                      <td>{contract.item_description}</td>
                      <td>{formatCurrency(contract.total_price)}</td>
                      <td>{getDueDate(contract)}</td>
                      <td>{getStatusBadge(contract.status)}</td>
                      <td>
                        <div className="btn-group">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleViewDetail(contract)}
                          >
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
              <div className="d-flex justify-content-center mt-4">
                <nav aria-label="Page navigation">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <FaChevronLeft />
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <FaChevronRight />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* 계약 상세 모달 */}
        {showModal && selectedContract && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">계약 상세 정보</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6>기본 정보</h6>
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <th>계약번호</th>
                            <td>{selectedContract.contract_id}</td>
                          </tr>
                          <tr>
                            <th>공급업체</th>
                            <td>{selectedContract.supplier_company_name}</td>
                          </tr>
                          <tr>
                            <th>마감일</th>
                            <td>{getDueDate(selectedContract)}</td>
                          </tr>
                          <tr>
                            <th>계약금액</th>
                            <td>{formatCurrency(selectedContract.total_price)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <h6>배송 정보</h6>
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <th>배송상태</th>
                            <td>{getStatusBadge(selectedContract.status)}</td>
                          </tr>
                          <tr>
                            <th>운송장번호</th>
                            <td>{selectedContract.tracking_number || '-'}</td>
                          </tr>
                          <tr>
                            <th>견적 응답 ID</th>
                            <td>{selectedContract.response_id}</td>
                          </tr>
                          <tr>
                            <th>계약서 파일</th>
                            <td>
                              {selectedContract.contract_file_url ? (
                                <a href={selectedContract.contract_file_url} target="_blank" rel="noopener noreferrer">
                                  계약서 보기
                                </a>
                              ) : '-'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <h6>계약 품목</h6>
                  <div className="card">
                    <div className="card-body">
                      <p className="mb-0">{selectedContract.item_description}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => handleViewContract(selectedContract.contract_id)}
                  >
                    <FaFileContract className="me-2" />
                    전자계약 보기
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success"
                    onClick={() => handleDownloadOrder(selectedContract.contract_id)}
                  >
                    <FaFileDownload className="me-2" />
                    발주서 다운로드
                  </button>
                  {selectedContract.status === 'DELIVERING' && (
                    <button 
                      type="button" 
                      className="btn btn-info"
                      onClick={() => window.open(`https://tracking.example.com/${selectedContract.tracking_number}`, '_blank')}
                    >
                      <FaTruck className="me-2" />
                      배송추적
                    </button>
                  )}
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 모달 배경 */}
        {showModal && (
          <div className="modal-backdrop fade show"></div>
        )}
      </div>
    </div>
  );
}

export default Contracts; 