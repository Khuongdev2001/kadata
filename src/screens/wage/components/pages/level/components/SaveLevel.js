import React from "react";
import { Modal } from "../../../../../../components";
import { WageContext } from "../../../../../../context/WageContext";
import { TextField, Grid } from '@mui/material';
import SaveStaffLevel from "../validates/SaveStaffLevel";
import { initValue } from "../fields/initValue";
import { useAxiosAuth } from "../../../../../../hook/api"
import { LoggedContext } from "../../../../../../context/LoggedContext";;

function SaveLevel({ onSetStaffLevels }) {
    const themeLogged = React.useContext(LoggedContext);
    const action = React.useRef(initValue);
    const themeWage = React.useContext(WageContext);
    const [isShow, setIsShow] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [staffLevel, setStaffLevel] = React.useState({
        
    });
    themeWage.level = {
        ...themeWage.level,
        handleAdd: function () {
            action.current.isAdd = true;
            setIsShow(true);
            setStaffLevel(initValue)
        },
        handleUpdate: function (id, key) {
            setIsShow(true);
            setStaffLevel(initValue);
            action.current = {
                id,
                key,
                isAdd: false
            }
            useAxiosAuth.get(`admin/staff-level/view?id=${id}`)
                .then(response => {
                    const result = response.data;
                    if (result.status) {
                        setStaffLevel(result.data.staff_level);
                    }
                })
                .catch(e => {
                    alert(e);
                })
        }
    }

    function handleSubmit(e) {
        const url = action.current.isAdd
            ? "admin/staff-level/create"
            : `admin/staff-level/update?id=${action.current.id}`;
        const errors = SaveStaffLevel(staffLevel);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        useAxiosAuth.post(url, staffLevel)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    themeLogged.handleShowSnackBar(result.message);
                    if (action.current.isAdd) {
                        handleRenderAdd(result.data.staff_level);
                    }
                    else {
                        handleRenderUpdate(result.data.staff_level);
                    }
                    setIsShow(false);
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
        e.preventDefault();
    }

    function handleRenderAdd(staffLevel) {
        onSetStaffLevels((staffLevels) => ([
            ...staffLevels,
            staffLevel
        ]))
    }

    function handleRenderUpdate(staffLevel) {
        onSetStaffLevels((staffLevels) => {
            staffLevels[action.current.key] = staffLevel;
            return [...staffLevels];
        });
    }

    function handleChange(key, value) {
        setStaffLevel({
            ...staffLevel,
            [key]: value
        })
    }

    return (<Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIsShow(false)} size="sm">
        <h2>{action.current.isAdd ?
            "Thêm Cấp Bậc"
            : "Cập Nhật Cấp Bậc"
        }</h2>
        <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item xs={6}>
                <TextField
                    onChange={(e) => handleChange("name", e.target.value)}
                    error={errors.name || false}
                    helperText={errors.name || ""}
                    aria-readonly
                    label="Tên cấp bậc"
                    defaultValue="Giám Đốc"
                    id="filled-size-small"
                    fullWidth
                    value={staffLevel.name}
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    onChange={(e) => handleChange("pay_level", e.target.value)}
                    error={errors.pay_level || false}
                    helperText={errors.pay_level || ""}
                    label="Lương cơ bản"
                    id="filled-size-small"
                    fullWidth
                    value={staffLevel.pay_level}
                    size="small" />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    onChange={(e) => handleChange("allowance_pay", e.target.value)}
                    error={errors.allowance_pay || false}
                    helperText={errors.allowance_pay || ""}
                    label="Phụ cấp"
                    id="filled-size-small"
                    fullWidth
                    value={staffLevel.allowance_pay}
                    size="small" />
            </Grid>
        </Grid>
    </Modal>)
}


export default SaveLevel;
