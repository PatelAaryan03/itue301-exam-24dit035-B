import { NavLink } from "react-router-dom";

function Navbar() {
  return <nav className="navbar" aria-label="Main navigation"><NavLink className="brand" to="/">Shelfwise</NavLink><div className="nav-links"><NavLink to="/">Home</NavLink><NavLink to="/books">Books</NavLink><NavLink to="/borrow">Borrow</NavLink></div></nav>;
}

export default Navbar;