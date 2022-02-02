import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section>
        <h1 className="text-6xl border-b-2 pb-2">Login</h1>
      </section>

      <section className="flex justify-center">
        <form className="py-5" onSubmit={onSubmit}>
          <div className="form-control w-96">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              className="rounded text-black bg-gray-300 my-2"
              placeholder="Enter your email"
              autoComplete="username"
              required
            />
          </div>
          <div className="form-control w-96">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              className="rounded text-black bg-gray-300 my-2"
              placeholder="Enter your password"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="form-control">
            <button
              type="submit"
              className="btn btn-sm  btn-primary rounded-sm my-2"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      <section className="border-t-2">
        <p className="py-3">Don't have an account?</p>
        <Link to="/register" className="btn btn-secondary btn-sm rounded-btn">
          Register
        </Link>
      </section>
    </>
  );
};

export default Login;
