import React from "react";
import { Modal } from "../../../components";
import { ResultEventContext } from "../../../context/ResultEventContext";
import { LoggedContext } from "../../../context/LoggedContext";
import { useAxiosAuth } from "../../../hook/api";

function DeleteResultItem({ onSetResultEvents }) {
    const themeLogged = React.useContext(LoggedContext);
    const themeResultEvent = React.useContext(ResultEventContext);
    const action = React.useRef({
        id: null,
        key: null
    });
    themeResultEvent.handleDelete = function (id, key) {
        action.current = { id, key };
        setIshow(true);
    }
    themeResultEvent.handleConfirm = function (id, key) {
        useAxiosAuth.post(`admin/event-result/confirm?id=${id}`)
            .then(response => {
                const result = response.data;
                if(result.status){
                    onSetResultEvents((resultEvents) => {
                        resultEvents[key] = result.data.event_result;
                        return [
                            ...resultEvents
                        ]
                    });
                    themeLogged.handleShowSnackBar(result.message);
                }
                else{
                    alert(result.message);
                }
            })
    };
    const [isShow, setIshow] = React.useState(false);

    function handleSubmit() {
        useAxiosAuth.delete(`admin/event-result/delete?id=${action.current.id}`)
            .then((response) => {
                const result = response.data
                themeLogged.handleShowSnackBar(result.message);
                setIshow(false);
                onSetResultEvents((resultEvents) => {
                    resultEvents[action.current.key] = null;
                    return [
                        ...resultEvents
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
    }
    return (
        <Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa Kết Quả Này
        </Modal>
    )
}

export default DeleteResultItem;