import React from "react";
import { Modal } from "../../../components";
import { AdminContext } from "../../../context/AdminContext";
import { LoggedContext } from "../../../context/LoggedContext";
import { useAxiosAuth } from "../../../hook/api";

function DeleteAdmin({ onSetAdmins }) {
    const themeLogged = React.useContext(LoggedContext);
    const themeAdmin = React.useContext(AdminContext);
    const action = React.useRef({
        id: null,
        key: null
    });
    themeAdmin.handleDelete = function (id, key) {
        action.current = { id, key };
        setIshow(true);
    }

    function handleUndo() {
        useAxiosAuth.delete(`admin/site/delete?id=${action.current.id}&undo=1`)
            .then((response) => {
                const result = response.data
                onSetAdmins((admin) => {
                    admin[action.current.key] = result.data.user;
                    return [
                        ...admin
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
    }

    function handleSubmit() {
        useAxiosAuth.delete(`admin/site/delete?id=${action.current.id}`)
            .then((response) => {
                const result = response.data
                themeLogged.handleShowSnackBar(result.message, {
                    title: "Quay lại",
                    handleClick: handleUndo
                });
                setIshow(false);
                onSetAdmins((admin) => {
                    admin[action.current.key] = null;
                    return [
                        ...admin
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
    }
    const [isShow, setIshow] = React.useState(false);
    return (
        <Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa Thành Viên này
        </Modal>
    )
}

export default DeleteAdmin;