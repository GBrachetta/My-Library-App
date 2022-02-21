import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { deleteBook, getBook, reset } from '../features/books/bookSlice';

const modalStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    background: '#2a2e37',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

Modal.setAppElement('#root');

const Book = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const { isLoading, isError, message, book } = useSelector(
    (state) => state.books,
  );

  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

        <div className="grid grid-cols-2">
          <div className="text-center border-t-2 border-gray-600">
            <p className="font-semibold text-info mt-5">Update Book</p>
            <Link
              to={`/books/update/${bookId}`}
              className="btn btn-sm btn-primary my-3"
            >
              Update
            </Link>
          </div>
          <div className="text-center border-t-2 border-gray-600">
            <p className="font-semibold text-info mt-5">Delete Book</p>
            <button
              type="button"
              onClick={openModal}
              className="btn btn-sm btn-warning my-3"
            >
              Delete
            </button>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Add Note"
      >
        <h2 className="text-center text-lg font-semibold">Are you sure?</h2>
        <div className="grid grid-cols-2 px-20 mt-5">
          <button
            type="button"
            className="btn btn-sm btn-primary mr-10"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary ml-10"
            onClick={() =>
              dispatch(deleteBook(bookId))
                .then(() => navigate('/books'))
                .then(() => toast.success('Book Deleted successfully'))
            }
          >
            Delete
          </button>
        </div>
      </Modal>

      <BackButton url={`/composers/${composer?._id}`} />
    </>
  );
};

export default Book;
