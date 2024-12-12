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

export const BroadwayLottery: React.FC = () => {
    const { profiles, setProfiles, setNotification, setEditingIndex } =
        useContext(ProfilesContext);

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
                //     window.open(show.url, "_blank");
                console.log(show.name);
            }
        );
    };

    return (
        <Container>
            <h1 id="lotteries">Broadway Direct Lotteries</h1>
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
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CheckCircleIcon />}
                    onClick={handleSelectAll}
                    style={{ marginRight: "10px" }}
                >
                    {!allSelected ? "Select All" : "Unselect All"}
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<OpenInNewIcon />}
                    onClick={handleOpenSelected}
                    disabled={selectedShows.length === 0}
                >
                    Open Selected
                </Button>
            </div>
        </Container>
    );
};

export default BroadwayLottery;
