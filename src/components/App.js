import React, { useState } from "react";
import Header from "../components/Header";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Link,
} from "react-router-dom";

const defaultArr = [
  {
    id: 0,
    frontFace: "Click here to add more flipcard",
    backFace: null,
  },
];

const defaultTextColor = "#969696";
const defaultBgColor = "#393939";

export default function App() {
  const [arr, setArr] = useState(defaultArr);
  const [textColor, setTextColor] = useState(defaultTextColor);
  const [bgColor, setBgColor] = useState(defaultBgColor);

  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/flashcard" exact>
            <Card
              setArr={setArr}
              arr={arr}
              textColor={textColor}
              setTextColor={setTextColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          </Route>
          <Route path="/settings">
            <Settings
              setArr={setArr}
              arr={arr}
              textColor={textColor}
              setTextColor={setTextColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          </Route>
          <Route path="/create">
            <Create
              setArr={setArr}
              arr={arr}
              textColor={textColor}
              setTextColor={setTextColor}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          </Route>
        </Switch>
        <Image />
        <Footer />
      </div>
    </Router>
  );
}

function Card({ textColor, bgColor, setArr, arr }) {
  console.log(arr);
  let setId;
  if (arr.length === 1) {
    setId = 0;
  } else {
    setId = 1;
  }
  const frontDefault = true;
  const [front, setFront] = useState(frontDefault);
  const [selectedId, setSelectedId] = useState(setId);
  const card = arr.filter((i) => i.id === selectedId);

  function handleClick(front) {
    setFront(!front);
  }

  function checkNext(selectedId) {
    console.log(arr.filter((item) => item.id === selectedId + 1));
    if (arr.filter((item) => item.id === selectedId + 1).length === 0) {
      return false;
    } else {
      return true;
    }
  }
  function checkBack(selectedId) {
    console.log(selectedId);
    console.log(arr.filter((item) => item.id === selectedId - 1));
    if (arr.filter((item) => item.id < selectedId - 1).length < 1) {
      return false;
    } else {
      return true;
    }
  }
  function handleNext(selectedId) {
    setSelectedId(selectedId + 1);
    setFront(frontDefault);
  }
  function handleBack(selectedId) {
    setSelectedId(selectedId - 1);
    setFront(frontDefault);
  }
  setArr(arr);

  if (selectedId === 0) {
    return (
      <div className="card-container">
        <div className="card card-null">
          <Link
            style={{ color: textColor }}
            to={{
              pathname: "/create",
              state: { arr: arr },
            }}
          >
            Click here to add more flipcard
          </Link>
        </div>
        <div className="buttons">
          <button className="btn btn-disabled">Back</button>
          <Link
            className="btn btn-secondary"
            to={{
              pathname: "/create",
              state: { arr: arr },
            }}
          >
            Add +
          </Link>
          <button className="btn btn-disabled">Next</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-container">
        <div
          style={{ backgroundColor: bgColor }}
          onClick={() => handleClick(front)}
          className="card"
        >
          <p style={{ color: textColor }}>
            {front ? card[0].frontFace : card[0].backFace}
          </p>
        </div>
        <div className="buttons">
          <button
            onClick={() =>
              checkBack(selectedId) ? handleBack(selectedId) : null
            }
            className={
              checkBack(selectedId) ? "btn btn-primary" : "btn btn-disabled"
            }
          >
            Back
          </button>
          <Link
            to={{
              pathname: "/create",
              state: { arr: arr },
            }}
          >
            <button className="btn btn-secondary">Add +</button>
          </Link>
          <button
            onClick={() =>
              checkNext(selectedId) ? handleNext(selectedId) : null
            }
            className={
              checkNext(selectedId) ? "btn btn-primary" : "btn btn-disabled"
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

function Image() {
  return (
    <div className="image-container">
      <img
        className="image"
        src="flashcard.svg"
        height="100%"
        width="auto"
        alt="A guy looking at sticky notes and studying"
      />
    </div>
  );
}

function Footer({ textColor, bgColor, arr }) {
  return (
    <footer>
      <Link
        className="footer-text"
        to={{
          pathname: "/settings",
          state: { arr: arr, bgColor: bgColor, textColor: textColor },
        }}
      >
        Settings
      </Link>
    </footer>
  );
}

function Create({ textColor, setTextColor, bgColor, setBgColor, setArr, arr }) {
  const [keyword, setKeyword] = useState("");
  const [meaning, setMeaning] = useState("");
  const history = useHistory();
  console.log(arr);
  function handleSubmit(e) {
    e.preventDefault();
    const newCard = {
      id: arr.length,
      frontFace: keyword,
      backFace: meaning,
    };
    const newArray = [...arr, newCard];
    setArr(newArray);
    history.push({
      pathname: "/",
      state: { arr: newArray },
    });
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <legend>Add New Flipfact</legend>
      <label htmlFor="keyword">Keyword</label>
      <input
        onChange={(e) => setKeyword(e.target.value)}
        id="keyword"
        type="text"
        className="input-text"
      ></input>
      <label htmlFor="meaning">Meaning</label>
      <input
        onChange={(e) => setMeaning(e.target.value)}
        id="meaning"
        type="text"
        className="input-text"
      ></input>
      <button type="submit" className="btn btn-primary add">
        Add
      </button>
    </form>
  );
}

function Settings({
  textColor,
  setTextColor,
  bgColor,
  setBgColor,
  setArr,
  arr,
}) {
  const history = useHistory();
  function handleTextColor(e) {
    console.log(e.target.value);
    setTextColor(e.target.value);
  }
  function handleBgColor(e) {
    console.log(e.target.value);
    setBgColor(e.target.value);
  }
  //function getRandom() {
  //  return Math.random() - 0.5;
  //}

  //function handleShuffle(e, array, setArr) {
  //  e.preventDefault(e);
  //  const newArray = array.sort(getRandom);
  //  console.log(newArray);
  //  setArr(newArray);
  //}

  function handleClear(e) {
    e.preventDefault();
    setArr(defaultArr);
    setBgColor(defaultBgColor);
    setTextColor(defaultTextColor);
    history.push({
      pathname: "/",
      state: { arr: arr, textColor: textColor, bgColor: bgColor },
    });
  }
  return (
    <form className="form">
      <legend>Settings</legend>
      <div className="color-container">
        <label htmlFor="text">Text Colour</label>
        <input
          onChange={handleTextColor}
          id="text"
          value={textColor}
          type="color"
        ></input>
      </div>
      <div className="color-container">
        <label>Background Colour</label>
        <input
          onChange={handleBgColor}
          value={bgColor}
          id="background"
          type="color"
        ></input>
      </div>
      <button onClick={(e) => handleClear(e)} class="btn btn-secondary">
        Clear
      </button>
      <Link
        className="btn btn-primary"
        to={{
          pathname: "/",
          state: { arr: arr, bgColor: bgColor, textColor: textColor },
        }}
      >
        Done
      </Link>
    </form>
  );
}
