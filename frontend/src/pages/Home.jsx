import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <h1 className="text-6xl border-b-2 pb-2">Guillermo's Library</h1>
      <section className="container">
        <div className="mt-5">
          <p className="my-5 text-lg inline mr-5">Browse the collection</p>
          <Link
            to="/search"
            className="btn btn-sm  btn-primary rounded-sm my-2"
          >
            Search
          </Link>
        </div>
        {user && user.isAdmin && (
          <>
            <div className="mt-5">
              <p className="my-5 text-lg inline-block mr-5">Add a new author</p>
              <Link
                to="/add-author"
                className="btn btn-sm  btn-primary rounded-sm my-2"
              >
                Add Author
              </Link>
            </div>
            <div className="mt-5">
              <p className="my-5 text-lg inline-block mr-5">Add a new book</p>
              <Link
                to="/add-book"
                className="btn btn-sm  btn-primary rounded-sm my-2"
              >
                Add Book
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Home;
