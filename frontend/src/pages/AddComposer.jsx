import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { createComposer, reset } from '../features/composers/composerSlice';

const countries = [
  'Italy',
  'Germany',
  'France',
  'Spain',
  'United Kingdom',
  'United States',
  'The Netherlands',
  'Belgium',
  'Austria',
  'Switzerland',
  'Portugal',
  'Denmark',
  'Norway',
  'Sweden',
  'Finland',
  'Ireland',
  'Bohemia',
  'Czech Republic',
  'Poland',
  'Hungary',
  'Romania',
  'Russia',
  'Luxembourg',
];

const AddComposer = () => {
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.composers,
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
      <Title title="Add Composer" />
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
              placeholder="Enter composer names"
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="surname">Country</label>
            <select
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={onChange}
              placeholder="Enter composer country"
              className="cursor-pointer"
            >
              <option value="">Select country</option>
              <option value="Other">Not Listed</option>
              {countries.sort().map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-96">
            <label htmlFor="surname">Year Born</label>
            <input
              type="text"
              name="born"
              id="born"
              value={born}
              onChange={onChange}
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

      <BackButton url="/" />
    </>
  );
};

export default AddComposer;
