import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BookItem = ({ book, noComposer }) => {
  const { title, subtitle, setting, composer } = book;

  return (
    <div className="table-row">
      <div className="table-cell pt-3 font-semibold">{title}</div>
      <div className="table-cell pt-3 font-semibold">{subtitle}</div>
      <div className="table-cell pt-3 font-semibold">{setting}</div>
      {noComposer ? null : (
        <>
          <div className="table-cell pt-3 font-semibold">{`${composer.surname}${
            composer.names ? ',' : ''
          } ${composer.names || ''}`}</div>
          <div className="table-cell pt-3 font-semibold">
            {composer.country || null}
          </div>
        </>
      )}

      <div className="table-cell pt-3 font-semibold">
        <Link
          to={`/books/${book._id}`}
          className="btn rounded-md btn-xs btn-outline"
        >
          View
        </Link>
      </div>
    </div>
  );
};

BookItem.defaultProps = {
  noComposer: false,
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired,
  noComposer: PropTypes.bool,
};

export default BookItem;
