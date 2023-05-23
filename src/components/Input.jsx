const Input = ({ type = "text", label, state, setState }) => {
  return (
    <div className="form-floating mb-3">
      <input type={type} className="form-control" id="floatingInput" placeholder={label} value={state} onChange={(e) => setState(e.target.value)} />
      <label htmlFor="floatingInput">{label}</label>
    </div>
  );
};

export default Input;
