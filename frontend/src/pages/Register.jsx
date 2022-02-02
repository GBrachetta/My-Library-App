import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords don't match");
    }
  };

  return (
    <>
      <section>
        <h1 className="text-6xl border-b-2 pb-2">Register</h1>
      </section>

      <section className="flex justify-center">
        <form className="py-5" onSubmit={onSubmit}>
          <div className="form-control w-96">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              className="rounded text-black bg-gray-300 my-2"
              placeholder="Enter your name"
              required
            />
          </div>
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
          <div className="form-control w-96">
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
              className="rounded text-black bg-gray-300 my-2"
              placeholder="Confirm your password"
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
        <p className="py-3">Already have an account?</p>
        <Link to="/login" className="btn btn-secondary btn-sm rounded-btn">
          Login
        </Link>
      </section>
    </>
  );
};

export default Register;
