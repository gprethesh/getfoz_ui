// eslint-disable-next-line
const Button = ({ children, addClass }) => {
  return (
    <button
      className={`${addClass} text-base text-white rounded-xl font-normal`}
    >
      {children}
    </button>
  );
};

export default Button;
