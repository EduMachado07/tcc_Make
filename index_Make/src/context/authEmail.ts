import { create } from "zustand";

type AuthStore = {
    email: string;
    setEmail: (email : string) => void;
}
export const authEmail = create<AuthStore>((set) => ({
    email: '',
    setEmail: (email) => set({email})
}))