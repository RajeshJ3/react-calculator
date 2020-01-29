import React from "react";
import "./App.css";
import Layout from "./containers/Layout";
import Calculator from "./components/Calculator";
function App() {
  return (
    <div className="App">
      <Layout>
        <Calculator />
      </Layout>
    </div>
  );
}

export default App;
