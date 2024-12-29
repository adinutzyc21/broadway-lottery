import { useEffect, ChangeEvent, useContext } from "react";
import {
    Button,
    TextField,
    MenuItem,
    Container,
    IconButton,
} from "@mui/material";
import { ProfilesContext, initialProfile } from "../utils/ProfilesContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ArrowBack } from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Profile } from "../@types";

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
        formData,
        setFormData,
    } = useContext(ProfilesContext);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name) {
            setFormData((prev) => ({ ...prev, [name]: value as string }));
        }
    };

    const handleBirthdateChange = (value: Dayjs | null): void => {
        setFormData((prev) => ({
            ...prev,
            birthDate: value?.toString() || "",
        }));
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
        if (!formData.birthDate) errors.push("Please enter your birth date.");
        if (!formData.ticketQty)
            errors.push("Please select a ticket quantity.");
        if (errors.length) {
            setError(errors.join(" "));
            return false;
        }
        return true;
    };

    const handleBackToSavedProfilesClick = (): void => {
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
                </IconButton>
                <h1 id="profileForm">
                    {editingIndex >= 0 ? " Edit Profile" : " Add Profile"}
                </h1>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "10px",
                }}
            >
                <TextField
                    variant="standard"
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <TextField
                    variant="standard"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />

                <TextField
                    variant="standard"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Birth Date"
                        slotProps={{
                            popper: { placement: "right-end" },
                            textField: { variant: "standard" },
                        }}
                        onChange={handleBirthdateChange}
                        maxDate={dayjs().subtract(10, "years")}
                        value={dayjs(formData.birthDate)}
                    />
                </LocalizationProvider>

                <TextField
                    variant="standard"
                    label="Ticket Quantity"
                    name="ticketQty"
                    value={formData.ticketQty}
                    onChange={handleInputChange}
                    select
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                </TextField>

                <TextField
                    variant="standard"
                    label="Zip Code"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                />

                <TextField
                    variant="standard"
                    label="Country of Residence"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                />
            </div>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveProfile}
                sx={{ marginTop: "20px" }}
            >
                {editingIndex >= 0 ? "Update Profile" : "Save Profile"}
            </Button>
        </Container>
    );
};
