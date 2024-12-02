import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Logo from "../assets/logoHubflow.png";
import rascunho from "../images/rascunhoImg.png";
import sobre1 from "../assets/sobre1.jpeg";
import sobre2 from "../assets/sobre2.jpg";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

const Sobre = () => {
  const devs = [
    {
      nome: "Eduardo Machado",
      img: "eduardo.jpeg",
    },
    {
      nome: "João Victor Oliveira",
      img: "joao.jpeg",
    },
    {
      nome: "Gabriele Machado",
      img: "gaby.jpeg",
    },
    {
      nome: "Ana Carolina Pelosi",
      img: "carol.jpeg",
    },
    {
      nome: "Daniel Pontes",
      img: "daniel.jpeg",
    },
    {
      nome: "Enedy Neto",
      img: "enedy.jpeg",
    },
    {
      nome: "Eduarda Leite",
      img: "eduarda.jpeg",
    },
  ];
  const cards = [
    {
      title: "Porque usar o HubFlow?",
      description:
        "O HubFlow é uma plataforma online ideal para o gerenciamento de sua empresa. Ela centraliza diversas operações em um único lugar.",
      image: sobre1,
    },
    {
      title: "Encontre o que precisa, perto de você",
      description:
        "Descubra o que você precisa, pertinho de você! Agende com facilidade e aproveite serviços próximos e eficientes.",
      image: sobre2,
    },
  ];

  return (
    <main className="bg-colorBack flex flex-col gap-8">
      <section className="bg-colorPrimary flex items-center justify-between gap-10 h-96 py-6 px-16 max-sm:px-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
          className="w-2/4 max-sm:w-full flex flex-col gap-3"
        >
          <Label size="largeTitle" className="text-slate-50 capitalize">
            Projeto HubFlow
          </Label>
          <p className="text-slate-100 text-xl">
            Um Trabalho de Conclusão de Curso com o objetivo de conectar os
            serviços de empresas e seus clientes. Saiba mais sobre o projeto e a
            equipe logo à baixo.
          </p>
          <Link to="/cadastro">
            <Button size="lg" variant="outline">
              Testar agora
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
          className="w-2/4 h-full max-sm:hidden"
        >
          <img src={Logo} alt="" className="w-full h-full object-contain" />
        </motion.div>
      </section>

      <section className="w-full flex flex-col justify-center gap-5 pb-5">
        <Label size="titleLg" className="w-full text-center">
          Desenvolvedores
        </Label>
        <section className="px-10 flex flex-col justify-center gap-10 max-sm:hidden">
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.7 }}
            className="w-full flex justify-between"
          >
            {devs.slice(0, 4).map((item, index) => (
              <section
                key={index}
                className="w-full flex flex-col items-center gap-2"
              >
                <div className="w-44 h-44">
                  <img
                    src={`http://localhost:5173/src/assets/${item.img}`}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <Label className="text-3xl font-bold">{item.nome}</Label>
              </section>
            ))}
          </motion.section>
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
            className="w-full flex justify-between px-32"
          >
            {devs.slice(4, 7).map((item, index) => (
              <section
                key={index}
                className="w-full flex flex-col items-center gap-2"
              >
                <div className="w-44 h-44">
                  <img
                    src={`http://localhost:5173/src/assets/${item.img}`}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <Label className="text-3xl font-bold">{item.nome}</Label>
              </section>
            ))}
          </motion.section>
        </section>

        <section className="px-10 max-sm:px-4 flex flex-col justify-center gap-10 sm:hidden">
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.7 }}
            className="w-full flex justify-between"
          >
            {devs.slice(0, 3).map((item, index) => (
              <section
                key={index}
                className="w-full flex flex-col items-center gap-2"
              >
                <div className="max-sm:w-20 max-sm:h-20">
                  <img
                    src={`http://localhost:5173/src/assets/${item.img}`}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <Label className=" text-center text-3xl max-sm:text-xl font-bold">
                  {item.nome}
                </Label>
              </section>
            ))}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.7 }}
            className="w-full flex justify-between"
          >
            {devs.slice(3, 6).map((item, index) => (
              <section
                key={index}
                className="w-full flex flex-col items-center gap-2"
              >
                <div className="max-sm:w-20 max-sm:h-20">
                  <img
                    src={`http://localhost:5173/src/assets/${item.img}`}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <Label className=" text-center text-3xl max-sm:text-xl font-bold">
                  {item.nome}
                </Label>
              </section>
            ))}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
            className="w-full flex justify-between px-20"
          >
            {devs.slice(6, 7).map((item, index) => (
              <section
                key={index}
                className="w-full flex flex-col items-center gap-2"
              >
                <div className="max-sm:w-20 max-sm:h-20">
                  <img
                    src={`http://localhost:5173/src/assets/${item.img}`}
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <Label className="w-full text-center text-xl font-bold">
                  {item.nome}
                </Label>
              </section>
            ))}
          </motion.section>
        </section>
      </section>

      {cards.map((item, index) => (
        <section
          className={`w-full flex max-sm:flex-col justify-center items-center gap-3 sm:gap-24 px-4 sm:px-24 py-12 ${
            index % 2 === 0 ? "" : "flex-row-reverse"
          }`}
          key={index}
        >
          <motion.div
            className="w-2/4 max-sm:w-full h-60 sm:h-96 rounded-md"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover rounded-md shadow-2xl"
            />
          </motion.div>
          <motion.div
            className="w-2/5 max-sm:w-full flex flex-col gap-5 max-sm:gap-3"
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <Label className="text-5xl max-sm:text-4xl font-bold max-sm:text-">
              {item.title}
            </Label>
            <Label className="text-2xl text-wrap ">{item.description}</Label>
          </motion.div>
        </section>
      ))}
    </main>
  );
};

export default Sobre;
