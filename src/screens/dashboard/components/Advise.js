import React from "react";
import styles from "./advise.module.scss";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { BoxFlex } from "../../../components";
import CustomerItem from "./CustomerItem";
import StaffItem from "./StaffItem";


function Advise() {
    const [advise, setAdvise] = React.useState({
        customer: [],
        staff: [],
        date_start: null,
        event_code: "1212"
    });
    return (<BoxFlex className={styles.listEvent}>
        <CustomerItem advise={advise} setAdvise={setAdvise} />
        <StaffItem advise={advise} setAdvise={setAdvise} />
        <div className={styles.eventInfo}>
            <div className={styles.createAt}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Ngày diễn ra"
                        onChange={() => null}
                        renderInput={(params) => <TextField sx={{
                            mt: 1
                        }} size="small" {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className={styles.eventCode}>
                <p>Mã Sự Kiện<small>(Mã này sẽ tự tạo)</small>:</p>
                <TextField fullWidth value={advise.event_code} />
            </div>
        </div>
    </BoxFlex>)
}

export default Advise;