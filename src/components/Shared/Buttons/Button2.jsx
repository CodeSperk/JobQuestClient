import PropTypes from 'prop-types';

const Button2 = ({text}) => {
  return (
    <button className='bg-[var(--clr-focused)] text-[var(--clr-light)] px-6 py-2 hover:rounded duration-300 rounded-full text-center font-bold w-full'>
      {text}
    </button>
  );
};
Button2.propTypes = {
  text: PropTypes.string
}
export default Button2;