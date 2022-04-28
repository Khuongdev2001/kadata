import React from "react";
import { Modal } from "../../../components";
import { StaffContext } from "../../../context/StaffContext";
import { useAxiosAuth } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";


function DeleteStaff({ onSetStaffs }) {
    const themeStaff = React.useContext(StaffContext);
    const themeLogged = React.useContext(LoggedContext);
    const action = React.useRef({
        id: null,
        key: null
    });
    themeStaff.handleDelete = function (id, key) {
        action.current = { id, key }
        setIshow(true);
    }

    function handleUndo() {
        useAxiosAuth.delete(`admin/staff/delete?id=${action.current.id}&undo=1`)
            .then((response) => {
                const result = response.data
                onSetStaffs((staffs) => {
                    staffs[action.current.key] = result.data.staff;
                    return [
                        ...staffs
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
    }

    function handleSubmit(e) {
        useAxiosAuth.delete(`admin/staff/delete?id=${action.current.id}`)
            .then(response => {
                const result = response.data;
                setIshow(false);
                if (result.status) {
                    themeLogged.handleShowSnackBar(result.message, {
                        title: "Quay lại",
                        handleClick: handleUndo
                    });
                    onSetStaffs((staffs, value) => {
                        staffs[action.current.key] = null;
                        return [
                            ...staffs
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
        <Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa Nhân sự này
        </Modal>
    )
}

export default DeleteStaff;