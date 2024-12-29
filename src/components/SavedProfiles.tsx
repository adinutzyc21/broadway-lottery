import {
    Button,
    Container,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import {
    Edit,
    Clear,
    ArrowBack,
    StarBorder,
    Star,
    Add,
} from "@mui/icons-material";
import { useContext, useEffect } from "react";
import { initialProfile, ProfilesContext } from "../utils/ProfilesContext";
import { Profile } from "../@types";

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
        mainProfileIndex,
        setMainProfileIndex,
        setFormData,
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

        chrome.storage.sync.get("mainProfileIndex", (storage) => {
            if (storage.mainProfileIndex) {
                setMainProfileIndex(storage.mainProfileIndex || 0);
            }
        });
    };

    const handleEditProfile = (index: number) => {
        setShowLotteryList(false);
        setShowSavedProfiles(false);
        setShowProfileForm(true);

        setEditingIndex(index);
        setFormData(index === -1 ? initialProfile : profiles[index]);

        if (index !== -1) {
            setNotification("Profile Loaded");
        }
    };

    const handleDeleteProfile = (index: number) => {
        const updatedProfiles = profiles.filter((_, i) => i !== index);
        setProfiles(updatedProfiles);
        chrome.storage.sync.set({ profiles: updatedProfiles }, () => {
            setNotification("Profile Deleted");
        });
    };
    const handleBackToLotteriesClick = (): void => {
        setShowLotteryList(true);
        setShowSavedProfiles(false);
        setShowProfileForm(false);
    };

    const handleAddProfileClick = (): void => {
        // clear the form
        setFormData(initialProfile);
        setEditingIndex(-1);

        setShowLotteryList(false);
        setShowSavedProfiles(false);
        setShowProfileForm(true);
    };

    const handleUpdateMainProfileClick = (index: number): void => {
        setMainProfileIndex(index);

        chrome.storage.sync.set({ mainProfileIndex: index }, () => {
            setNotification("Main Profile Updated");
        });
    };

    if (!showSavedProfiles) {
        return <></>;
    }

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
                        <IconButton
                            onClick={() => handleUpdateMainProfileClick(index)}
                        >
                            {index === mainProfileIndex ? (
                                <Star color="secondary" />
                            ) : (
                                <StarBorder />
                            )}
                        </IconButton>
                        <ListItemText
                            primary={
                                profile.profileName ||
                                `${profile.firstName} ${profile.lastName}`
                            }
                            onClick={() => handleUpdateMainProfileClick(index)}
                        />
                        <IconButton onClick={() => handleEditProfile(index)}>
                            <Edit color="info" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteProfile(index)}>
                            <Clear color="error" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            <Button
                variant="contained"
                color="secondary"
                onClick={handleAddProfileClick}
                startIcon={<Add />}
            >
                Add Profile
            </Button>
        </Container>
    );
};
