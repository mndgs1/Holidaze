import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LoggedInUser } from "../constants/interfaces/user";

type Store = {
    user: LoggedInUser | null;
    setUser: (user: LoggedInUser) => void;
    clearUser: () => void;
    updateStoreAvatar: (x: string) => void;
    updateStoreVenueManager: (x: boolean) => void;
};

const useUserStore = create<Store>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user: LoggedInUser) => set({ user }),
            clearUser: () => set((state) => ({ ...state, user: null })),
            updateStoreAvatar: (x) =>
                set((state: any) => ({
                    ...state,
                    user: { ...state.user, avatar: x },
                })),
            updateStoreVenueManager: (x) =>
                set((state: any) => ({
                    ...state,
                    user: { ...state.user, venueManager: x },
                })),
        }),
        {
            name: "user",
        }
    )
);

export const useToken = () => useUserStore((state) => state.user?.accessToken);

export const useUserActions = () => {
    const { setUser, clearUser, updateStoreAvatar, updateStoreVenueManager } =
        useUserStore();
    return { setUser, clearUser, updateStoreAvatar, updateStoreVenueManager };
};

export const useUser = () => {
    const user = useUserStore((state) => state.user);

    if (user) return user;
    else return null;
};
