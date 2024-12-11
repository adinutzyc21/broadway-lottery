import { createContext } from "react";
import { Profile } from "../components/MainApp";

export const initialProfile = {
    firstName: "",
    lastName: "",
    email: "",
    ticketQty: "",
    month: "",
    day: "",
    year: "",
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
});
