import React from "react";
import { Modal } from "../../../components";
import { DashboardContext } from "../../../context/DashboardContext";
import { LoggedContext } from "../../../context/LoggedContext";
import { useAxiosAuth } from "../../../hook/api";

function DeleteDashboard({ onSetDashboards }) {
    const themeLogged = React.useContext(LoggedContext);
    const themeDashboard = React.useContext(DashboardContext);
    const action = React.useRef({
        id: null,
        key: null
    });
    themeDashboard.handleDelete = function (id, key) {
        action.current = { id, key };
        setIshow(true);
    }
    const [isShow, setIshow] = React.useState(false);

    function handleUndo() {
        useAxiosAuth.delete(`admin/event/delete?id=${action.current.id}&undo=1`)
            .then((response) => {
                const result = response.data
                onSetDashboards((events) => {
                    events[action.current.key] = result.data.event;
                    return [
                        ...events
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
    }

    function handleSubmit() {
        useAxiosAuth.delete(`admin/event/delete?id=${action.current.id}`)
            .then((response) => {
                const result = response.data
                themeLogged.handleShowSnackBar(result.message, {
                    title: "Quay lại",
                    handleClick: handleUndo
                });
                setIshow(false);
                onSetDashboards((events) => {
                    events[action.current.key] = null;
                    return [
                        ...events
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
    }
    return (
        <Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa Sự Kiện Này
        </Modal>
    )
}

export default DeleteDashboard;