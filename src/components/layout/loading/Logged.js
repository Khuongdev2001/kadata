import React from "react";
import styles from "./themeLogged.module.scss";
import { BoxLoading, BoxLoadingCircle } from "../../";
function ThemeLoadingLogged() {
    return (
        <div className={styles.wpLoading}>
            <BoxLoading disable />
            <div className={styles.wpLogo}>
                <img src="/images/logo-kadita.png" alt="" />
                <BoxLoadingCircle className={styles.loadingItem} />
            </div>
        </div>
    )
}

export default ThemeLoadingLogged;