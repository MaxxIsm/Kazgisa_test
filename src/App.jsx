import MenuTree from "./components/MenuTree";
import treeData from "./menu.json";

function App() {
  return (
    <div className="app">
      <MenuTree data={treeData} />

    </div>
  );
}

export default App;
