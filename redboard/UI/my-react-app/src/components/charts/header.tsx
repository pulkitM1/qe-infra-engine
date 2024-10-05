import couchbaseLogo from '../../assets/couchbase.svg';

const Header = () => {
    return (
      <header className="header">
      <div className="logo-container">
        <img src={couchbaseLogo} alt="Couchbase logo" className="logo" />
        <div className="text-container">
        <h2 className="subtitle" style={{ fontSize: "24px" }}>Couchbase</h2>
        <h1 className="title" style={{ fontSize: "36px" }}>Red-Board</h1>
        </div>
      </div>
      </header>
    );
};

export default Header;
