import { useState } from "react";
import { Form } from "../components";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  return (
    <>
      <div className="text-center">
        <h1 className="fs-2 mb-2">Create Article</h1>
      </div>
      <Form title={title} desc={description} body={body} setTitle={setTitle} setDesc={setDescription} setBody={setBody} />
    </>
  );
};

export default CreateArticle;
