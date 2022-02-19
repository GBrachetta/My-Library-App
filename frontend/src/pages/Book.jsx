import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { getBook, reset } from '../features/books/bookSlice';

const Book = () => {
  const { isLoading, isError, message, book } = useSelector(
    (state) => state.books,
  );

  const { bookId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getBook(bookId));

    return () => dispatch(reset());
  }, [dispatch, isError, message, bookId]);

  const {
    title,
    subtitle,
    setting,
    dateComposed,
    publisher,
    comments,
    hasParts,
    catalogueNumber,
    composer,
  } = book;

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error</div>;

  return (
    <>
      <Title title="Book" />

      <section>
        <div>
          <p className="text-info text-center mt-5 text-3xl font-semibold pb-2">
            {title}
          </p>
          <p className="text-info text-center text-xl font-semibold pb-5">
            {subtitle || null}
          </p>
          <p className="text-info text-center text-2xl font-semibold border-b-2 border-gray-600 pb-5">
            {composer?.surname}
            {composer?.names ? ', ' : ''}
            {composer?.names || null}
            {composer?.country ? ', ' : ''}
            {composer?.country}
            {composer?.born ? ', ' : ''}
            {composer?.born}
            {composer?.died ? ' - ' : ''}
            {composer?.died}
          </p>
          <p className="text-info mt-5 font-semibold pb-2">
            Setting: {setting}
          </p>
          <p className="text-info font-semibold pb-2">
            Date Composed: {dateComposed}
          </p>
          <p className="text-info font-semibold pb-2">Publisher: {publisher}</p>
          <p className="text-info font-semibold pb-2">Comments: {comments}</p>
          <p className="text-info font-semibold pb-2">Has Parts: {hasParts}</p>
          <p className="text-info font-semibold pb-2">
            Catalogue Number: {catalogueNumber}
          </p>
        </div>
        <div className="text-center border-t-2 border-gray-600">
          <p className="font-semibold text-info mt-5">Update Book</p>
          <Link
            to={`/books/update/${bookId}`}
            state={{ bookId }}
            className="btn btn-sm btn-primary my-3"
          >
            Update
          </Link>
        </div>
      </section>

      <BackButton url="/books" />
    </>
  );
};

export default Book;
