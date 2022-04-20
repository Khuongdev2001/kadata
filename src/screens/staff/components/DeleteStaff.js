import React from "react";
import { Modal } from "../../../components";
import { StaffContext } from "../../../context/StaffContext";

function DeleteStaff() {
    const themeStaff = React.useContext(StaffContext);
    themeStaff.handleDelete = function () {
        setIshow(true);
    }
    const [isShow, setIshow] = React.useState(false);
    return (
        <Modal isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa Nhân sự này
        </Modal>
    )
}

export default DeleteStaff;