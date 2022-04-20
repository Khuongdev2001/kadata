import React from "react";
import { PhoneAndroid, Email, Home } from '@mui/icons-material';
import { Modal, BoxFlex } from "../../../components";
import { FeedbackContext } from "../../../context/FeedbackContext";
import styles from "./feedbackSee.module.scss";
import { Button } from "@mui/material";


function FeedbackSee() {
    const themeFeedback = React.useContext(FeedbackContext);
    themeFeedback.handleView = function () {
        setIshow(true);
    }
    const [isShow, setIshow] = React.useState(false);
    return (<Modal size="xl" className={styles.wpFeedback} isShow={isShow} onClose={() => setIshow(false)}>
        <h2 className={styles.feedbackTitle}>Thông tin phản hồi</h2>
        <div>
            <div className={styles.contentFeedback}>
                <h4 className={styles.subtitle}>Nội dung</h4>
                <div className={styles.content}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum molestiae fugit, facilis molestias assumenda commodi expedita, rerum non, necessitatibus unde voluptate cumque doloremque incidunt laborum explicabo ea impedit doloribus magni.
                </div>
            </div>
            <div className={styles.customerFeedback}>
                <h4 className={styles.subtitle}>Đối tác</h4>
                <p className={styles.customerTitle}>
                    Ocean Edu Trường Chinh
                </p>
                <ul className={styles.wpInfo}>
                    <BoxFlex alignItems="center" className={styles.item}>
                        <PhoneAndroid />
                        <span className={styles.iconTitle}>
                            02473 000 333 - Phím 111 hoặc 112
                        </span>
                    </BoxFlex>
                    <BoxFlex alignItems="center" className={styles.item}>
                        <Email />
                        <span className={styles.iconTitle}>
                            oetruongchinh@ocean.edu.vn
                        </span>
                    </BoxFlex>
                    <BoxFlex alignItems="center" className={styles.item}>
                        <Home />
                        <span className={styles.iconTitle}>
                            Tòa nhà HH1- Meco Complex, Ngõ 102 đường Trường Chinh, Đống Đa, Hà Nộ
                        </span>
                    </BoxFlex>
                </ul>
            </div>
        </div>
        <BoxFlex justifyContent="center" className={styles.boxBottom}>
            <Button variant="contained" onClick={() => window.confirm("đã xử lý phản hồi")} color="error">Xác Nhận</Button>
        </BoxFlex>
    </Modal>)
}

export default FeedbackSee;