import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Content from "./content";
import SideBar from "./sidebar";
import { Box, BoxFlex } from "../";
import styles from "./logged.module.scss";
import { LoggedContext } from "../../context/LoggedContext";
import WpSnackbar from "./snackbar";
import { useAxiosAuth, baseURL } from "../../hook/api";
import ThemeLoadingLogged from "./loading/Logged";
function Logged({ children }) {
    const { user } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = React.useState(false);
    const loggedRef = React.useRef({});
    const navigate = useNavigate();

    React.useEffect(() => {
        /* Call Api  */
        const userLocalStore = localStorage.getItem("user");
        if (!userLocalStore) {
            navigate("/");
        }
        else if (Object.keys(user).length) {
            setIsLogin(true);
        }
        else {
            /* Call Api */
            useAxiosAuth.post(`${baseURL}/admin/site/login-token`)
                .then(() => {
                    setIsLogin(true);
                })
                .catch(error => {
                    navigate("/");
                });
        }
    }, []);

    return (
        <LoggedContext.Provider value={loggedRef.current}>
            {isLogin
                ? (<BoxFlex className={styles.wrapper}>
                    <SideBar />
                    <Box className={styles.boxRight}>
                        <Header />
                        <Content>
                            {children}
                        </Content>
                        <WpSnackbar refer={loggedRef} />
                    </Box>
                </BoxFlex>)
                : (<ThemeLoadingLogged/>)
            }
        </LoggedContext.Provider>
    )
}

export default Logged;