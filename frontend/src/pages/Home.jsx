import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Title from '../components/Title';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Title title="Guillermo's Library" />
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
              <p className="my-5 text-lg inline-block mr-5">
                Add a new composer
              </p>
              <Link
                to="/add-composer"
                className="btn btn-sm  btn-primary rounded-sm my-2"
              >
                Add Composer
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
