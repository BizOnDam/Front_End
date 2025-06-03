// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import DemandNavbar from '../../../components/DemandNavbar';
// import Footer from '../../../components/Footer';
// import { contractsData } from '../data/contractsData';

// function ContractDetail() {
//   const navigate = useNavigate();

//   return (
//     <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh' }}>
//       <DemandNavbar active="/demand/contracts" />
//       <div className="container py-4">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="mb-0">계약 목록 상세</h2>
//           <button 
//             className="btn btn-outline-secondary"
//             onClick={() => navigate('/demand/contracts')}
//           >
//             목록으로 돌아가기
//           </button>
//         </div>

//         <div className="card shadow-sm">
//           <div className="card-body">
//             <div className="table-responsive">
//               <table className="table table-hover">
//                 <thead>
//                   <tr>
//                     <th>계약번호</th>
//                     <th>공급기업</th>
//                     <th>품목</th>
//                     <th>계약금액</th>
//                     <th>계약일</th>
//                     <th>납품예정일</th>
//                     <th>상태</th>
//                     <th>작업</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {contractsData.map(contract => (
//                     <tr key={contract.id}>
//                       <td>{contract.id}</td>
//                       <td>{contract.supplier}</td>
//                       <td>{contract.item}</td>
//                       <td>{contract.amount}</td>
//                       <td>{contract.contractDate}</td>
//                       <td>{contract.deliveryDate}</td>
//                       <td>
//                         <span className={`badge bg-${
//                           contract.status === '진행중' ? 'info' : 
//                           contract.status === '검수중' ? 'warning' : 'primary'
//                         }`}>
//                           {contract.status}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="btn-group">
//                           <button 
//                             className="btn btn-sm btn-outline-primary"
//                             onClick={() => navigate(`/demand/contract/${contract.id}`)}
//                           >
//                             상세보기
//                           </button>
//                           <button className="btn btn-sm btn-outline-success">
//                             발주서
//                           </button>
//                           <button className="btn btn-sm btn-outline-info">
//                             계약서
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default ContractDetail; 