import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/sign/login'
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
import HistoryList from './pages/history/HistoryList'
import HistoryDetail from './pages/history/HistoryDetail'
import MatchingPage from './pages/demand/matching/MatchingPage'
import DemandNavbar from './components/DemandNavbar'
import SupplierNavbar from './components/SupplierNavbar'
import SignNavbar from './components/SignNavbar'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css'

// 공통 레이아웃 컴포넌트
const CommonLayout = ({ children, user }) => {
  const renderNavbar = () => {
    if (!user) return <SignNavbar user={user} />;
    if (user.role === 'BUYER') return <DemandNavbar user={user} />;
    if (user.role === 'SUPPLIER') return <SupplierNavbar user={user} />;
    return <SignNavbar user={user} />; // 기본 fallback
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {renderNavbar()}
      <div className="container py-4" style={{ flex: 1 }}>
        {React.cloneElement(children, { user })}
      </div>
      <Footer />
    </div>
  );
};


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: 실제 로그인 상태 확인 로직 구현
    setUser(null);
    // setUser({
    //   username: '윤가영',
    //   userId: '12352',
    //   companyId: '6795',
    //   companyName: '비즈온담',
    //   role: null
    // });
    // setUser({
    //   username: '가영',
    //   userId: '12353',
    //   companyId: '6796',
    //   companyName: '엘지전자（주）',
    //   role: null
    // });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CommonLayout user={user}><Home user={user} setUser={setUser} /></CommonLayout>} />
        <Route path="/login" element={<CommonLayout user={user}><Login /></CommonLayout>} />
        <Route path="/RegisterStep1" element={<RegisterStep1 />} />
        <Route path="/RegisterStep2" element={<RegisterStep2 />} />
        <Route path="/RegisterStep3" element={<RegisterStep3 />} />
        <Route path="/RegisterStep4" element={<RegisterStep4 />} />

        <Route path="/supplier" element={<CommonLayout user={user}><Dashboard userType="supplier" user={user} /></CommonLayout>} />
        <Route path="/demand" element={<CommonLayout user={user}><Dashboard userType="demand" user={user} /></CommonLayout>} />
        <Route path="/demand/supplier/:businessNumber" element={<CommonLayout user={user}><SupplierDetail user={user} /></CommonLayout>} />
        <Route path="/demand/suppliersList" element={<CommonLayout user={user}><SuppliersList user={user} /></CommonLayout>} />
        <Route path="/demand/matching/:requestId" element={<CommonLayout user={user}><MatchingPage user={user} /></CommonLayout>} />
        <Route path="/estimateList" element={<CommonLayout user={user}><EstimateList user={user} /></CommonLayout>} />
        <Route path="/estimateSheet" element={<CommonLayout user={user}><EstimateSheet user={user} /></CommonLayout>} />
        <Route path="/estimate/:requestId" element={<CommonLayout user={user}><EstimateDetail user={user} /></CommonLayout>} />
        <Route path="/estimate/:requestId/:responseId" element={<CommonLayout user={user}><EstimateDetail user={user} /></CommonLayout>} />
        <Route path="/estimate/:requestId/response" element={<CommonLayout user={user}><EstimateResponseSheet user={user} /></CommonLayout>} />
        <Route path="/contracts" element={<CommonLayout user={user}><Contracts user={user} /></CommonLayout>} />
        <Route path="/history" element={<CommonLayout user={user}><HistoryList user={user} /></CommonLayout>} />
        <Route path="/historyDetail/:id" element={<CommonLayout user={user}><HistoryDetail user={user} /></CommonLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App