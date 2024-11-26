import React from "react";
import background from "../images/background.jpg";
import rascunho from "../images/rascunhoImg.png";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./footer";

const Landing = () => {
  const Cards = [
    {
      title: "Porque usar o HubFlow?",
      description: "Texto aqui",
      image: rascunho,
    },
    {
      title: "Porque usar o HubFlow?",
      description: "Texto aqui",
      image: rascunho,
    },
    {
      title: " HubFlow?",
      description: "Texto aqui",
      image: rascunho,
    },
  ];

  return (
    <div className="bg-colorBack w-full flex flex-col items-center gap-20 overflow-hidden pb-12">
      <section className="bg-black w-full h-75vh max-sm:h-80 relative">
        <img
          src={background}
          alt="fundo"
          className="w-full h-full object-cover"
        />
        <section className="bg-gradient-to-t from-zinc-900 from-20% max-sm:from-25% to-transparent absolute top-0 w-full h-full flex flex-col justify-center px-16 max-sm:px-10 max-sm:pt-12 pt-14">
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <Label size="largeTitle" className="text-slate-50 capitalize">
              Melhor solução para sua empresa
            </Label>
            <Label className="text-slate-200 text-xl sm:w-2/5">
              Organize seus agendamentos e simplifique o atendimento com os seus
              clientes
            </Label>
            <div className="flex items-center gap-4">
              <Link to="/cadastro">
                <Button size="lg" variant="outline">
                  Teste agora
                </Button>
              </Link>
              <Link className="text-colorSecondary font-semibold flex items-center gap-1 underline-offset-4 hover:underline">
                Saber mais
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4 -rotate-45"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </section>
      </section>

      {/* REDIRECIONAMENTO DE USUARIOS */}
      <motion.section
        className="w-full flex justify-center px-20 max-sm:px-3 gap-24 max-sm:gap-3"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <section className="w-2/4 h-85vh max-sm:h-full gap-2 py-8 px-14 max-sm:px-4 rounded-md bg-colorPrimary shadow-xl flex flex-col items-center">
          <div className="w-full h-64 max-sm:hidden">
            <img
              src={rascunho}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
          <section className="w-full h-full max-sm:h-80 justify-between flex flex-col">
            <div className="flex flex-col">
              <Label size="subtitle" className="text-slate-100">
                Seja um cliente
              </Label>
              <Label size="base" className="text-slate-100">
                texto aqui
              </Label>
            </div>
            <div>
              <Button size="lg">Agendar Serviço</Button>
            </div>
          </section>
        </section>

        <section className="w-2/4 h-85vh max-sm:h-full gap-2 py-8 px-14 max-sm:px-4 rounded-md bg-colorSecondary shadow-xl flex flex-col items-center">
          <div className="w-full h-64 max-sm:hidden">
            <img
              src={rascunho}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
          <section className="w-full h-full max-sm:h-80 justify-between flex flex-col">
            <div className="flex flex-col">
              <Label size="subtitle" className="text-slate-100">
                Abra sua empresa
              </Label>
              <Label size="base" className="text-slate-100">
                texto aqui
              </Label>
            </div>
            <div>
              <Button size="lg">Testar agora</Button>
            </div>
          </section>
        </section>
      </motion.section>

      {/* CARDS */}
      {Cards.map((item, index) => (
        <section
          className={`w-full flex justify-center items-center gap-3 sm:gap-7 px-4 sm:px-24 py-5 ${
            index % 2 === 0 ? "" : "flex-row-reverse"
          }`}
          key={index}
        >
          <motion.div
            className="w-2/4 h-40 sm:h-96"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </motion.div>
          <motion.div
            className="w-2/4 flex flex-col"
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <Label size="subtitle">{item.title}</Label>
            <Label size="base">{item.description}</Label>
          </motion.div>
        </section>
      ))}
    </div>
  );
};

export default Landing;
