import React, { useContext } from "react";
import { Modal, Button } from "../../../components";
import { DashboardContext } from "../../../context/DashboardContext";
import styles from "./saveEvent.module.scss";
import ResultEvent from "./ResultEvent";
import FontAwesome from "react-fontawesome";
import Advise from "./Advise";

function SaveEvent() {
    const themeDashboard = useContext(DashboardContext);
    themeDashboard.handleUpdate = () => {
        setIshow(true);
    }
    const [isShow, setIshow] = React.useState(false);
    return (<Modal isShow={isShow} className={styles.wpEvent} showModalFooter={false} onClose={() => setIshow(false)} size="lg">
        <div className={styles.containerEvent}>
            <Advise/>
            <ResultEvent />
            <div className={styles.actionEvent}>
                <Button type="info" radius="sm" size={"sm"} className={styles.btn}>
                    <FontAwesome name="database" /> <p className={styles.btnTitle}>Sắp xếp kết quả</p>
                </Button>
                <Button radius="sm" size="sm" className={styles.btn}>
                    <FontAwesome name="print" /><p className={styles.btnTitle}>In</p>
                </Button>
                <Button type="danger" radius="sm" size="sm" className={styles.btn}>
                    <FontAwesome name="trash" /> <p className={styles.btnTitle}>Xóa</p>
                </Button>
                <Button type="success" radius="sm" size="sm" className={styles.btn}>
                    <FontAwesome name="floppy-o" />
                    <p className={styles.btnTitle}>Lưu</p>
                </Button>
                <Button type="info" radius="sm"  size={"sm"} className={styles.btn}>
                    <FontAwesome name="upload" />
                    <p  className={styles.btnTitle}>Sắp xếp trả kết quả</p>
                </Button>
            </div>
        </div>
    </Modal>)
}

export default SaveEvent;