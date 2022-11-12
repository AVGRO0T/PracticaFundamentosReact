import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Button from '../common/Button';
import { logout } from '../../clientApi/petitions';
import { useAuth } from '../userLogin/userState';


const Header = ({ className }) => {
  const { isLogged, handleLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    handleLogout();
  };

  return (
    <header className={classNames('header', className)}>
      <Link to="/">
        <div className="header-logo">
          {/* <img src={logo} alt="Twitter-React" /> */}
          
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink
          to="/new"
        >
          Nuevo Anuncio
        </NavLink>
        |
        <NavLink
          to="/"
          end
        >
          Anuncios
        </NavLink>
        {isLogged ? (
          <Button className="header-button" onClick={handleLogoutClick}>
            Cerrar Sesion
          </Button>
        ) : (
          <Button
            as={Link}
            to="/login"
            variant="primary"
            className="header-button"
          >
            Iniciar Sesion
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
