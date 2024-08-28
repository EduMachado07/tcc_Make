import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post("", { email, senha });
      console.log("login correto: ", res.data);
    } catch (error) {
      console.log("deu ruim: ", error.res);
    }
    setEmail('');
    setSenha('');
  }

  return (
    <div className="">
      <form method="post" className="" onSubmit={handleSubmit}>
        <label htmlFor="email" className="">
          Email do usuário:
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=""
        />

        <label htmlFor="senha" className="">
          Senha:
        </label>
        <input
          type="password"
          name="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className=""
        />

        <button type="submit" className="">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
