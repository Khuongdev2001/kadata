import React from "react";
import { Modal } from "../../../../../../components";
import { WageContext } from "../../../../../../context/WageContext";
import { LoggedContext } from "../../../../../../context/LoggedContext";
import { useAxiosAuth } from "../../../../../../hook/api";

function DeleteLevel({ onSetStaffLevels }) {
    const themeWage = React.useContext(WageContext);
    const themeLogged = React.useContext(LoggedContext);
    const action = React.useRef({
        id: null,
        key: null
    })
    themeWage.level = {
        ...themeWage.level,
        handleDelete: function (id, key) {
            action.current = { id, key }
            setIshow(true);
        }
    }
    const [isShow, setIshow] = React.useState(false);

    function handleUndo() {
        useAxiosAuth.delete(`admin/staff-level/delete?id=${action.current.id}&undo=1`)
            .then((response) => {
                const result = response.data
                onSetStaffLevels((staffLevels) => {
                    staffLevels[action.current.key] = result.data.staff_level;
                    return [
                        ...staffLevels
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
    }

    function handleSubmit(e) {
        useAxiosAuth.delete(`admin/staff-level/delete?id=${action.current.id}`)
            .then((response) => {
                const result = response.data
                themeLogged.handleShowSnackBar(result.message, {
                    title: "Quay lại",
                    handleClick: handleUndo
                });
                setIshow(false);
                onSetStaffLevels((staffLevels) => {
                    staffLevels[action.current.key] = null;
                    return [
                        ...staffLevels
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
        e.preventDefault();
    }
    return (
        <Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa Cấp Bậc này
        </Modal>
    )
}

export default DeleteLevel;