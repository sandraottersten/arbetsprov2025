interface Props {
  message: string;
  id: string;
}

const Error = ({ message, id }: Props) => {
  return (
    <div
      className="relative bg-error text-white text-sm rounded px-3 py-1.5 w-max max-w-full mt-4"
      id={id}
    >
      <div className="absolute top-0 left-4 -mt-2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-error"></div>
      {message}
    </div>
  );
};

export default Error;
