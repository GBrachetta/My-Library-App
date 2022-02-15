import PropTypes from 'prop-types';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BackButton = ({ url }) => {
  return (
    <Link to={url} className="btn btn-secondary btn-sm rounded-btn my-5">
      <FaArrowCircleLeft className="mr-2" /> Back
    </Link>
  );
};

BackButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default BackButton;
