import PropTypes from 'prop-types';

const Title = ({ title }) => {
  return (
    <section>
      <h1 className="text-6xl border-b-2 pb-2">{title}</h1>
    </section>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
