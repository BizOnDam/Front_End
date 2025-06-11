import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
    <Link className="navbar-brand" to="/">BizOnDam</Link>
  </nav>
  );
}

export default SignNavbar; 