import PropTypes from "prop-types";

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 px-4 rounded-md text-center text-sm font-semibold text-white`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
export default Header;
