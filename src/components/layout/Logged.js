import React from "react";
import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import SideBar from "./sidebar";
import { Box, BoxFlex } from "../";
import styles from "./logged.module.scss";
import { LoggedContext } from "../../context/LoggedContext";
import WpSnackbar from "./snackbar";
function Logged({ children }) {
    const loggedRef = React.useRef({});
    return (
        <LoggedContext.Provider value={loggedRef.current}>
            <BoxFlex className={styles.wrapper}>
                <SideBar />
                <Box className={styles.boxRight}>
                    <Header />
                    <Content>
                        {children}
                    </Content>
                    <WpSnackbar refer={loggedRef}/>
                </Box>
            </BoxFlex>
        </LoggedContext.Provider>
    )
}

export default Logged;