import React from "react";
import { TextField, Button } from '@mui/material';
import styles from "./listContainer.module.scss";
import { BoxFlex, Box, Image, BoxLink } from "../../components";

function LoginContainer() {
    return (
        <BoxFlex className={styles.wrapper}>
            <Box className={styles.bgLogin}>
                <Image src="images/bg-login.png" alt="bg-login" />
            </Box>
            <Box className={styles.outerWpForm}>
                <BoxFlex className={styles.wpForm} justifyContent="center">
                    <BoxLink href="" className={styles.logo}>
                        <Image src="images/logo-kadita.png" />
                    </BoxLink>
                    <form action="" className={styles.form}>
                        <span className={styles.subTitle}>Welcome back</span>
                        <h1 className={styles.title}>Login to your account</h1>
                        <div className={styles.formGroup}>
                            <TextField
                                error
                                id="outlined-error"
                                label="Email"
                                defaultValue="dev@gmail.com"
                                size="small"
                                fullWidth
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <TextField
                                id="outlined-error"
                                label="Password"
                                size="small"
                                fullWidth
                                defaultValue="Hello World"
                            />
                        </div>
                        <Box className={styles.formGroup}>
                            <Button variant="contained" color="success" fullWidth>
                                Đăng Nhập
                            </Button>
                        </Box>
                    </form>
                    <Box className={styles.boxButton}>
                        <span>Dont have an account? </span>
                        <a href="" className={styles.linkSignup}>Signup</a>
                    </Box>
                </BoxFlex>
            </Box>
        </BoxFlex>
    )
}

export default LoginContainer;