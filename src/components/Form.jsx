import Input from "./Input";
import TextArea from "./TextArea";

const Form = ({ title, setTitle, desc, setDesc, body, setBody }) => {
  return (
    <div className="w-50 mx-auto">
      <form>
        <Input label="Title" state={title} setState={setTitle} />
        <TextArea label="Description" state={desc} setState={setDesc} />
        <TextArea label="Body" state={body} setState={setBody} height={200} />
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default Form;
