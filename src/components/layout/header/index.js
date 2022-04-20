import React from "react";
import { Box, BoxFlex } from "../../";
import styles from "./header.module.scss";
import FontAwesome from "react-fontawesome";
import { Button, Avatar } from '@mui/material';

function Header() {
    return (<header className={styles.header}>
        <BoxFlex justifyContent="space-between" alignItems="center">
            <Box className={styles.headerLeft}>
                <span>Dashboard overview</span>
            </Box>
            <BoxFlex alignItems="center" className={styles.headerRight}>
                <span className={[styles.title, styles.help, styles.ml].join(" ")}>Help guides</span>
                <span className={[styles.inbox, styles.ml].join(" ")}>
                    Inbox <FontAwesome name="inbox" />
                </span>
                <Button color="secondary" className={styles.ml} variant="contained" size="small">
                    Download client
                </Button>
                <Box className={[styles.boxAvatar, styles.ml].join(" ")}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <span className={styles.circular}></span>
                </Box>
            </BoxFlex>
        </BoxFlex>
    </header>)
}

export default Header;