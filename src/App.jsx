import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/sign/Login'
import RegisterStep1 from './pages/sign/RegisterStep1'
import RegisterStep2 from './pages/sign/RegisterStep2'
import RegisterStep3 from './pages/sign/RegisterStep3'
import RegisterStep4 from './pages/sign/RegisterStep4'
import Dashboard from './pages/dashboard/dashboard'
import SupplierDetail from './pages/demand/SupplierDetail'
import SuppliersList from './pages/demand/SuppliersList'
import EstimateList from './pages/estimate/EstimateList'
import EstimateSheet from './pages/estimate/estimateSheet'
import EstimateDetail from './pages/estimate/EstimateDetail'
import EstimateResponseSheet from './pages/estimate/EstimateResponseSheet'
import Contracts from './pages/contract/Contracts'
import ContractHistoryList from './pages/history/ContractHistoryList'
import ContractHistoryDetail from './pages/history/ContractHistoryDetail'
import MatchingPage from './pages/demand/matching/MatchingPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from './contexts/AuthContext';
import CommonLayout from './components/CommonLayout';

function App() {
  const { user } = useAuth(); // 전역 user 가져오기
  console.log("App.jsx user", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout><Home /></CommonLayout>} />
        <Route path="/login" element={<CommonLayout><Login /></CommonLayout>} />
        <Route path="/RegisterStep1" element={<RegisterStep1 />} />
        <Route path="/RegisterStep2" element={<RegisterStep2 />} />
        <Route path="/RegisterStep3" element={<RegisterStep3 />} />
        <Route path="/RegisterStep4" element={<RegisterStep4 />} />
        <Route path="/supplier" element={<CommonLayout><Dashboard userType="supplier" /></CommonLayout>} />
        <Route path="/demand" element={<CommonLayout><Dashboard userType="demand" /></CommonLayout>} />
        <Route path="/demand/supplier/:businessNumber" element={<CommonLayout><SupplierDetail /></CommonLayout>} />
        <Route path="/demand/suppliersList" element={<CommonLayout><SuppliersList /></CommonLayout>} />
        <Route path="/demand/matching/:requestId" element={<CommonLayout><MatchingPage /></CommonLayout>} />
        <Route path="/estimateList" element={<CommonLayout><EstimateList /></CommonLayout>} />
        <Route path="/estimateSheet" element={<CommonLayout><EstimateSheet /></CommonLayout>} />
        <Route path="/estimate/:requestId" element={<CommonLayout><EstimateDetail /></CommonLayout>} />
        <Route path="/estimate/:requestId/:responseId" element={<CommonLayout><EstimateDetail /></CommonLayout>} />
        <Route path="/estimate/:requestId/response" element={<CommonLayout><EstimateResponseSheet /></CommonLayout>} />
        <Route path="/contracts" element={<CommonLayout><Contracts /></CommonLayout>} />
        <Route path="/history" element={<CommonLayout><ContractHistoryList /></CommonLayout>} />
        <Route path="/historyDetail/:id" element={<CommonLayout><ContractHistoryDetail /></CommonLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
