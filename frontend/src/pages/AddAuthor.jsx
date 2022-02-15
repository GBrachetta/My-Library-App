import { useState } from 'react';
import { Link } from 'react-router-dom';

const AddAuthor = () => {
  const [formData, setFormData] = useState({
    surname: '',
    names: '',
    country: '',
    born: '',
    died: '',
  });

  const { surname, names, country, born, died } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div>
        <h1 className="text-6xl border-b-2 pb-2">Add Author</h1>
      </div>
      <section className="flex justify-center">
        <form className="py-5" onSubmit={onSubmit}>
          <div className="form-control w-96">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              name="surname"
              id="surname"
              value={surname}
              onChange={onChange}
              className="rounded text-black bg-gray-300 my-2"
              placeholder="Enter author surname"
              required
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="surname">Names</label>
            <input
              type="text"
              name="names"
              id="names"
              value={names}
              onChange={onChange}
              className="rounded text-black bg-gray-300 my-2"
              placeholder="Enter author names"
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="surname">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={onChange}
              className="rounded text-black bg-gray-300 my-2"
              placeholder="Enter author country"
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="surname">Year Born</label>
            <input
              type="text"
              name="born"
              id="born"
              value={born}
              onChange={onChange}
              className="rounded text-black bg-gray-300 my-2"
              placeholder="Enter author year of birth"
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="surname">Year Died</label>
            <input
              type="text"
              name="died"
              id="died"
              value={died}
              onChange={onChange}
              className="rounded text-black bg-gray-300 my-2"
              placeholder="Enter author year of death"
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
        <Link to="/" className="btn btn-secondary btn-sm rounded-btn my-3">
          Back
        </Link>
      </section>
    </>
  );
};

export default AddAuthor;
