type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps): JSX.Element => (
  <p>{message}</p>
);

export default ErrorMessage;
