import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LoggedInUser } from "../constants/interfaces/user";

type Store = {
    user: LoggedInUser | null;
    setUser: (user: LoggedInUser) => void;
    clearUser: () => void;
};

const useUserStore = create<Store>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: LoggedInUser) => set({ user }),
            clearUser: () => set((state) => ({ ...state, user: null })),
        }),
        {
            name: "user",
        }
    )
);

export const useToken = () => useUserStore((state) => state.user?.accessToken);

export const useUserActions = () => {
    const { setUser, clearUser } = useUserStore();
    return { setUser, clearUser };
};

export const useUser = () => {
    const user = useUserStore((state) => state.user);

    if (user) return user;
    else return null;
};
