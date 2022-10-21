import "./App.css";
import React, { useEffect, useState } from "react";
import { getStars } from "./api";

function App() {
  const [stars, setStars] = useState([]);

  const loadStars = async () => {
    const result = await getStars();
    setStars(result);
  };

  useEffect(() => {
    loadStars();

    const source = new EventSource(`http://localhost:5000/stream`);

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("message", (e) => {
      console.log('got message!!')
      // const data = JSON.parse(e.data);

      // console.log(data);
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Testing</h1>
      {stars.map((stars) => {
        return <div>ok</div>;
      })}
      <button onClick={() => window.location.reload(false)}>
        Click to reload!
      </button>
    </div>
  );
}

export default App;
