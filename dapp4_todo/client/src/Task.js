const Task = (props) => {
  return (
    <div className="input-group">
      <li className="form-control" key={props.key}>
        {props.task}
      </li>
      <button className="btn btn-warning" type="button">
        Edit
      </button>
      <button className="btn btn-danger" type="button" onClick={props.onClick}>
        Delete
      </button>
    </div>
  );
};

export default Task;
