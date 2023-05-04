import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Todo from "./contracts/Todo.json";
import detectEthereumProvider from "@metamask/detect-provider";
import add from "./contracts/config";
// import Task from "./Task";
function App() {
  const [input, setInput] = useState("");
  const [webApi, setWebApi] = useState({
    web3: null,
    provider: null,
    contract: null,
  });
  const [account, setAccount] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const load = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const chainId = await provider.request({
          method: "eth_chainId",
        });
        if (chainId != "0xaa36a7") {
          alert("please connet to the sepolia network");
          return;
        }
        // console.log(chainId);
      } else {
        console.log("error to load provider");
      }
      const web3 = await new Web3(provider);
      const acc = await web3.eth.getAccounts();
      setAccount(acc[0]);
      const abi = Todo.abi;
      const contract = await new web3.eth.Contract(abi, add);
      setWebApi({ web3, provider, contract });
      // console.log(contract);
    };
    load();
  }, []);

  useEffect(() => {
    webApi.contract && showTodo();
  }, [webApi.contract]);

  const showTodo = async () => {
    const { contract } = webApi;
    const data = await contract.methods.getTask().call({ from: account });
    setTasks(data);
    // console.log(
    //   data.map((item) => {
    //     return item[1];
    //   })
    // );
  };

  const addTodo = async () => {
    const { contract } = webApi;
    await contract.methods.addTask(input).send({ from: account });
    // console.log(data);
    showTodo();
  };

  const deleteItem = async (id) => {
    const { contract } = webApi;
    const idd = parseInt(id);
    console.log(typeof idd, idd);
    await contract.methods.deleteTask(idd).send({ from: account });
    //console.log(id);
    showTodo();
  };

  return (
    <>
      <div className="container-md mt-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="button-addon2"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={addTodo}
          >
            Add Todo
          </button>
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon3"
            onClick={() => {
              console.log(tasks);
            }}
          >
            show
          </button>
        </div>
        <ul>
          {tasks.map((item) => {
            return (
              <div className="input-group">
                <li className="form-control" key={item.id}>
                  {item.task}
                </li>
                <button className="btn btn-warning" type="button">
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => {
                    deleteItem(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

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

export default App;
