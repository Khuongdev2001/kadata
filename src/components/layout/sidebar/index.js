import React from "react";
import styles from "./sidebar.module.scss";
import { BoxLink, BoxFlex } from "../../";
import { NavLink } from "react-router-dom";
function SideBar() {
    return (<div className={styles.sidebar}>
        <BoxFlex className={styles.sidebarTop} alignItems="center">
            <BoxLink>
                <img src="images/logo-small.png" alt="logo-small" />
            </BoxLink>
            <p className={styles.sidebarTitle}>KADITA Edutech</p>
        </BoxFlex>
        <ul className={styles.sidebarMenu}>
            <li className={[styles.menuItem].join(" ")}>
                <NavLink to="/dashboard" className={({ isActive }) => {
                    return styles.menuLink + " " + (isActive ? styles.active : "")
                }}>Sự kiện</NavLink>
            </li>
            <li className={styles.menuItem}>
                <NavLink to="/customer" className={({ isActive }) => {
                    return styles.menuLink + " " + (isActive ? styles.active : "")
                }}>Quản lý  đối tác</NavLink>
            </li>
            <li className={styles.menuItem}>
                <NavLink to="/staff" className={({ isActive }) => {
                    return styles.menuLink + " " + (isActive ? styles.active : "")
                }}>Quản lý nhân sự</NavLink>
            </li>
            <li className={styles.menuItem}>
                <NavLink to="/wage" className={({ isActive }) => {
                    return styles.menuLink + " " + (isActive ? styles.active : "")
                }}>Quản lý lương</NavLink>
            </li>
            <li className={styles.menuItem}>
                <NavLink to="/feedback" className={({ isActive }) => {
                    return styles.menuLink + " " + (isActive ? styles.active : "")
                }}>Quản lý phản hồi</NavLink>
            </li>
            <li className={styles.menuItem}>
                <NavLink to="/admin" className={({ isActive }) => {
                    return styles.menuLink + " " + (isActive ? styles.active : "")
                }}>Quản lý admin</NavLink>
            </li>
        </ul>
    </div>)
}

export default SideBar;