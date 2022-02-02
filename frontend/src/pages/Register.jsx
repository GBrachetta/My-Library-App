import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <h1 className="text-6xl border-b-2 pb-2">Register</h1>
      <p className="py-3">Already have an account?</p>
      <Link to="/login" className="btn btn-secondary btn-sm rounded-btn">
        Login
      </Link>
    </>
  );
};

export default Register;
