import { FaFileContract, FaFileDownload } from 'react-icons/fa';

const ContractDetailModal = ({ showModal, selectedContract, onClose, onDownloadContract }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(amount);
  };

  if (!showModal || !selectedContract) return null;

  return (
    <>
      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">계약 상세 정보</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <h6>기본 정보</h6>
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <th>계약번호</th>
                        <td>{selectedContract.contractId}</td>
                      </tr>
                      <tr>
                        <th>구매사</th>
                        <td>{selectedContract.buyerCompanyName}</td>
                      </tr>
                      <tr>
                        <th>공급사</th>
                        <td>{selectedContract.supplierCompanyName}</td>
                      </tr>
                      <tr>
                        <th>계약체결일</th>
                        <td>{selectedContract.contractCreatedAt?.split('T')[0]}</td>
                      </tr>
                      <tr>
                        <th>납품기한</th>
                        <td>{selectedContract.dueDate}</td>
                      </tr>
                      <tr>
                        <th>계약금액</th>
                        <td>{formatCurrency(selectedContract.totalPrice)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <h6>계약 정보</h6>
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <th>결제조건</th>
                        <td>{selectedContract.paymentTerms}</td>
                      </tr>
                      <tr>
                        <th>보증기간</th>
                        <td>{selectedContract.warranty}</td>
                      </tr>
                      <tr>
                        <th>특이사항</th>
                        <td>{selectedContract.specialTerms}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <h6>계약 품목</h6>
              <div className="card">
                <div className="card-body">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>품목</th>
                        <th>수량</th>
                        <th>단위</th>
                        <th>단가</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedContract.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.detailCategoryName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.specification}</td>
                          <td>{formatCurrency(item.unitPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-success"
                onClick={() => onDownloadContract(selectedContract.contractId)}
              >
                <FaFileDownload className="me-2" />
                계약서 보기
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 배경 */}
      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ContractDetailModal; 