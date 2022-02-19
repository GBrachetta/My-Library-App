import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import Title from '../components/Title';
import { getBook, reset, updateBook } from '../features/books/bookSlice';

const UpdateBook = () => {
  const location = useLocation();
  const { bookId } = location.state;

  const { isLoading, isError, message, book } = useSelector(
    (state) => state.books,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: book.title,
    subtitle: book.subtitle,
    composer: book.composer,
    setting: book.setting,
    dateComposed: book.dateComposed,
    publisher: book.publisher,
    comments: book.comments,
    hasParts: book.hasParts,
    catalogueNumber: book.catalogueNumber,
  });

  const {
    title,
    subtitle,
    composer,
    setting,
    dateComposed,
    publisher,
    comments,
    hasParts,
    catalogueNumber,
  } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getBook(bookId));

    return () => dispatch(reset());
  }, [isError, message, navigate, dispatch, bookId]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      title,
      subtitle,
      composer,
      setting,
      dateComposed,
      publisher,
      comments,
      hasParts,
      catalogueNumber,
    };

    dispatch(updateBook({ bookData, bookId }))
      .then(() => navigate('/books'))
      .then(() => toast.success('Book updated successfully'));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Title title="Update Book" />
      <section className="flex justify-center">
        <form className="py-5" onSubmit={onSubmit}>
          <div className="form-control w-96">
            <input
              type="hidden"
              name="composer"
              id="composer"
              value={composer?._id}
              disabled
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="composer">Composer</label>
            <input
              type="text"
              name="composerShow"
              id="composerShow"
              value={`${composer?.surname}, ${composer?.names}`}
              disabled
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onChange}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="subtitle">Subtitle</label>
            <input
              type="text"
              name="subtitle"
              id="subtitle"
              value={subtitle}
              onChange={onChange}
              placeholder="Enter the subtitle"
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="setting">Setting</label>
            <input
              type="text"
              name="setting"
              id="setting"
              value={setting}
              onChange={onChange}
              placeholder="Enter the setting"
              required
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="dateComposed">Date Composed</label>
            <input
              type="text"
              name="dateComposed"
              id="dateComposed"
              value={dateComposed}
              onChange={onChange}
              placeholder="Enter the composition date"
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              name="publisher"
              id="publisher"
              value={publisher}
              onChange={onChange}
              placeholder="Enter the publisher"
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="comments">Comments</label>
            <textarea
              name="comments"
              id="comments"
              value={comments}
              onChange={onChange}
              draggable="false"
              placeholder="Enter the comments"
              style={{ resize: 'none' }}
            />
          </div>
          <div className="form-control w-96">
            <label htmlFor="hasParts">Has Parts</label>
            <select
              name="hasParts"
              id="hasParts"
              value={hasParts}
              onChange={onChange}
            >
              <option value="n/a">Select</option>
              <option value="n/a">Not applicable</option>
              <option value="yes">yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="form-control w-96">
            <label htmlFor="catalogueNumber">Catalogue Number</label>
            <input
              type="text"
              name="catalogueNumber"
              id="catalogueNumber"
              value={catalogueNumber}
              onChange={onChange}
              placeholder="Enter the catalogue number"
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
      <BackButton url="/books" />
    </>
  );
};

export default UpdateBook;
