import { Link } from 'react-router-dom';

import Title from '../components/Title';

const Home = () => {
  return (
    <>
      <Title title="Guillermo's Library" />
      <section className="my-5">
        <p className="text-lg font-medium">
          A library is a collection of materials, books or media that are easily
          accessible for use and not just for display purposes. It is
          responsible for housing updated information in order to meet the
          user's needs on a daily basis. A library provides physical (hard
          copies documents) or digital access (soft copies) materials, and may
          be a physical location or a virtual space, or both. A library's
          collection can include printed materials and other physical resources
          in many formats such as DVD, CD and Cassette as well as access to
          information, music or other content held on bibliographic databases.
        </p>
      </section>
      <hr />
      <section className="grid grid-cols-2 mt-5">
        <div>
          <h2 className="text-2xl font-bold text-center mb-3">Books</h2>
          <p className="px-10">
            Browse and view composers, add new composers and add books from the
            individual composer file.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center mb-3">Composers</h2>
          <p className="px-10">
            Browse and view composers, add new composers and add books from the
            individual composer file.
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link
            to="/books"
            className="btn btn-xl btn-secondary rounded-btn my-2 btn-wide"
          >
            Books
          </Link>
        </div>

        <div className="mt-5 text-center">
          <Link
            to="/composers"
            className="btn btn-xl btn-secondary rounded-btn my-2 btn-wide"
          >
            Composers
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
