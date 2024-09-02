import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return(
    <div className="w-full h-16 inline-flex justify-between items-center px-10">
      <h1 className="text-3xl text-sky-500 font-medium">HubFlow</h1>
      <ul className="">
        <Link className="mr-5 font-medium text-lg hover:text-sky-600" to="/negocios">Negócios</Link>
        <Link className="mr-5 font-medium text-lg hover:text-sky-600" to="/">Planos</Link>
        <Link className="mr-5 font-medium text-lg hover:text-sky-600" to="/">Sobre</Link>
        <Link className="mr-5 font-medium text-lg hover:text-sky-600" to="/">Cadastro</Link>
        <Link className="font-medium text-lg hover:text-sky-600" to="/login">Login</Link>
      </ul>
    </div>
  )
}

function App() {
  return (
    <div className="w-full h-screen">
      <Navbar/>
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
