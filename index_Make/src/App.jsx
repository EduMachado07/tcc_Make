import { Outlet } from "react-router-dom";

import Navbar from "./pages/navbar";
import Footer from "./pages/footer";

function App() {
  return (
    <div className="flex flex-col gap-0">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
1;
