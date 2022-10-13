import { useState } from "react";

const NewTodo = (props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const titleInputHandler = (e) => {
    setTitle(e.target.value);
  };

  const textInputHandler = (e) => {
    setText(e.target.value);
  };

  const sendData = async () => {
    const data = { title, text };

    try {
      await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => props.onSubmit());
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  return (
    <div className="card m-3" style={{ width: "30%" }}>
      <div className="card-body">
        <h3 className="card-title">
          <input onChange={titleInputHandler} value={title} type="text" />
        </h3>
        <hr />
        <div className="card-text">
          <textarea onChange={textInputHandler} value={text} />
        </div>
        <hr />
        <div className="card-text">
          <button onClick={sendData}>Add</button>
          <button onClick={props.onSubmit}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NewTodo;
