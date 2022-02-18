import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BackButton from '../components/BackButton';
import BookItem from '../components/BookItem';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { getBooks, reset } from '../features/books/bookSlice';
import { useFuzzySearch } from '../hooks/useFuzzySearch';

const Books = () => {
  const { books: rawBooks, isLoading } = useSelector((state) => state.books);

  const dispatch = useDispatch();

  const fuzzyOptions = {
    keys: ['title', 'setting', 'composer.surname', 'composer.country'],
  };

  const { searchResults, setSearchTerm, searchTerm } = useFuzzySearch({
    data: rawBooks,
    fuzzyOptions,
  });

  useEffect(() => {
    dispatch(getBooks());

    return () => dispatch(reset());
  }, [dispatch]);

  const books = searchTerm
    ? searchResults.map((book) => <BookItem key={book._id} book={book} />)
    : []
        .concat(rawBooks)
        .sort((a, b) => (a.title > b.title ? 1 : -1))
        .map((book) => <BookItem key={book._id} book={book} />);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Title title="Books" />

      <section className="grid place-items-center border-b-2 ">
        <p className="text-l text-gray-400 py-3">
          FILTER BY TITLE, COMPOSER, SETTING OR COUNTRY
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
              Title
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold">
              Subtitle
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold">
              Setting
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold">
              Composer
            </div>
            <div className="table-cell border-b py-5 border-gray-600 font-bold">
              Country
            </div>
            <div className="table-cell border-b py-5 border-gray-600" />
          </div>
        </div>
        <div className="table-row-group border-collapse border">
          {books.length ? (
            books
          ) : (
            <p className="mt-5">No matching books found</p>
          )}
        </div>
      </section>

      <BackButton url="/" />
    </>
  );
};

export default Books;
