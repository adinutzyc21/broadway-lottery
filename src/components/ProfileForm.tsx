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
    SelectChangeEvent,
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

    const handleSelectTicketQuantity = (e: SelectChangeEvent<string>) => {
        setFormData((prev) => ({ ...prev, ticketQty: e.target.value }));
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

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "10px",
                }}
            >
                <FormControl
                    sx={{ width: "49%", padding: "10px 0px 10px 0px" }}
                >
                    <TextField
                        variant="standard"
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </FormControl>
                <FormControl
                    sx={{ width: "49%", padding: "10px 0px 10px 0px" }}
                >
                    <TextField
                        variant="standard"
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </FormControl>

                <FormControl
                    sx={{ width: "100%", padding: "10px 0px 10px 0px" }}
                >
                    <TextField
                        variant="standard"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </FormControl>

                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Birth Date"
                            slotProps={{
                                popper: { placement: "right-end" },
                                textField: { variant: "standard" },
                            }}
                            onChange={handleBirthdateChange}
                            maxDate={dayjs().subtract(10, "years")}
                        />
                    </LocalizationProvider>
                </FormControl>
                <FormControl
                    sx={{ width: "200px", padding: "10px 0px 10px 0px" }}
                >
                    <InputLabel id="ticketQty">Ticket Quantity</InputLabel>
                    <Select
                        name="ticketQty"
                        value={formData.ticketQty}
                        onChange={handleSelectTicketQuantity}
                        variant="standard"
                        labelId="ticketQty"
                        label="Ticket Quantity"
                    >
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveProfile}
                sx={{ marginTop: "50px" }}
            >
                {editingIndex >= 0 ? "Update Profile" : "Save Profile"}
            </Button>
        </Container>
    );
};
