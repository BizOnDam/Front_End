import React, { useState } from 'react';
import { mockEstimateRequests } from '../../data/MockEstimateList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { getContractStatus } from '../../constants/estimateStatus';

const HistoryList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const contracts = mockEstimateRequests
    .filter(request => request.contract || request.request.status === 4)
    .map(request => {
      const status = getContractStatus(request.contract);
      return {
        requestId: request.request.request_id,
        contractId: request.contract?.contract_id,
        contractNumber: request.contract ? `CT-${request.contract.contract_id}` : `REQ-${request.request.request_id}`,
        clientName: request.request.detail,
        contractDate: request.contract?.created_at || request.request.created_at,
        amount: request.response?.total_price ? `${request.response.total_price.toLocaleString()}원` : '-',
        status: status.label,
        statusColor: status.badgeColor
      };
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDetailClick = (requestId, contractId) => {
    if (contractId) {
      navigate(`/historyDetail/${contractId}`);
    } else {
      navigate(`/estimate/${requestId}`);
    }
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">거래 이력</h2>
      
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
                {contracts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((contract) => (
                    <tr key={contract.requestId}>
                      <td>{contract.contractNumber}</td>
                      <td>{contract.clientName}</td>
                      <td>{contract.contractDate}</td>
                      <td>{contract.amount}</td>
                      <td>
                        <span className={`badge bg-${contract.statusColor}`}>
                          {contract.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleDetailClick(contract.requestId, contract.contractId)}
                        >
                          상세보기
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex align-items-center">
              <label className="me-2">페이지당 행 수:</label>
              <select 
                className="form-select form-select-sm" 
                style={{ width: 'auto' }}
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div>
            
            <nav>
              <ul className="pagination mb-0">
                <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handleChangePage(null, page - 1)}
                    disabled={page === 0}
                  >
                    이전
                  </button>
                </li>
                <li className="page-item">
                  <span className="page-link">
                    {page + 1} / {Math.ceil(contracts.length / rowsPerPage)}
                  </span>
                </li>
                <li className={`page-item ${page >= Math.ceil(contracts.length / rowsPerPage) - 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => handleChangePage(null, page + 1)}
                    disabled={page >= Math.ceil(contracts.length / rowsPerPage) - 1}
                  >
                    다음
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryList;
