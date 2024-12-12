import React, { useState } from "react";
import {
    Box,
    Typography,
    Alert,
    IconButton,
    Tooltip,
    Snackbar,
} from "@mui/material";
import { HelpOutline } from "@mui/icons-material";
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
    const instructions =
        "NOTE: For first time users, click 'Edit Profile' to set up a profile. \
        To begin, simply check the Broadway Shows you wish to enter the lottery for \
        and hit the 'Open Selected' button.  The selected shows will open in new tabs. \
        If there is a lottery to enter for that specific show, then the form will be autofilled. \
        To submit the lottery, visit each tab with an available drawing and submit the form. \
        Make sure you complete the captcha before submitting. \
        Good luck!";

    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [editingIndex, setEditingIndex] = useState<number>(-1);
    const [notification, setNotification] = useState<string>("");
    const [error, setError] = useState<string>("");

    const value = {
        profiles,
        setProfiles,
        editingIndex,
        setEditingIndex,
        notification,
        setNotification,
        error,
        setError,
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4">
                Broadway Lottery
                <Tooltip title={instructions}>
                    <IconButton>
                        <HelpOutline />
                    </IconButton>
                </Tooltip>
            </Typography>
            <ProfilesContext.Provider value={value}>
                <ProfileForm />
                <SavedProfiles />
                <BroadwayLottery />
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
