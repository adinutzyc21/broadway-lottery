import { createContext } from "react";
import { LotteryType, Profile } from "../@types";

export const initialProfile = {
    firstName: "",
    lastName: "",
    email: "",
    ticketQty: "",
    birthDate: "",
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
    lotteryList: [] as LotteryType[],
    setLotteryList: (_: LotteryType[]) => {},
});
