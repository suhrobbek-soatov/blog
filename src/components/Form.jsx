import { useSelector } from "react-redux";

import Input from "./Input";
import TextArea from "./TextArea";

const Form = props => {
  const { title, setTitle, description, setDescription, body, setBody, handleSubmit } = props;
  const { isLoading } = useSelector(state => state.article);
  return (
    <div className="w-50 mx-auto">
      <form onSubmit={handleSubmit}>
        <Input label="Title" state={title} setState={setTitle} />
        <TextArea label="Description" state={description} setState={setDescription} />
        <TextArea label="Body" state={body} setState={setBody} height={200} />
        <button className="w-100 btn btn-lg btn-primary" disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default Form;
