import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ComposerItem = ({ composer }) => {
  const { surname, names, country, born, died } = composer;

  return (
    <div className="table-row">
      <div className="table-cell pt-3 font-semibold">
        {surname}
        {names ? ',' : ''} {names || ''}
      </div>
      <div className="table-cell pt-3 text-right font-semibold">{country}</div>
      <div className="table-cell pt-3 text-right font-semibold">{born}</div>
      <div className="table-cell pt-3 text-right font-semibold">{died}</div>
      <div className="table-cell pt-3 text-right font-semibold">
        <Link
          to={`/composers/${composer._id}`}
          className="btn rounded-md btn-xs btn-outline"
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
