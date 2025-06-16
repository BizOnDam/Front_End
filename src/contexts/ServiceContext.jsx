import { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export function ServiceProvider({ children }) {
  const [serviceType, setServiceType] = useState(null); // 'SUPPLIER' 또는 'BUYER'

  const switchToSupplier = () => {
    console.log('서비스 타입을 supplier로 변경');
    setServiceType('supplier');
  };

  const switchToBuyer = () => {
    console.log('서비스 타입을 buyer로 변경');
    setServiceType('buyer');
  };

  return (
    <ServiceContext.Provider value={{ serviceType, switchToSupplier, switchToBuyer }}>
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