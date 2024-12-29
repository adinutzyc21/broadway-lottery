import { createContext } from "react";
import { LotteryType, Profile } from "../@types";

type SetStateAction<S> = S | ((prevState: S) => S);

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
    setProfiles: (_: SetStateAction<Profile[]>) => {},
    editingIndex: -1,
    setEditingIndex: (_: SetStateAction<number>) => {},
    notification: "",
    setNotification: (_: SetStateAction<string>) => {},
    error: "",
    setError: (_: SetStateAction<string>) => {},
    showSavedProfiles: false,
    setShowSavedProfiles: (_: SetStateAction<boolean>) => {},
    showProfileForm: false,
    setShowProfileForm: (_: SetStateAction<boolean>) => {},
    showLotteryList: false,
    setShowLotteryList: (_: SetStateAction<boolean>) => {},
    mainProfileIndex: 0,
    setMainProfileIndex: (_: SetStateAction<number>) => {},
    lotteryList: [] as LotteryType[],
    setLotteryList: (_: SetStateAction<LotteryType[]>) => {},
    formData: initialProfile,
    setFormData: (_: SetStateAction<Profile>) => {},
});
