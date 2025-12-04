// Header.tsx
import { Link, NavLink } from "react-router-dom";

export default function Header(){
  return (
    <div className="row">
      <h1 className="brand" style={{margin:0}}>
        <Link to="/">Code2Work — Blog Manager</Link>
      </h1>
      <nav className="toolbar" aria-label="Primary">
        <NavLink to="/" className="btn ghost">Menu</NavLink>
        <NavLink to="/articles" className="btn ghost">Articles</NavLink>
        <NavLink to="/new" className="btn">Nouvel Article</NavLink>
      </nav>
    </div>
  );
}
