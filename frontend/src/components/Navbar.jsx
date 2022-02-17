import { FaBook, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout, reset } from '../features/auth/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content sticky top-0">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <Link to="/" className="text-lg font-bold align-middle">
            <FaBook className="inline pr-2 text-3xl text-primary" /> Guillermo's
            Library
          </Link>
        </div>

        <div className="flex-1 px-2 mx-2">
          <div className="flex justify-end">
            {user ? (
              <button
                type="button"
                className="btn btn-ghost btn-sm rounded-btn"
                onClick={onLogout}
              >
                <FaSignOutAlt className="mr-2 text-error" /> Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-ghost btn-sm rounded-btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
