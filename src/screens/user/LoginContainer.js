import React from "react";
import { TextField, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import styles from "./listContainer.module.scss";
import { BoxFlex, Box, Image, BoxLink, SnackbarsStyled } from "../../components";
import LoginValidate, { field } from "./validates/LoginValidate";
import { useAxiosUnAuth, baseURL } from "../../hook/api";

function LoginContainer() {
    const [loading, setLoading] = React.useState(false);
    const [user, setUser] = React.useState(field);
    const [errors, setErrors] = React.useState({});
    function handleChange(key, value) {
        setUser({
            ...user,
            [key]: value
        });
    }

    function handleLogin(e) {
        e.preventDefault();
        const errors = LoginValidate(user);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        setLoading(true);
        useAxiosUnAuth.post("admin/site/login", user)
            .then(response => {
                const result = response.data;
                if (!result.status) {
                    setErrors({ login: result.message });
                    return false;
                }
                // handle login success
                localStorage.setItem("user", JSON.stringify(result.data));
                window.location.href = `/dashboard`;
            })
            .catch(error => {
                alert(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return (
        <BoxFlex className={styles.wrapper}>
            {errors.login && (
                <SnackbarsStyled
                    type="error"
                >
                    {errors.login}
                </SnackbarsStyled>
            )}
            <Box className={styles.bgLogin}>
                <Image src="images/bg-login.png" alt="bg-login" />
            </Box>
            <Box className={styles.outerWpForm}>
                <BoxFlex className={styles.wpForm} justifyContent="center">
                    <BoxLink href="" className={styles.logo}>
                        <Image src="images/logo-kadita.png" />
                    </BoxLink>
                    <form onSubmit={handleLogin} action="" className={styles.form}>
                        <h1 className={styles.title}>Đăng Nhập</h1>
                        <div className={styles.formGroup}>
                            <TextField
                                error={Boolean(errors.email)}
                                helperText={errors.email || ""}
                                value={user.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                id="outlined-error"
                                label="Email"
                                size="small"
                                fullWidth
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <TextField
                                error={Boolean(errors.password)}
                                helperText={errors.password || ""}
                                value={user.password}
                                onChange={(e) => handleChange("password", e.target.value)}
                                id="outlined-error"
                                label="Password"
                                size="small"
                                type="password"
                                fullWidth
                            />
                        </div>
                        <Box className={styles.formGroup}>
                            <LoadingButton type="unset" loading={loading} variant="contained" color="success" fullWidth>
                                Đăng Nhập
                            </LoadingButton>
                        </Box>
                    </form>
                </BoxFlex>
            </Box>
        </BoxFlex>
    )
}

export default LoginContainer;