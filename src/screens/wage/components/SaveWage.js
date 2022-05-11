import React from "react";
import { Modal } from "../../../components";
import { WageContext } from "../../../context/WageContext";
import { TextField, Grid, Select, MenuItem } from '@mui/material';
import { useAxiosAuth } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";

function SaveWage({ onSetWages }) {
    const themeLogged = React.useContext(LoggedContext);
    const themeWage = React.useContext(WageContext);
    const [isShow, setIshow] = React.useState(false);
    const actionRef = React.useRef({ id: null, key: null });
    const [wage, setWage] = React.useState({})
    themeWage.handleAdd = function (id, key) {
        setIshow(true);
        actionRef.current = { id, key };
        useAxiosAuth.get(`admin/wage-staff/view?id=${actionRef.current.id}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setWage(result.data.wage);
                }
            })
            .catch(e => {
                alert(e);
            })
    }

    function handleUpdate() {
        useAxiosAuth.post(`admin/wage-staff/update?id=${actionRef.current.id}`, wage)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setWage({});
                    onSetWages((prevState => {
                        prevState.items[actionRef.current.key] = result.data.wage;
                        return {
                            ...prevState,
                        };
                    }));
                    setIshow(false);
                    themeLogged.handleShowSnackBar(result.message);
                }
            })
            .catch(e => {
                alert(e);
            })
    }

    return (<Modal isShow={isShow}
        showModalFooter={!wage.status_check}
        onSubmit={handleUpdate}
        onClose={() => setIshow(false)} size="xl">
        <h2>Cập Nhật Lương</h2>
        <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item xs={2}>
                <TextField
                    value={wage.staff_code || ""}
                    disabled
                    label="MNS"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    value={wage.level || ""}
                    disabled
                    label="Cấp bậc"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    value={wage.fullname || ""}
                    disabled
                    label="Tên nhân viên"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    value={wage.phone || ""}
                    disabled
                    label="SĐT"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    value={wage.basic_pay || ""}
                    disabled
                    label="Lương Cơ Bản"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    value={wage.piece_pay || ""}
                    disabled
                    label="Lương doanh số"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    value={wage.allowance_pay || ""}
                    label="Phụ cấp"
                    id="filled-size-small"
                    fullWidth
                    size="small"
                    onChange={(e) => {
                        setWage({
                            ...wage,
                            allowance_pay: e.target.value
                        });
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={wage.status || 0}
                    onChange={(e) => {
                        setWage({
                            ...wage,
                            status: e.target.value
                        });
                    }}
                    autoWidth
                    size="small"
                    label="Trạng thái"
                >
                    <MenuItem value={0}>Đã Tính Lương</MenuItem>
                    <MenuItem value={1}>Đã Chuyển Khoản</MenuItem>
                    <MenuItem value={3}>Đã chuyển tiền mặt</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    value={wage.total_pay || ""}
                    disabled
                    label="Tổng"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
        </Grid>
    </Modal>)
}


export default SaveWage;
