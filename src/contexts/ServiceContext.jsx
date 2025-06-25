import { createContext, useContext, useState, useEffect } from 'react';

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [serviceType, setServiceType] = useState(null); // 'supplier' 또는 'buyer'

  useEffect(() => {
    const saved = localStorage.getItem('serviceType');
    if (saved === 'supplier' || saved === 'buyer') {
      setServiceType(saved);
    }
  }, []);

  const switchToSupplier = () => {
    console.log('서비스 타입을 supplier로 변경');
    localStorage.setItem('serviceType', 'supplier'); 
    setServiceType('supplier');
  };

  const switchToBuyer = () => {
    console.log('서비스 타입을 buyer로 변경');
    localStorage.setItem('serviceType', 'buyer'); 
    setServiceType('buyer');
  };

  const resetServiceType = () => {
  console.log('서비스 타입을 제거');
  localStorage.removeItem('serviceType');
  setServiceType(null);
  };

  return (
    <ServiceContext.Provider value={{ serviceType, switchToSupplier, switchToBuyer, resetServiceType }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
} 