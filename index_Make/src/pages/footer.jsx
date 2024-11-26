import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const Footer = () => {
  const footerPages = [
    {
      title: "Empresas",
      link: "/empresas",
    },
    {
      title: "Sobre",
      link: "/",
    },
    {
      title: "Termos de Serviço",
      link: "/termos-uso",
    },
    {
      title: "Contato",
      link: "/",
    },
  ];

  return (
    <footer className="bg-colorPrimary w-full p-10 flex flex-col gap-7">
      <div className="max-sm:flex flex-col">
        {footerPages.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="text-slate-300 w-full text-base mr-5 hover:text-slate-50"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <Separator color="colorBack" />
      <div>
        <Link to="/" className="text-3xl text-slate-100 font-medium">
          HubFlow
        </Link>
        <Label className="text-slate-300 ml-3">
          &copy; 2024 HubFlow. Todos os direitos reservados
        </Label>
      </div>
    </footer>
  );
};

export default Footer;
