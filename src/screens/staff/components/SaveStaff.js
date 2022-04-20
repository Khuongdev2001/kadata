import React from "react";
import { Modal } from "../../../components";
import { StaffContext } from "../../../context/StaffContext";
import { TextField, Grid } from '@mui/material';

function SaveStaff() {
    const themeStaff = React.useContext(StaffContext);
    const [isShow, setIshow] = React.useState(false);
    themeStaff.handleAdd = function () {
        setIshow(true);
    }
    themeStaff.handleUpdate = function () {
        setIshow(true);
    }
    return (<Modal isShow={isShow} onClose={() => setIshow(false)} size="xl">
        <h2>Thêm Nhân Sự</h2>
        <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item xs={6}>
                <TextField
                    label="Mã nhân sự"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Tên ngân hàng"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Tên nhân sự"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Số tài khoản"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Cấp bậc"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Ngày công"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Số điện thoại"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Địa chỉ"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
        </Grid>
    </Modal>)
}


export default SaveStaff;
