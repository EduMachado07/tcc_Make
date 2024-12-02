import React from "react";
import background from "../images/background.jpg";

import img1 from "../assets/homepage.jpeg";
import img2 from "../assets/homepage2.webp";
import img3 from "../assets/homepage3.png";
import empresa from "../assets/empresa.webp";
import cliente from "../assets/cliente.jpg";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./footer";

const Landing = () => {
  const Cards = [
    {
      title: "Obtenha mais agendamentos ",
      description:
        "Obtenha mais agendamentos de forma rápida e fácil! Informe o serviço desejado e deixe-nos cuidar de todo o processo para você.",
      image: img1,
    },
    {
      title: "Atendimento no seu tempo!",
      description:
        "Escolha o dia e horário perfeito para você e garanta seu agendamento",
      image: img2,
    },
    {
      title: "Não Perca Tempo, Agende Seu Horário",
      description:
        "Atendimento rápido, eficiente e totalmente online. Agende com facilidade",
      image: img3,
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
        className="w-full flex justify-center px-20 max-sm:px-3 gap-32 max-sm:gap-3"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <section className="w-2/4 h-85vh max-sm:h-full gap-2 py-8 px-14 max-sm:px-4 rounded-md bg-colorPrimary shadow-xl flex flex-col items-center">
          <div className="w-full h-72 max-sm:hidden">
            <img
              src={cliente}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
          <section className="w-full h-full max-sm:h-80 justify-between flex flex-col">
            <div className="flex flex-col">
              <Label size="subtitle" className="text-slate-100">
                Seja um cliente
              </Label>
              <Label className="text-slate-100 text-xl">
                Agende seus serviços com facilidade e conveniência! Cadastre-se
                agora e tenha acesso a profissionais de confiança ao alcance de
                um clique.
              </Label>
            </div>
            <div>
              <Link to="/cadastro">
                <Button size="lg" variant="outline">
                  Agendar Serviço
                </Button>
              </Link>
            </div>
          </section>
        </section>

        <section className="w-2/4 h-85vh max-sm:h-full gap-2 py-8 px-14 max-sm:px-4 rounded-md bg-colorSecondary shadow-xl flex flex-col items-center">
          <div className="w-full h-72 max-sm:hidden">
            <img
              src={empresa}
              alt=""
              className="w-full h-full object-cover rounded"
            />
          </div>
          <section className="w-full h-full max-sm:h-80 justify-between flex flex-col">
            <div className="flex flex-col">
              <Label size="subtitle" className="text-slate-100">
                Abra sua empresa
              </Label>
              <Label className="text-slate-100 text-xl font-semibold">
                Destaque seus serviços e conquiste novos clientes! Cadastre sua
                empresa e comece a receber agendamentos online hoje mesmo.
              </Label>
            </div>
            <div>
              <Link to="/cadastro">
                <Button size="lg" variant="outline">
                  Testar agora
                </Button>
              </Link>
            </div>
          </section>
        </section>
      </motion.section>

      {/* CARDS */}
      {Cards.map((item, index) => (
        <section
          className={`w-full flex max-sm:flex-col justify-center items-center gap-3 sm:gap-24 px-4 sm:px-24 py-5 ${
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
    </div>
  );
};

export default Landing;
