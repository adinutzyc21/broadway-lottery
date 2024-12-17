import React, { useEffect, useState } from "react";
import { Box, Alert, Snackbar } from "@mui/material";
import { ProfileForm } from "./ProfileForm";
import { SavedProfiles } from "./SavedProfiles";
import { ProfilesContext } from "../utils/ProfilesContext";
import { BroadwayLottery } from "./BroadwayLottery";

export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    ticketQty: string;
    month: string;
    day: string;
    year: string;
    zip: string;
    country: string;
}

const MainApp: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [editingIndex, setEditingIndex] = useState<number>(-1);
    const [notification, setNotification] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [showSavedProfiles, setShowSavedProfiles] = useState<boolean>(false);
    const [showProfileForm, setShowProfileForm] = useState<boolean>(false);
    const [showLotteryList, setShowLotteryList] = useState<boolean>(false);

    const value = {
        profiles,
        setProfiles,
        editingIndex,
        setEditingIndex,
        notification,
        setNotification,
        error,
        setError,
        showSavedProfiles,
        setShowSavedProfiles,
        showProfileForm,
        setShowProfileForm,
        showLotteryList,
        setShowLotteryList,
    };

    useEffect(() => {
        if (profiles.length) {
            setShowLotteryList(true);
            setShowProfileForm(false);
            setShowSavedProfiles(false);
        } else {
            setShowProfileForm(true);
            setShowLotteryList(false);
            setShowSavedProfiles(false);
        }
    }, [profiles.length === 0]);

    return (
        <Box>
            <ProfilesContext.Provider value={value}>
                <BroadwayLottery />
                <SavedProfiles />
                <ProfileForm />
            </ProfilesContext.Provider>

            <Snackbar
                open={!!notification}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={2000}
                onClose={() => setNotification("")}
            >
                <Alert severity="success">{notification}</Alert>
            </Snackbar>
            <Snackbar
                open={!!error}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                autoHideDuration={2000}
                onClose={() => setError("")}
            >
                <Alert severity="error">{error}</Alert>
            </Snackbar>
        </Box>
    );
};

export default MainApp;
