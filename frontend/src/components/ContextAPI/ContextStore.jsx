import { useState } from "react";
import { CounterContext } from "./CounterContext";

function Store({children}) {
    let [name, setName] = useState("");
    let [id, setId] = useState("");
  return (
    <div>
        <CounterContext.Provider value = {[name, setName, id, setId]}>
            {children}
        </CounterContext.Provider>
    </div>
  )
}

export default Store;