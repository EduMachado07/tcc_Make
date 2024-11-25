import { Outlet } from "react-router-dom";

import Navbar from "./pages/navbar";

function App() {
  return (
    <div className="h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
1;
