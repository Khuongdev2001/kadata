import React from "react";
import { Modal } from "../../../components";
import { FeedbackContext } from "../../../context/FeedbackContext";
import { useAxiosAuth } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";

function DeleteFeedback({ onSetFeedbacks }) {
    const themeCustomer = React.useContext(FeedbackContext);
    const themeLogged = React.useContext(LoggedContext);
    const feedbackRef = React.useRef({
        id: null,
        key: null
    });
    themeCustomer.handleDelete = function (id, key) {
        feedbackRef.current = { id, key }
        setIshow(true);
    }

    function handleSubmit(e) {
        useAxiosAuth.delete(`admin/report/delete?id=${feedbackRef.current.id}`)
            .then(response => {
                const result = response.data;
                setIshow(false);
                if (result.status) {
                    themeLogged.handleShowSnackBar(result.message);
                    onSetFeedbacks((feedbacks, value) => {
                        feedbacks[feedbackRef.current.key] = null;
                        return [
                            ...feedbacks
                        ]
                    })
                }
            })
            .catch(e => {
                alert(e);
            })
        e.preventDefault();
    }
    const [isShow, setIshow] = React.useState(false);
    return (
        <Modal onSubmit={handleSubmit} btnTextConfirm="Xóa"  isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa phản hồi này
        </Modal>
    )
}

export default DeleteFeedback;