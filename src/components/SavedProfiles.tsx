import {
    Alert,
    Box,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Snackbar,
    Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { ProfilesContext } from "../utils/ProfilesContext";
import { Profile } from "./MainApp";

export const SavedProfiles: React.FC = () => {
    const { profiles, setProfiles, setNotification, setEditingIndex } =
        useContext(ProfilesContext);

    useEffect(() => {
        loadProfiles();
    }, []);

    const loadProfiles = () => {
        chrome.storage.sync.get("profiles", (storage) => {
            if (storage.profiles) {
                setProfiles(storage.profiles);
            }
        });
    };

    const handleEditProfile = (index: number) => {
        setEditingIndex(index);
    };

    const handleDeleteProfile = (index: number) => {
        const updatedProfiles = profiles.filter((_, i) => i !== index);
        setProfiles(updatedProfiles);
        chrome.storage.sync.set({ profiles: updatedProfiles }, () => {
            setNotification("Profile Deleted");
        });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" mt={4} mb={2}>
                Saved Profiles
            </Typography>
            <List>
                {profiles.map((profile: Profile, index: number) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${profile.firstName} ${profile.lastName}`}
                        />
                        <IconButton onClick={() => handleEditProfile(index)}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteProfile(index)}>
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
