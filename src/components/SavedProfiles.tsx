import {
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { Edit, Delete, ArrowBack } from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { ProfilesContext } from "../utils/ProfilesContext";
import { Profile } from "./MainApp";

export const SavedProfiles: React.FC = () => {
    const {
        profiles,
        setProfiles,
        setNotification,
        setEditingIndex,
        showSavedProfiles,
        setShowLotteryList,
        setShowProfileForm,
        setShowSavedProfiles,
    } = useContext(ProfilesContext);

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
        setShowLotteryList(false);
        setShowSavedProfiles(false);
        setShowProfileForm(true);

        setEditingIndex(index);
    };

    const handleDeleteProfile = (index: number) => {
        const updatedProfiles = profiles.filter((_, i) => i !== index);
        setProfiles(updatedProfiles);
        chrome.storage.sync.set({ profiles: updatedProfiles }, () => {
            setNotification("Profile Deleted");
        });
    };

    if (!showSavedProfiles) {
        return <></>;
    }
    const handleBackToLotteriesClick = (): void => {
        setShowLotteryList(true);
        setShowSavedProfiles(false);
        setShowProfileForm(false);
    };

    const handleAddProfileClick = (): void => {
        setShowLotteryList(false);
        setShowSavedProfiles(false);
        setShowProfileForm(true);
    };

    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <IconButton
                    color="primary"
                    aria-label="Back to Lotteries"
                    onClick={handleBackToLotteriesClick}
                >
                    <ArrowBack />
                </IconButton>
                <h1 id="savedProfiles">Saved Profiles</h1>
            </div>

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

            <Button
                variant="contained"
                color="secondary"
                onClick={handleAddProfileClick}
            >
                Add Profile
            </Button>
        </Container>
    );
};
