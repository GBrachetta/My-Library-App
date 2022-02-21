import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import BookItem from '../components/BookItem';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { getComposer, reset } from '../features/composers/composerSlice';
import { useFuzzySearch } from '../hooks/useFuzzySearch';

const ComposerData = ({ composer, booksByComposer }) => {
  const fuzzyOptions = {
    keys: ['title', 'setting'],
  };

  const { searchResults, setSearchTerm, searchTerm } = useFuzzySearch({
    data: booksByComposer,
    fuzzyOptions,
  });

  const books = searchTerm
    ? searchResults.map((book) => (
        <BookItem key={book._id} book={book} noComposer />
      ))
    : []
        .concat(booksByComposer)
        .sort((a, b) => (a.title > b.title ? 1 : -1))
        .map((book) => <BookItem key={book._id} book={book} noComposer />);

  return (
    <>
      <section className="grid place-items-center border-b-2 ">
        <p className="text-l text-gray-400 py-3">FILTER BY TITLE OR SETTING</p>
        <input
          className="text-gray-300 mb-5 form-input"
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>
      <div>
        <p className="text-info text-center my-5 text-3xl font-semibold border-b-2 border-gray-600 pb-5">
          {composer.names || null} {composer.surname}
          {composer.country ? ', ' : ''} {composer.country || null}
          {composer.born ? ', ' : ''} {composer.born || '?'} -{' '}
          {composer.died || '?'}
        </p>
      </div>
      <section className="table w-full mb-5">
        <div className="table-header-group my-5 border-b-2 border-2">
          <div className="table-row ">
            <div className="table-cell border-b py-5 border-gray-600 font-bold">
              Title
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold">
              Subtitle
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold">
              Setting
            </div>
            <div className="table-cell border-b py-5 border-gray-600" />
          </div>
        </div>
        <div className="table-row-group border-collapse border">
          {books.length ? (
            books
          ) : (
            <p className="mt-5">No books by this composer</p>
          )}
        </div>
      </section>
    </>
  );
};

const Composer = () => {
  const {
    composer: { composer, booksByComposer },
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.composers);

  const { composerId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getComposer(composerId));

    return () => dispatch(reset());
  }, [dispatch, isError, message, composerId]);

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error</div>;

  return (
    <>
      <Title title="Composer" />

      {composer && (
        <ComposerData composer={composer} booksByComposer={booksByComposer} />
      )}

      <section>
        <div className="text-center border-t-2 border-gray-600">
          <p className="font-semibold text-info mt-5">
            Add a book by this composer
          </p>
          <Link
            to="/add-book"
            state={{ composerId }}
            className="btn btn-sm btn-primary my-3"
          >
            Add
          </Link>
        </div>
      </section>

      <BackButton url="/composers" />
    </>
  );
};

ComposerData.defaultProps = {
  booksByComposer: [],
};

ComposerData.propTypes = {
  composer: PropTypes.object.isRequired,
  booksByComposer: PropTypes.array,
};

export default Composer;
