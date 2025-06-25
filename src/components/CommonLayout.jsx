import AppNavbar from './AppNavbar';
import Footer from './Footer';

const CommonLayout = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppNavbar />
      <div className="container py-4" style={{ flex: 1 }}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
