import React, { useState, useEffect } from "react";
import axios from "axios";

export const Fib = () => {
  const [state, setState] = useState({
    seenIndexes: [],
    values: {},
    index: "",
  });

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    console.log(values.data)
    console.log(typeof values.data)
    setState((state) => ({ ...state, values: typeof values.data === "string" ? state.values : values.data }));
  };

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    console.log(seenIndexes.data)
    console.log(typeof seenIndexes.data)
    setState((state) => ({
      ...state,
      seenIndexes: typeof seenIndexes.data === "string" ? state.seenIndexes : seenIndexes.data,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      await fetchValues();
      await fetchIndexes();
    }
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post("/api/values", {
      index: state.index,
    });
    setState((state) => ({ ...state, index: "" }));
  };

  const renderSeenIndexes = () => {
    return (state.seenIndexes ?? []).map(({ number }) => number).join(", ");
  };

  const renderValues = () => {
    const entries = [];

    for (let key in state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {state.values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={state.index}
          onChange={(event) => setState(state => ({ ...state, index: event.target.value }))}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};
