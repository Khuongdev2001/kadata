import React from "react";
import styles from "./saveAdmin.module.scss";
import { Modal, BoxLoading } from "../../../components";
import { AdminContext } from "../../../context/AdminContext";
import { LoggedContext } from "../../../context/LoggedContext";
import { TextField, Grid, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useAxiosAuth } from "../../../hook/api";
import SaveAdminValidate from "../validates/SaveAdmin";

function SaveAdmin({ onSetAdmins }) {
    const themeCustomer = React.useContext(AdminContext);
    const themeLogged = React.useContext(LoggedContext);
    const [isShow, setIsShow] = React.useState(false);
    const boxLoadingRef=React.useRef({});
    const action = React.useRef({
        adminId: null,
        isAdd: true,
        isLoad: false
    });
    const [errors, setErrors] = React.useState({});
    const [admin, setAdmin] = React.useState({
        email: "",
        fullname: "",
        password: "",
        password_confirm: "",
        status: 0
    });
    themeCustomer.handleUpdate = function (id, key) {
        action.current.id = id;
        action.current.key = key;
        useAxiosAuth.get(`admin/site/view?id=${id}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setAdmin(result.data.user);
                    console.log(result.data.user);
                }
            })
            .catch(e => {
                alert(e);
            })
        action.current.isAdd = false;
        setErrors({});
        setIsShow(true);
    }
    themeCustomer.handleAdd = function () {
        action.current.isAdd = true;
        setErrors({});
        setIsShow(true);
    }

    function handleSubmit() {
        const url = action.current.isAdd
            ? "admin/site/create"
            : `admin/site/update?id=${action.current.id}`;
        const errors = SaveAdminValidate(admin, action);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        boxLoadingRef.current.setIsShow(true);
        useAxiosAuth.post(url, admin)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    themeLogged.handleShowSnackBar(result.message);
                    if (action.current.isAdd) {
                        handleRenderAdd(result.data.user);
                    }
                    else {
                        handleRenderUpdate(result.data.user);
                    }
                    boxLoadingRef.current.setIsShow(false);
                    setIsShow(false);
                    return;
                }
                setErrors({
                    email: result.data.email ? result.data.email[0] : null
                })
            })
    }

    function handleRenderAdd(admin) {
        onSetAdmins((admins) => ([
            ...admins,
            admin
        ]))
    }

    function handleRenderUpdate(admin) {
        onSetAdmins((admins) => {
            admins[action.current.key] = admin;
            return [...admins];
        });
    }
    return (
        <Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIsShow(false)} position="center">
            <BoxLoading refer={boxLoadingRef} disableClick />
            <h2>{action.current.isAdd ?
                "Thêm Quản Trị"
                : "Cập Nhật Quản Trị"
            }</h2>
            <Grid container spacing={2} sx={{ py: 2 }}>
                <Grid item xs={6}>
                    <TextField
                        error={errors.email}
                        helperText={errors.email || ""}
                        label="Email"
                        id="filled-size-small"
                        fullWidth
                        size="small"
                        value={admin.email}
                        onChange={(e) => setAdmin((admin) => ({
                            ...admin,
                            email: e.target.value
                        }))}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        error={errors.fullname}
                        helperText={errors.fullname || ""}
                        value={admin.fullname}
                        label="Họ và Tên"
                        id="filled-size-small"
                        fullWidth
                        size="small"
                        onChange={(e) => setAdmin((admin) => ({
                            ...admin,
                            fullname: e.target.value
                        }))}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormGroup>
                        <FormControlLabel
                            onChange={(e) => {
                                setAdmin((admin) => ({
                                    ...admin,
                                    status: Number(!admin.status)
                                }))
                            }}
                            control={<Checkbox checked={admin.status == 1} />} label="Kích Hoạt" />
                    </FormGroup>
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        error={errors.password}
                        helperText={errors.password || ""}
                        label="Mật khẩu"
                        id="filled-size-small"
                        fullWidth
                        value={admin.password}
                        size="small"
                        onChange={(e) => setAdmin((admin) => ({
                            ...admin,
                            password: e.target.value
                        }))} />
                </Grid>
            </Grid>
        </Modal >)
}


export default SaveAdmin;