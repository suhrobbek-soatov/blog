import { useCallback } from "react";
import { useSelector } from "react-redux";

const ValidationError = () => {
  const { error } = useSelector(state => state.auth);

  const getError = useCallback(() => {
    return !!error && Object.keys(error).map(name => `${name} - ${error[name]}`);
  }, [error]);

  return (
    !!error && (
      <>
        {getError().map((err, idx) => (
          <div className="text-danger mb-1" role="alert" key={idx}>
            {err}
          </div>
        ))}
      </>
    )
  );
};

export default ValidationError;
