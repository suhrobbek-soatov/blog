const TextArea = ({ label, state, setState, height = 100 }) => {
  return (
    <div className="form-floating mb-3">
      <textarea
        className="form-control"
        placeholder="{label}"
        style={{ minHeight: `${height}px` }}
        value={state}
        onChange={e => setState(e.target.value)}
      />
      <label>{label}</label>
    </div>
  );
};

export default TextArea;
