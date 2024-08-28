import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="text-center">
        <h1>Hello, Tailwind CSS!</h1>
      </div>
      <ul>
        <Link to="/login">login</Link>
      </ul>
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
