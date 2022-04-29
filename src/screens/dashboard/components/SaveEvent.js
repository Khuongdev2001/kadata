import React, { useContext } from "react";
import { Modal } from "../../../components";
import { DashboardContext } from "../../../context/DashboardContext";
import styles from "./saveEvent.module.scss";
import ResultEvent from "./ResultEvent";
import Advise from "./Advise";
import { Tab, Box } from "@mui/material";
import { TabList, TabPanel, TabContext } from '@mui/lab';
import { useAxiosAuth } from "../../../hook/api";

function SaveEvent() {
    const [tab, setTab] = React.useState(1);
    const themeDashboard = useContext(DashboardContext);
    const adviseRef = React.useRef({});
    const eventRef = React.useRef({
        id: null,
        key: null,
        isAdd: true
    })
    themeDashboard.handleUpdate = (id, key) => {
        eventRef.current = {
            id, key, isAdd: false
        };
        setIshow(true);
    }
    themeDashboard.handleAdd = () => {
        eventRef.current.isAdd = true;
        setIshow(true);
    }
    const [isShow, setIshow] = React.useState(false);

    function handleChangeTab(e, value) {
        setTab(value);
    }
    return (<Modal isShow={isShow} className={styles.wpEvent} showModalFooter={false} onClose={() => setIshow(false)} size="lg">
        <div className={styles.containerEvent}>
            <TabContext value={tab}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList value={tab} onChange={handleChangeTab} aria-label="basic tabs example">
                            <Tab label="Sắp Xếp Tư Vấn" value={1} />
                            {!eventRef.current.isAdd && <Tab label="Sắp Xếp Trả Kết Quả" value={2} />}
                        </TabList>
                    </Box>
                    <TabPanel value={1} index={0}>
                        <Advise onIsShow={setIshow} eventRef={eventRef} />
                    </TabPanel>
                    {!eventRef.current.isAdd && (
                        <TabPanel value={2} index={1}>
                            <ResultEvent />
                        </TabPanel>
                    )}
                </Box>
            </TabContext>
        </div>
    </Modal>)
}

export default SaveEvent;