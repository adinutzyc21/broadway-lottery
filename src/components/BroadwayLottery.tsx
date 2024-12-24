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
    ButtonGroup,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { ProfilesContext } from "../utils/ProfilesContext";
import { Circle } from "@mui/icons-material";
import { LotteryType } from "../@types";
import RefreshIcon from "@mui/icons-material/Refresh";
import Person2Icon from "@mui/icons-material/Person2";

export const BroadwayLottery: React.FC = () => {
    const {
        showLotteryList,
        setShowLotteryList,
        setShowSavedProfiles,
        setShowProfileForm,
        lotteryList,
        setLotteryList,
    } = useContext(ProfilesContext);

    const [selectedShows, setSelectedShows] = useState<number[]>([]);
    const [allSelected, setAllSelected] = useState<boolean>(false);
    const [tabId, setTabId] = useState<number>();

    useEffect(() => {
        loadLotteryList();
    }, []);

    useEffect(() => {
        setAllSelected(
            lotteryList.length !== 0 &&
                selectedShows.length === lotteryList.length
        );
    }, [selectedShows]);

    const handleGetLotteries = () => {
        chrome.tabs.create(
            {
                url: "https://lottery.broadwaydirect.com/",
                active: false,
            },
            (myTab) => {
                setTabId(myTab.id);
            }
        );
    };

    chrome.tabs.onRemoved.addListener(function (closedTabId, removed) {
        if (closedTabId === tabId) {
            loadLotteryList();
        }
    });

    const loadLotteryList = () => {
        chrome.storage.sync.get("lotteries", (storage) => {
            if (storage.lotteries) {
                setLotteryList(storage.lotteries);
            } else {
                handleGetLotteries();
            }
        });
    };

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
            setSelectedShows(lotteryList.map((show) => show.id));
        }
    };

    const handleOpenSelected = (): void => {
        lotteryList
            .filter((show) => selectedShows.includes(show.id))
            .forEach((show) => {
                chrome.tabs.create({
                    url: `${show.url}?bwayExt=true`,
                    active: false,
                });
            });
    };

    const handleSeeProfilesClick = (): void => {
        setShowLotteryList(false);
        setShowSavedProfiles(true);
        setShowProfileForm(false);
    };

    const buttonRow = lotteryList.length ? (
        <ButtonGroup
            variant="outlined"
            aria-label="Lottery Actions Group"
            fullWidth
            size="small"
        >
            <Button
                color={!allSelected ? "success" : "warning"}
                startIcon={!allSelected ? <CheckCircleIcon /> : <Circle />}
                onClick={handleSelectAll}
            >
                {!allSelected ? "Select All" : "Unselect All"}
            </Button>
            <Button
                color="primary"
                startIcon={<OpenInNewIcon />}
                onClick={handleOpenSelected}
                disabled={selectedShows.length === 0}
                variant="contained"
            >
                Open Selected
            </Button>
        </ButtonGroup>
    ) : (
        <></>
    );

    const menuRow = (
        <ButtonGroup
            variant="text"
            aria-label="Lottery Actions Group"
            size="small"
            orientation="vertical"
            sx={{ marginBottom: "20px", float: "right", border: "1px black" }}
        >
            <Button
                color="secondary"
                startIcon={<Person2Icon />}
                onClick={handleSeeProfilesClick}
                sx={{ justifyContent: "flex-start" }}
            >
                Edit Profiles
            </Button>

            <Button
                color="success"
                startIcon={<RefreshIcon />}
                onClick={handleGetLotteries}
                sx={{ justifyContent: "flex-start" }}
            >
                Refresh Lotteries
            </Button>
        </ButtonGroup>
    );

    if (!showLotteryList) {
        return <></>;
    }

    return (
        <Container>
            {menuRow}
            <h1 id="lotteryList" style={{ width: "100%" }}>
                Broadway Lotteries
            </h1>
            {buttonRow}
            <List>
                {lotteryList.map((lottery: LotteryType) => (
                    <ListItem
                        key={lottery.id}
                        divider
                        secondaryAction={
                            <Checkbox
                                checked={selectedShows.includes(lottery.id)}
                                onChange={() =>
                                    handleCheckboxChange(lottery.id)
                                }
                            />
                        }
                    >
                        <ListItemAvatar>
                            <Avatar alt={lottery.name} src={lottery.img} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={lottery.name}
                            secondary={lottery?.theater || lottery?.price}
                        />
                    </ListItem>
                ))}
            </List>
            {lotteryList.length > 7 && buttonRow}
        </Container>
    );
};

export default BroadwayLottery;
