import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { createComposer, reset } from '../features/composers/composerSlice';

const AddComposer = () => {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.composer,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    surname: '',
    names: '',
    country: '',
    born: '',
    died: '',
  });

  const { surname, names, country, born, died } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate('/composers');
      toast.success('Composer added successfully');
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const composerData = {
      surname,
      names,
      country,
      born,
      died,
    };

    dispatch(createComposer(composerData));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div>
        <h1 className="text-6xl border-b-2 pb-2">Add Composer</h1>
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
              placeholder="Enter composer surname"
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
              placeholder="Enter composer names"
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
              placeholder="Enter composer country"
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
              placeholder="Enter composer year of birth"
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
              placeholder="Enter composer year of death"
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
        <BackButton url="/" />
      </section>
    </>
  );
};

export default AddComposer;
