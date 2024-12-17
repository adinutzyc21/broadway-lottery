import { createContext } from "react";
import { Profile } from "../components/MainApp";

export const initialProfile = {
    firstName: "",
    lastName: "",
    email: "",
    ticketQty: "",
    birthDate: null,
    zip: "",
    country: "",
};

export const ProfilesContext = createContext({
    profiles: [] as Profile[],
    setProfiles: (_: Profile[]) => {},
    editingIndex: -1,
    setEditingIndex: (_: number) => {},
    notification: "",
    setNotification: (_: string) => {},
    error: "",
    setError: (_: string) => {},
    showSavedProfiles: false,
    setShowSavedProfiles: (_: boolean) => {},
    showProfileForm: false,
    setShowProfileForm: (_: boolean) => {},
    showLotteryList: false,
    setShowLotteryList: (_: boolean) => {},
    mainProfileIndex: 0,
    setMainProfileIndex: (_: number) => {},
});
