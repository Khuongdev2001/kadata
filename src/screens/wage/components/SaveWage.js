import React from "react";
import { Modal } from "../../../components";
import { WageContext } from "../../../context/WageContext";
import { TextField, Grid } from '@mui/material';

function SaveWage() {
    const themeWage = React.useContext(WageContext);
    const [isShow, setIshow] = React.useState(false);
    themeWage.handleAdd = function () {
        setIshow(true);
    }
    return (<Modal isShow={isShow} onClose={() => setIshow(false)} size="xl">
        <h2>Cập Nhật Lương</h2>
        <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item xs={2}>
                <TextField
                    aria-readonly
                    label="MNS"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    label="Cấp bậc"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Tên nhân viên"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="SĐT"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Lương Cơ Bản"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Lương doanh số"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Phụ cấp"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Tổng"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
        </Grid>
    </Modal>)
}


export default SaveWage;
