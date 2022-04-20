import React from "react";
import { Editor } from '@tinymce/tinymce-react';
import { Autocomplete,TextField } from "@mui/material";
import { FeedbackContext } from "../../../context/FeedbackContext";
import { Modal } from "../../../components";
import styles from "./addFeedback.module.scss";
function AddFeedback() {
    const [isShow, setIshow] = React.useState(false);
    const themeFeedback = React.useContext(FeedbackContext);
    themeFeedback.handleAdd = function () {
        setIshow(true);
    }
    return (<Modal className={styles.wpAddFeedback} isShow={isShow} onClose={() => setIshow(false)} size="xl">
        <h3 className={styles.title}>Thêm phản hồi</h3>
        <div className={styles.formGroup}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={[]}
                renderInput={(params) => <TextField {...params} label="Đối tác" />}
            />
        </div>
        <div className={styles.formGroup}>
            <label htmlFor="content">Nội Dung Phản Hồi</label>
            <Editor
                id="content"
                initialValue=""
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
            />
        </div>
    </Modal>)
}

export default AddFeedback;