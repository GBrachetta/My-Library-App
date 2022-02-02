import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <h1 className="text-6xl border-b-2 pb-2">Login</h1>
      <p className="py-3">Don't have an account?</p>
      <Link to="/register" className="btn btn-secondary btn-sm rounded-btn">
        Register
      </Link>
    </>
  );
};

export default Login;
