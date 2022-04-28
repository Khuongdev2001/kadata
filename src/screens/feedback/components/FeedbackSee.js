import React from "react";
import { PhoneAndroid, Email, Home } from '@mui/icons-material';
import { Modal, BoxFlex } from "../../../components";
import { FeedbackContext } from "../../../context/FeedbackContext";
import styles from "./feedbackSee.module.scss";
import { Button } from "@mui/material";
import { useAxiosAuth } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";


function FeedbackSee({ onSetFeedbacks }) {
    const themeLogged = React.useContext(LoggedContext);
    const themeFeedback = React.useContext(FeedbackContext);
    const [feedback, setFeedback] = React.useState({
        customer: {}
    });
    const feedbackRef = React.useRef({
        id: null,
        key: null
    });
    themeFeedback.handleView = function (id, key) {
        feedbackRef.current = { id, key };
        useAxiosAuth.get(`admin/report/view?id=${id}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setFeedback(result.data.report);
                }
            })
            .catch(error => {
                console.log(error);
            })
        setIshow(true);
    }

    function handleDone() {
        useAxiosAuth.get(`admin/report/done?id=${feedbackRef.current.id}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setIshow(false);
                    themeLogged.handleShowSnackBar(result.message);
                    onSetFeedbacks((feedbacks, value) => {
                        feedbacks[feedbackRef.current.key] = result.data.report;
                        return [
                            ...feedbacks
                        ]
                    })
                }
            })
    }

    const [isShow, setIshow] = React.useState(false);
    return (<Modal size="xl" className={styles.wpFeedback} isShow={isShow} onClose={() => setIshow(false)}>
        <h2 className={styles.feedbackTitle}>Thông tin phản hồi</h2>
        <div>
            <div className={styles.titleFeedback}>
                <h4 className={styles.subtitle}>Tiêu đề</h4>
                <div className={styles.title}>{feedback.report_title}</div>
            </div>
            <div className={styles.contentFeedback}>
                <h4 className={styles.subtitle}>Nội dung</h4>
                <div className={styles.content} dangerouslySetInnerHTML={{
                    __html: feedback.report_content
                }}></div>
            </div>
            <div className={styles.customerFeedback}>
                <h4 className={styles.subtitle}>Đối tác</h4>
                <p className={styles.customerTitle}>
                    {feedback.customer.name}
                </p>
                <ul className={styles.wpInfo}>
                    <BoxFlex alignItems="center" className={styles.item}>
                        <PhoneAndroid />
                        <span className={styles.iconTitle}>
                            {feedback.customer.phone}
                        </span>
                    </BoxFlex>
                    {/* <BoxFlex alignItems="center" className={styles.item}>
                        <Email />
                        <span className={styles.iconTitle}>
                            {feedback.customer.email}
                        </span>
                    </BoxFlex> */}
                    <BoxFlex alignItems="center" className={styles.item}>
                        <Home />
                        <span className={styles.iconTitle}>
                            {feedback.customer.address}
                        </span>
                    </BoxFlex>
                </ul>
            </div>
        </div>
        <BoxFlex justifyContent="center" className={styles.boxBottom}>
            {
                feedback.status == 0
                    ? (
                        <Button variant="contained" onClick={handleDone} color="error">Xác Nhận</Button>
                    )
                    : <Button variant="contained" disabled color="success">Đã phản hồi</Button>
            }
        </BoxFlex>
    </Modal>)
}

export default FeedbackSee;