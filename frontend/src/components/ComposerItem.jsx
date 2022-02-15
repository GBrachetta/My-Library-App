import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ComposerItem = ({ composer }) => {
  const { surname, names, country, born, died } = composer;

  return (
    <div className="table-row">
      <div className="table-cell pt-3">
        {surname}, {names}
      </div>
      <div className="table-cell pt-3 text-right">{country}</div>
      <div className="table-cell pt-3 text-right">{born}</div>
      <div className="table-cell pt-3 text-right">{died}</div>
      <div className="table-cell pt-3 text-right">
        <Link
          to={`/composers/${composer._id}`}
          className="btn btn-sm btn-outline"
        >
          View
        </Link>
      </div>
    </div>
  );
};

ComposerItem.propTypes = {
  composer: PropTypes.object.isRequired,
};

export default ComposerItem;
