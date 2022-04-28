import React from "react";
import styles from "./advise.module.scss";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { BoxFlex } from "../../../components";
import CustomerItem from "./CustomerItem";
import StaffItem from "./StaffItem";
import dateFormat from "dateformat";
import { useAxiosAuth } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";


function Advise({ refer }) {
    const themeLogged = React.useContext(LoggedContext);
    refer.handleAdvise = function () {
        useAxiosAuth.post(`admin/event/create`, advise)
            .then(response => {
                const result = response.data;
                if (!result.status) {
                    const errorValue = {};
                    for (let field in result.data.errors) {
                        errorValue[field] = result.data.errors[field][0];
                    }
                    setErrors(errorValue);
                }
                else {
                    themeLogged.handleShowSnackBar(result.message);
                }
            })
            .catch(error => {
                alert(error);
            })
    }
    const [errors, setErrors] = React.useState({})
    const [advise, setAdvise] = React.useState({
        customer: [],
        staff: [],
        date_start_value: "",
        date_start: new Date(),
        code: ""
    });

    function handleChangeDateStart(value) {
        setAdvise({
            ...advise,
            date_start_value: dateFormat(value, "yyyy/mm/dd"),
            date_start: value
        });
    }
    return (<BoxFlex className={styles.listEvent}>
        <CustomerItem errors={errors} advise={advise} setAdvise={setAdvise} />
        <StaffItem errors={errors} advise={advise} setAdvise={setAdvise} />
        <div className={styles.eventInfo}>
            <div className={styles.createAt}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        value={advise.date_start}
                        label="Ngày diễn ra"
                        onChange={(value) => handleChangeDateStart(value)}
                        minDate={new Date()}
                        renderInput={(params) => <TextField sx={{
                            mt: 1
                        }} size="small" {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className={styles.eventCode}>
                <p>Mã Sự Kiện<small>(Mã này sẽ tự tạo)</small>:</p>
                <TextField size="small" fullWidth disabled value={advise.code} />
                <TextField
                    fullWidth
                    size="small"
                    sx={{ display: "block", mt: 2 }}
                    label="Tên Sự Kiện"
                    value={advise.name}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    onChange={(e) => setAdvise(prev => {
                        return {
                            ...prev,
                            name: e.target.value
                        }
                    })}
                />
            </div>
        </div>
    </BoxFlex>)
}

export default Advise;