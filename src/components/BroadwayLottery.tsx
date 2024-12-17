import React, { useState, useContext, useEffect } from "react";
import {
    Container,
    Checkbox,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { LOTTERY_LIST } from "../utils/constants";
import { ProfilesContext } from "../utils/ProfilesContext";
import { Circle } from "@mui/icons-material";

export const BroadwayLottery: React.FC = () => {
    const {
        showLotteryList,
        setShowLotteryList,
        setShowSavedProfiles,
        setShowProfileForm,
    } = useContext(ProfilesContext);

    const [selectedShows, setSelectedShows] = useState<number[]>([]);
    const [allSelected, setAllSelected] = useState<boolean>(false);

    useEffect(() => {
        setAllSelected(selectedShows.length === LOTTERY_LIST.length);
    }, [selectedShows]);

    // Toggle selection for a single show
    const handleCheckboxChange = (id: number): void => {
        setSelectedShows((prev) =>
            prev.includes(id)
                ? prev.filter((showId) => showId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = (): void => {
        if (allSelected) {
            setSelectedShows([]);
        } else {
            setSelectedShows(LOTTERY_LIST.map((show) => show.id));
        }
    };

    const handleOpenSelected = (): void => {
        LOTTERY_LIST.filter((show) => selectedShows.includes(show.id)).forEach(
            (show) => {
                chrome.tabs.create({
                    url: `${show.url}?bwayExt=true`,
                    active: false,
                });
            }
        );
    };

    const buttonRow = (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button
                variant="contained"
                color={!allSelected ? "success" : "warning"}
                startIcon={!allSelected ? <CheckCircleIcon /> : <Circle />}
                onClick={handleSelectAll}
                style={{ marginRight: "10px", width: "165px" }}
            >
                {!allSelected ? "Select All" : "Unselect All"}
            </Button>
            <Button
                variant="contained"
                color="primary"
                startIcon={<OpenInNewIcon />}
                onClick={handleOpenSelected}
                disabled={selectedShows.length === 0}
            >
                Open Selected
            </Button>
        </div>
    );

    const handleSeeProfilesClick = (): void => {
        setShowLotteryList(false);
        setShowSavedProfiles(true);
        setShowProfileForm(false);
    };

    if (!showLotteryList) {
        return <></>;
    }

    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h1 id="lotteries">Broadway Direct Lotteries</h1>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSeeProfilesClick}
                    style={{ marginLeft: "auto" }}
                >
                    See Profiles
                </Button>
            </div>
            {buttonRow}
            <List>
                {LOTTERY_LIST.map((show) => (
                    <ListItem key={show.id} divider>
                        <ListItemAvatar>
                            <Avatar alt={show.name} src={show.img} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={show.name}
                            secondary={show.theater}
                        />
                        <ListItemSecondaryAction>
                            <Checkbox
                                checked={selectedShows.includes(show.id)}
                                onChange={() => handleCheckboxChange(show.id)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            {buttonRow}
        </Container>
    );
};

export default BroadwayLottery;
