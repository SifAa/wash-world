export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="nav-container">
        <a href="http://localhost:3000/">
          <img
            className="nav--logo"
            src="/images/WW-logo.png"
            alt="Wash World"
          />
        </a>
      </div>
    </nav>
  );
}
