/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import BackButton from '../components/BackButton';
import ComposerItem from '../components/ComposerItem';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { getComposers, reset } from '../features/composers/composerSlice';
import { useFuzzySearch } from '../hooks/useFuzzySearch';

const Composers = () => {
  const { composers: rawComposers, isLoading } = useSelector(
    (state) => state.composers,
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const fuzzyOptions = {
    keys: ['surname', 'country'],
  };

  const { searchResults, setSearchTerm, searchTerm } = useFuzzySearch({
    data: rawComposers,
    fuzzyOptions,
  });

  useEffect(() => {
    dispatch(getComposers());

    return () => dispatch(reset());
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  const composers = searchTerm
    ? searchResults.map((composer) => (
        <ComposerItem key={composer._id} composer={composer} />
      ))
    : []
        .concat(rawComposers)
        .sort((a, b) => (a.surname > b.surname ? 1 : -1))
        .map((composer) => (
          <ComposerItem key={composer._id} composer={composer} />
        ));

  return (
    <>
      <Title title="Composers" />

      <section className="grid place-items-center border-b-2 ">
        <p className="text-l text-gray-400 py-3">
          FILTER BY COMPOSER OR COUNTRY
        </p>
        <input
          className="text-gray-300 mb-5 form-input"
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      <section className="table w-full mb-5">
        <div className="table-header-group my-5 border-b-2 border-2">
          <div className="table-row ">
            <div className="table-cell border-b py-5 border-gray-600 font-bold">
              Name
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold text-right">
              Country
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold text-right">
              Born
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold text-right">
              Died
            </div>
            <div className="table-cell border-b py-5 border-gray-600" />
          </div>
        </div>
        <div className="table-row-group border-collapse border">
          {composers.length ? (
            composers
          ) : (
            <p className="mt-5">No matching composers found</p>
          )}
        </div>
      </section>

      {user && user.isAdmin && (
        <div className="text-center border-t-2 border-gray-600">
          <p className="font-semibold text-accent mt-5">Add a new composer</p>
          <Link
            to="/add-composer"
            className="btn btn-sm btn-primary my-3"
            onClick={() => dispatch(reset())}
          >
            Add
          </Link>
        </div>
      )}

      <BackButton url="/" />
    </>
  );
};

export default Composers;
