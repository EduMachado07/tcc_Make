import { Label } from "@/components/ui/label";

const TermosUso = () => {
  return (
    <main className="bg-colorBack flex justify-center">
      <main className="w-8/12 flex flex-col gap-8 items-center py-12">
        <Label size="largeTitle">Termos de Uso</Label>
        <Label size="base" className="text-justify">
          Seja bem-vindo ao HubFlow! Ao acessar ou utilizar nossos serviços,
          você concorda com os termos e condições descritos neste documento.
          Caso não concorde com algum dos termos, solicitamos que não utilize
          nosso site. Estes Termos de Uso regem o uso do nosso site e são
          complementados pela nossa Política de Privacidade.
        </Label>

        <Label className="text-2xl font-bold">Aceitação dos Termos</Label>
        <Label size="base" className="text-justify">
          Ao acessar e utilizar o HubFlow, você concorda com estes Termos de
          Uso, bem como com a nossa Política de Privacidade. Caso não concorde
          com qualquer disposição, você não deverá acessar ou usar nosso site.
        </Label>

        <Label className="text-2xl font-bold">Modificação dos Termos</Label>
        <Label size="base" className="text-justify">
          Podemos modificar os Termos de Uso a qualquer momento, sem aviso
          prévio. Recomendamos que você revise periodicamente esta página para
          se manter informado sobre as atualizações. As modificações entrarão em
          vigor imediatamente após a publicação no site.
        </Label>

        <Label className="text-2xl font-bold">Acesso ao Site</Label>
        <Label size="base" className="text-justify">
          Para acessar algumas áreas e funcionalidades do nosso site, será
          necessário criar uma conta e fornecer informações pessoais. Você
          concorda em fornecer dados verdadeiros, completos e atualizados, bem
          como em manter a confidencialidade de suas credenciais de acesso.
        </Label>

        <div className="w-full flex flex-col gap-8">
          <Label className="text-center text-2xl font-bold">Uso do Site</Label>
          <Label size="base" className="text-justify">
            Você se compromete a usar o site de forma responsável e de acordo
            com as leis vigentes. É proibido usar o site para:
            <br />- Praticar qualquer ato ilícito ou fraudulento;
            <br />- Violar os direitos de propriedade intelectual, privacidade
            ou segurança de terceiros;
            <br />- Interferir no funcionamento do site ou utilizar métodos que
            possam danificar, sobrecarregar ou prejudicar o site.
          </Label>
        </div>
      </main>
    </main>
  );
};

export default TermosUso;
