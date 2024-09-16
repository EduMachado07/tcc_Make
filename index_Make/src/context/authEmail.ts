import { create } from "zustand";

type AuthStore = {
    email: string | null;
    nome: string | null;
    tel: string | null;
    data: string | null;

    setEmail_User: (email : string) => void;
    setNome_User: (nome: string) => void;
    setTelefone_User: (tel: string) => void;
    setData_Nascimento_User: (data: string) => void;
}
export const authEmail = create<AuthStore>((set) => {

    const localEmail = localStorage.getItem("email");
    const localNome = localStorage.getItem("nome");
    const localTelefone = localStorage.getItem("tel");
    const localData_Nascimento = localStorage.getItem("data");
    let email: string | null = null;
    let nome: string | null = null;
    let tel: string | null = null;
    let data: string | null = null;

    try {
        if (localEmail) email = JSON.parse(localEmail);
        if (localNome) nome = JSON.parse(localNome);
        if (localTelefone) tel = JSON.parse(localTelefone);
        if (localData_Nascimento) data = JSON.parse(localData_Nascimento);
    } catch (error) {
        localStorage.clear();
    }

    return {
        email,
        nome,
        tel,
        data,
        setEmail_User: (data) => {
            localStorage.setItem("email", JSON.stringify(data));
            set({ email: data })
        },
        setNome_User: (data) => {
            localStorage.setItem("nome", JSON.stringify(data));
            set({ nome: data })
        },
        setTelefone_User: (data) => {
            localStorage.setItem("tel", JSON.stringify(data));
            set({ tel: data })
        },
        setData_Nascimento_User: (data) => {
            localStorage.setItem("data", JSON.stringify(data));
            set({ data: data })
        },
    }
})