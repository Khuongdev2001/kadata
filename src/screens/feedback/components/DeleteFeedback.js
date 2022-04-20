import React from "react";
import { Modal } from "../../../components";
import { FeedbackContext } from "../../../context/FeedbackContext";

function DeleteFeedback() {
    const themeCustomer = React.useContext(FeedbackContext);
    themeCustomer.handleDelete = function () {
        setIshow(true);
    }
    const [isShow, setIshow] = React.useState(false);
    return (
        <Modal isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa phản hồi này
        </Modal>
    )
}

export default DeleteFeedback;