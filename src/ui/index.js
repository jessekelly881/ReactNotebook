import React from "react";
import AppRouter from "./router";

/**
 * App
 */
const App = props => (
    <>
        <AppRouter />
        <div style={{ textAlign: "center", margin: "2rem" }}>
            <small style={{ color: "#ccc" }}>
                Support my work. With bitcoinz!
                <br />
                bc1q60twsepwkjpf8w7myaupkr2fxkuc0cze0wxygh
            </small>
        </div>
    </>
);

export default App;
