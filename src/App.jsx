import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/sign/login'
import RegisterStep1 from './pages/sign/RegisterStep1'
import RegisterStep2 from './pages/sign/RegisterStep2'
import RegisterStep3 from './pages/sign/RegisterStep3'
import RegisterStep4 from './pages/sign/RegisterStep4'
import DamanDashboard from './pages/demand/damanDashboard'
import SupplierDetail from './pages/demand/supplierDetail'
import SuppliersList from './pages/demand/suppliersList'
import Estimate from './pages/estimate/estimate'
import EstimateSheet from './pages/estimate/estimateSheet'
import SentEstimateDetail from './pages/estimate/sentEstimateDetail'
import ReceivedProposalDetail from './pages/estimate/receivedProposalDetail'
import Contracts from './pages/contract/contracts'
import DemandNavbar from './components/DemandNavbar'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'

const Supplier = () => <div>공급업체 메인(임시)</div>;

// 공통 레이아웃 컴포넌트
const CommonLayout = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DemandNavbar />
      <div className="container py-4" style={{ flex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RegisterStep1" element={<RegisterStep1 />} />
        <Route path="/RegisterStep2" element={<RegisterStep2 />} />
        <Route path="/RegisterStep3" element={<RegisterStep3 />} />
        <Route path="/RegisterStep4" element={<RegisterStep4 />} />
        <Route path="/supplier" element={<Supplier />} />
        {/* TODO 함수로 바꾸기, path 수정하기 */}
        <Route path="/demand" element={<CommonLayout><DamanDashboard /></CommonLayout>} />
        <Route path="/demand/supplier/:businessNumber" element={<CommonLayout><SupplierDetail /></CommonLayout>} />
        <Route path="/demand/suppliersList" element={<CommonLayout><SuppliersList /></CommonLayout>} />
        <Route path="/demand/estimate" element={<CommonLayout><Estimate /></CommonLayout>} />
        <Route path="/demand/estimateSheet" element={<CommonLayout><EstimateSheet /></CommonLayout>} />
        <Route path="/demand/sent-estimates/:id" element={<CommonLayout><SentEstimateDetail /></CommonLayout>} />
        <Route path="/demand/received-proposals/:id" element={<CommonLayout><ReceivedProposalDetail /></CommonLayout>} />
        <Route path="/demand/contracts" element={<CommonLayout><Contracts /></CommonLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
