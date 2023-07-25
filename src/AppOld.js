import "./App.css";
import { useState } from "react";

const getItemList = () => {
  let ListStorage = localStorage.getItem("To DOs");
  if (ListStorage) {
    return JSON.parse(localStorage.getItem("To DOs"));
  } else {
    return [];
  }
};
 
function App() {
  const [value, setValue] = useState("");
  const [lists, setLists] = useState(getItemList());
  const [edit, setEdit] = useState(false); 
  const [getIndex, setIndex] = useState(null);
  let getEditVal;
    localStorage.setItem("To DOs", JSON.stringify(lists));
  

  const getInput = (e) => {
    setValue(e.target.value);
  };
  const handleInput = (e) => {
    setLists([...lists, value]);
    setValue("");
  };

  const handleEdit = (e) => {
    console.log(value);
    console.log(e.target.value);
    console.log("click", getIndex, lists);

    lists.forEach((elem, i) => {
      console.log(i);
      if (i === getIndex) {
        lists[i] = value;
      }
      console.log(lists);
      setLists([...lists]);
      setValue("");
    });
    setEdit("");
  };

  const deleteAll = (e) => {
    setLists("");
  };
  const deleteHandle = (taskName) => {
    const updateLists = lists.filter((el) => {
      return taskName !== el;
    });
    setLists(updateLists);
  };
  const editHandle = (list, i) => {
    console.log(i, list);
    setValue(list);
    setEdit(true);

    getEditVal = i;
    console.log(getEditVal);
    setIndex(i);
  };
  return (
    <div className='App rounded-1'>
      <h2>To-Do</h2>
      <input
        type='text'
        className='rounded-1 border-0'
        onChange={getInput}
        value={value}
      />
      <>
        {edit ? (
          <button
            className='ms-1 rounded-1 bg-primary text-white border-0'
            onClick={handleEdit}
          >
            Update
          </button>
        ) : (
          <button
            className='ms-1 rounded-1 bg-primary text-white border-0'
            onClick={handleInput}
          >
            Add
          </button>
        )}
      </>

      {lists ? (
        <ul className='list-group mt-3'>
          {lists.map((list, index) => (
            <li className='mb-1 d-flex justify-content-center' key={index}>
              <span className='me-5'>{list}</span>
              <>
                <button
                  className='ms-1 rounded-1 bg-secondary text-white border-0'
                  onClick={() => editHandle(list, index)}
                >
                  Edit
                </button>

                <button
                  className='ms-1 rounded-1 bg-black text-white border-0'
                  onClick={() => deleteHandle(list)}
                >
                  Delete
                </button>
              </>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
      {lists.length > 1 ? (
        <button
          className='ms-1 rounded-1 bg-black text-white border-0'
          onClick={() => deleteAll()}
        >
          Delete All
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
