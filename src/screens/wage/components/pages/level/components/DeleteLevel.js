import React from "react";
import { Modal } from "../../../../../../components";
import { WageContext } from "../../../../../../context/WageContext";

function DeleteLevel() {
    const themeWage = React.useContext(WageContext);
    themeWage.level = {
        ...themeWage.level,
        handleDelete: function () {
            setIshow(true);
        }
    }
    const [isShow, setIshow] = React.useState(false);
    return (
        <Modal isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa Cấp Bậc này
        </Modal>
    )
}

export default DeleteLevel;