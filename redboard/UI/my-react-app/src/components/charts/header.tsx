import couchbaseLogo from '../../assets/couchbase.svg';

const Header = () => {
    return (
      <header className="header">
        <div className="logo-container">
          <img src={couchbaseLogo} alt="Couchbase logo" className="logo" />
          <div className="text-container">
            <h2 className="subtitle">Couchbase</h2>
            <h1 className="title">Red-Board</h1>
          </div>
        </div>
      </header>
    );
};

export default Header;
