import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom container">
      <Link className="d-flex align-items-center me-md-auto">
        <img src="/images/logo.svg" alt="logo" />
      </Link>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            Pricing
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            FAQs
          </a>
        </li>
        <li className="nav-item">
          <a href="#" className="nav-link">
            About
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
