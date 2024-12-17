import { useState, useEffect, ChangeEvent, useContext } from "react";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Container,
    IconButton,
} from "@mui/material";
import { ProfilesContext, initialProfile } from "../utils/ProfilesContext";
import { Profile } from "./MainApp";
import { ArrowBack } from "@mui/icons-material";

export const ProfileForm: React.FC = () => {
    const {
        profiles,
        setProfiles,
        setEditingIndex,
        editingIndex,
        setNotification,
        setError,
        showProfileForm,
        setShowLotteryList,
        setShowProfileForm,
        setShowSavedProfiles,
    } = useContext(ProfilesContext);

    const [formData, setFormData] = useState<Profile>(initialProfile);

    useEffect(() => {
        setFormData(
            editingIndex === -1 ? initialProfile : profiles[editingIndex]
        );

        if (editingIndex !== -1) {
            setNotification("Profile Loaded");
        }
    }, [editingIndex]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name) {
            setFormData((prev) => ({ ...prev, [name]: value as string }));
        }
    };

    const handleSaveProfile = () => {
        if (formValidation()) {
            const updatedProfiles = [...profiles];
            if (editingIndex >= 0) {
                updatedProfiles[editingIndex] = formData;
                setEditingIndex(-1);
            } else {
                updatedProfiles.push(formData);
            }
            setProfiles(updatedProfiles);
            chrome.storage.sync.set({ profiles: updatedProfiles }, () => {
                setNotification("Profile Saved");
            });

            // show the saved profiles
            handleBackToSavedProfilesClick();
        }
    };

    const formValidation = (): boolean => {
        const errors: string[] = [];
        if (!formData.firstName) errors.push("First name is required.");
        if (!formData.lastName) errors.push("Last name is required.");
        if (!formData.email.match(/^\S+@\S+\.\S+$/))
            errors.push("Invalid email.");
        if (errors.length) {
            setError(errors.join(" "));
            return false;
        }
        return true;
    };

    const handleBackToSavedProfilesClick = (): void => {
        // clear the form
        setFormData(initialProfile);

        setShowLotteryList(false);
        setShowSavedProfiles(true);
        setShowProfileForm(false);
    };

    if (!showProfileForm) {
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
                    onClick={handleBackToSavedProfilesClick}
                >
                    <ArrowBack />
                </IconButton>{" "}
                <h1 id="profileForm">
                    {editingIndex >= 0 ? "Edit Profile" : "Add Profile"}
                </h1>
            </div>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Ticket Quantity</InputLabel>
                <Select
                    name="ticketQty"
                    value={formData.ticketQty}
                    // onChange={handleSelectChange}
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveProfile}
            >
                {editingIndex >= 0 ? "Update Profile" : "Save Profile"}
            </Button>
        </Container>
    );
};
