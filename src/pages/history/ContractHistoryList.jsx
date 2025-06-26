import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../contexts/AuthContext';
import { useContractHistory } from '../../hooks/contract/useContractHistory';
import { formatCurrency } from '../../utils/dateUtils';
import LoadingOrError from '../../components/LoadingOrError';

const HistoryList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { contracts, loading, error } = useContractHistory(user?.companyId);

  // status 값 확인용 로그
  console.log('contracts:', contracts);

  const handleDetailClick = (contractId) => {
    navigate(`/historyDetail/${contractId}`);
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">거래 이력</h2>

      <LoadingOrError loading={loading} error={error} />
      {!loading && !error && (
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>계약번호</th>
                    <th>계약내용</th>
                    <th>계약일자</th>
                    <th>계약금액</th>
                    <th>상태</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(contracts) && contracts.length > 0 ? (
                    contracts
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((contract) => {
                        let badgeClass = 'bg-danger';
                        let statusText = '미체결';
                        if (String(contract.status) === '1') {
                          badgeClass = 'bg-success';
                          statusText = '진행중';
                        } else if (String(contract.status) === '2') {
                          badgeClass = 'bg-primary';
                          statusText = '거래완료';
                        }
                        return (
                          <tr key={contract.contractId}>
                            <td>{`${contract.contractId}`}</td>
                            <td>{contract.details}</td>
                            <td>{contract.contractDate}</td>
                            <td>{formatCurrency(contract.totalPrice)}</td>
                            <td>
                              <span className={`badge ${badgeClass}`}>{statusText}</span>
                            </td>
                            <td>
                              <button 
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleDetailClick(contract.contractId)}
                              >
                                상세보기
                              </button>
                            </td>
                          </tr>
                        );
                      })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">거래 이력이 없습니다.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {Array.isArray(contracts) && contracts.length > 0 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex align-items-center">
                  <label className="me-2">페이지당 행 수:</label>
                  <select 
                    className="form-select form-select-sm" 
                    style={{ width: 'auto' }}
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value, 10));
                      setPage(0);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                  </select>
                </div>
                <Pagination
                  currentPage={page + 1}
                  totalPages={Math.ceil(contracts.length / rowsPerPage)}
                  onPageChange={(newPage) => setPage(newPage - 1)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
