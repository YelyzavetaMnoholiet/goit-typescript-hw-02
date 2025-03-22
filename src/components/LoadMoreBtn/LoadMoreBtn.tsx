type LoadMoreBtnProps = {
  onClick: () => void;
};

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps): JSX.Element => (
  <button onClick={onClick}>Load more</button>
);

export default LoadMoreBtn;
