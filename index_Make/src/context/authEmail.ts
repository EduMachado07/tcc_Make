import { create } from "zustand";

type AuthStore = {
    email: string | null;
    setEmail: (email : string) => void;
}
export const authEmail = create<AuthStore>((set) => {

    const localEmail = localStorage.getItem("email");
    let email: string | null = null;
    if (localEmail) {
        try {
            email = JSON.parse(localEmail);
        } catch (error) {
            localStorage.removeItem("email");
        }
    }

    return {
        email: email,
        setEmail: (data) => {
            localStorage.setItem("email", JSON.stringify(data));
            set({ email: data })
        }
    }
})