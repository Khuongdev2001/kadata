import React from "react";
import { Editor } from '@tinymce/tinymce-react';
import { TextField } from "@mui/material";
import { FeedbackContext } from "../../../context/FeedbackContext";
import { Modal } from "../../../components";
import styles from "./addFeedback.module.scss";
import Customer from "./Customer";
import AddFeedbackValidate from "../validates/AddFeedback";
import { useAxiosAuth } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";

function AddFeedback({ onSetFeedbacks }) {
    const themeLogged = React.useContext(LoggedContext);
    const [isShow, setIsShow] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [feedback, setFeedback] = React.useState({
        report_title: "",
        report_content: "",
        customer_id: ""
    })
    const themeFeedback = React.useContext(FeedbackContext);
    themeFeedback.handleAdd = function () {
        setIsShow(true);
    }
    function handleChange(key, value) {
        setFeedback({
            ...feedback,
            [key]: value
        })
    }
    function handleSaveEditor(editor) {
        setFeedback({
            ...feedback,
            report_content: editor.getContent(),
            report_content_raw: editor.getContent({
                format: "text"
            })
        })
    }

    function handleSubmit(e) {
        const errors = AddFeedbackValidate(feedback);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        useAxiosAuth.post(`admin/report/create`, feedback)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    themeLogged.handleShowSnackBar(result.message);
                    setIsShow(false);
                    onSetFeedbacks((feedbacks) => ([
                        ...feedbacks,
                        result.data.feedback
                    ]))
                    return;
                }
                else {
                    const errors = result.data;
                    const errorArr = [];
                    for (let error in errors) {
                        errorArr[error] = errors[error][0];
                    }
                    setErrors(errorArr);
                }
            })
        e.preventDefault();
    }

    return (<Modal
        onSubmit={handleSubmit}
        className={styles.wpAddFeedback} isShow={isShow} onClose={() => setIsShow(false)} size="xl">
        <h3 className={styles.title}>Thêm phản hồi</h3>
        <div className={styles.formGroup}>
            <Customer errors={errors} feedback={feedback} onSetFeedback={setFeedback} />
        </div>
        <div className="formGroup">
            <TextField
                onChange={(e) => handleChange("report_title", e.target.value)}
                value={feedback.report_title || ""}
                error={errors.report_title || ""}
                helperText={errors.report_title || ""}
                label="Tiêu đề phản hồi"
                id="filled-size-small"
                fullWidth
                size="small" />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="content">Nội Dung Phản Hồi</label>
            <Editor
                id="content"
                init={{
                    height: 200,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link charmap',
                        'fullscreen',
                        'insertdatetime media table paste wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                initialValue={feedback.report_content}
                onBlur={(e) => handleSaveEditor(e.target)}
            />
            <span className="error">{errors.report_content}</span>
        </div>
    </Modal>)
}

export default AddFeedback;