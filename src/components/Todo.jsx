import { useState } from "react";

const Todo = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [text, setText] = useState(props.text);

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const textChangeHandler = (e) => {
    setText(e.target.value);
  };

  const sendDelete = async () => {
    const { id } = props;

    try {
      await fetch(`http://localhost:5000/api/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => props.afterDelete());
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const sendPut = async (data) => {
    try {
      await fetch("http://localhost:5000/api", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return;
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const toggleEdit = (e) => {
    if (editMode === true) {
      const sendData = {
        id: props.id,
        title,
        text,
      };

      sendPut(sendData);
    }

    setEditMode(editMode ? false : true);
  };

  return (
    <div className="card m-3" style={{ width: "30%" }}>
      <div className="card-body">
        <h3 className="card-title">
          {editMode ? (
            <input onChange={titleChangeHandler} type="text" value={title} />
          ) : (
            title
          )}
        </h3>
        <hr />
        <div className="card-text">
          {editMode ? (
            <textarea onChange={textChangeHandler} value={text}></textarea>
          ) : (
            text
          )}
        </div>
        <hr />
        <div className="card-text">
          <button onClick={toggleEdit}>{editMode ? "Submit" : "Edit"}</button>
          <button onClick={sendDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
