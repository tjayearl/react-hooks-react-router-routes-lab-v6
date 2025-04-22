// src/components/NavBar.jsx
import { NavLink } from "react-router-dom";
import "./NavBar.css"; // Make sure this CSS file exists and styles appropriately

function NavBar() {
  // Helper function for active class styling
  const getNavLinkClass = ({ isActive }) => isActive ? "active" : undefined;

  return (
    <nav className="navbar">
      {/* Use function in className prop for v6 compatibility */}
      <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
      <NavLink to="/actors" className={getNavLinkClass}>Actors</NavLink>
      <NavLink to="/directors" className={getNavLinkClass}>Directors</NavLink>
    </nav>
  );
}

export default NavBar;
