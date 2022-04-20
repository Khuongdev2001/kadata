import React from "react";
import { Modal } from "../../../components";
import { CustomerContext } from "../../../context/CustomerContext";

function DeleteCustomer() {
    const themeCustomer = React.useContext(CustomerContext);
    themeCustomer.handleDelete = function () {
        setIshow(true);
    }
    const [isShow, setIshow] = React.useState(false);
    return (
        <Modal isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa Đối Tác Này
        </Modal>
    )
}

export default DeleteCustomer;