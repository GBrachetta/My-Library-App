import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { getComposer, reset } from '../features/composers/composerSlice';

const Composer = () => {
  const {
    composer: { surname, names, country, born, died },
    isLoading,
    isSuccess,
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

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isError, message, composerId, isSuccess]);

  if (isLoading) return <Spinner />;

  if (isError) return <div>Error</div>;

  return (
    <>
      <Title title="Composer" />

      <section>
        <div>
          <p className="text-info text-center my-5 text-3xl font-semibold border-b-2 border-gray-600 pb-5">
            {names || null} {surname}
            {country ? ', ' : ''} {country || null}
            {born ? ', ' : ''} {born || '?'} - {died || '?'}
          </p>
        </div>

        <section className="my-5">
          <div>Books</div>
          <div>Books</div>
          <div>Books</div>
          <div>Books</div>
          <div>Books</div>
          <div>Books</div>
          <div>Books</div>
        </section>

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

export default Composer;
