import './Header.css'

function Header({ onHomeClick }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          My Blog
        </h1>
        <nav className="nav">
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#about" onClick={(e) => e.preventDefault()}>About</a>
          <a href="#contact" onClick={(e) => e.preventDefault()}>Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
