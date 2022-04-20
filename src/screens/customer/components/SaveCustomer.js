import React from "react";
import { Modal } from "../../../components";
import { CustomerContext } from "../../../context/CustomerContext";
import { TextField, Grid } from '@mui/material';
function SaveCustomer() {
    const themeCustomer = React.useContext(CustomerContext);
    const [isShow, setIsShow] = React.useState(false);
    themeCustomer.handleUpdate = function () {
        setIsShow(true);
    }
    themeCustomer.handleAdd = function () {
        setIsShow(true);
    }
    return (<Modal isShow={isShow} onClose={() => setIsShow(false)} size="xl">
        <h2>Thêm Đối Tác</h2>
        <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item xs={6}>
                <TextField
                    label="Mã đối tác"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Tên đối tác"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Người quản lý"
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
    </Modal >)
}


export default SaveCustomer;