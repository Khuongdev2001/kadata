import React from "react";
import { Modal } from "../../../components";
import { StaffContext } from "../../../context/StaffContext";
import { TextField, Grid } from '@mui/material';
import StaffLevel from "./StaffLevel";
import { initValue } from "./FieldStaff";
import SaveStaffValidate from "../validates/SaveStaff";
import { useAxiosAuth } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";

function SaveStaff({ onSetStaffs }) {
    const themeLogged = React.useContext(LoggedContext);
    const themeStaff = React.useContext(StaffContext);
    const [isShow, setIsShow] = React.useState(false);
    const action = React.useRef({
        staffId: null,
        isAdd: true,
        isLoad: false
    });
    const staffRef = React.useRef({});
    const [staff, setStaff] = React.useState(initValue);
    const [errors, setErrors] = React.useState({});
    themeStaff.handleAdd = function () {
        action.current.isAdd = true;
        setStaff(initValue);
        setErrors({});
        setIsShow(true);
    }
    themeStaff.handleUpdate = function (id, key) {
        action.current.id = id;
        action.current.key = key;
        useAxiosAuth.get(`admin/staff/view?id=${id}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setStaff(result.data.staff);
                }
            })
            .catch(e => {
                alert(e);
            })
        action.current.isAdd = false;
        setStaff(initValue);
        setErrors({});
        setIsShow(true);
    }

    function handleSubmit() {
        const url = action.current.isAdd
            ? "admin/staff/create"
            : `admin/staff/update?id=${action.current.id}`;
        const errors = SaveStaffValidate(staff);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        useAxiosAuth.post(url, staff)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    themeLogged.handleShowSnackBar(result.message);
                    if (action.current.isAdd) {
                        handleRenderAdd(result.data.staff);
                    }
                    else {
                        handleRenderUpdate(result.data.staff);
                    }
                    setIsShow(false);
                    setStaff(initValue);
                    return;
                }
                else {
                    const errors = result.data;
                    const errorArr = [];
                    for (let error in errors) {
                        errorArr[error] = errors[error][0];
                    }
                    setErrors(errorArr);
                }
            })
    }

    function handleRenderAdd(staff) {
        onSetStaffs((staffs) => ([
            ...staffs,
            staff
        ]))
    }

    function handleRenderUpdate(staff) {
        onSetStaffs((staffs) => {
            staffs[action.current.key] = staff;
            return [...staffs];
        });
    }

    function handleChangeField(key, value) {
        setStaff({
            ...staff,
            [key]: value
        });
    }

    return (<Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIsShow(false)} size="xl">
        <h2>
            {action.current.isAdd ?
                "Thêm Nhân Sự"
                : "Cập Nhật Nhân Sự"
            }
        </h2>
        <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item xs={6}>
                <TextField
                    value={staff.fullname}
                    error={Boolean(errors.fullname)}
                    helperText={errors.fullname || ""}
                    onChange={(e) => handleChangeField("fullname", e.target.value)}
                    label="Tên nhân sự"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    value={staff.bank_account_name}
                    error={Boolean(errors.bank_account_name)}
                    helperText={errors.bank_account_name || ""}
                    onChange={(e) => handleChangeField("bank_account_name", e.target.value)}
                    label="Tên ngân hàng"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    value={staff.bank_account_number}
                    error={Boolean(errors.bank_account_number)}
                    helperText={errors.bank_account_number || ""}
                    onChange={(e) => handleChangeField("bank_account_number", e.target.value)}
                    label="Số tài khoản"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <StaffLevel errors={errors} staff={staff} onSetStaff={setStaff} />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    value={staff.work_day}
                    disabled
                    label="Ngày công"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    value={staff.staff_code}
                    disabled
                    label="Mã nhân sự"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    value={staff.phone}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone || ""}
                    onChange={(e) => handleChangeField("phone", e.target.value)}
                    label="Số điện thoại"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    value={staff.address}
                    error={Boolean(errors.address)}
                    helperText={errors.address || ""}
                    onChange={(e) => handleChangeField("address", e.target.value)}
                    label="Địa chỉ"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
        </Grid>
    </Modal>)
}


export default SaveStaff;
