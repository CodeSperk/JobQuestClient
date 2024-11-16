import PropTypes from 'prop-types';

const SecHeader = ({name, title}) => {
  return (
    <div className="font-bold">
      <p className="text-[var(--clr-focused)]">{name}</p>
      <h2>{title}</h2>
    </div>
  );
};

SecHeader.propTypes={
  name: PropTypes.string,
  title: PropTypes.string
}

export default SecHeader;