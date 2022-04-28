import React from "react";
import { Modal } from "../../../components";
import { CustomerContext } from "../../../context/CustomerContext";
import { LoggedContext } from "../../../context/LoggedContext";
import { useAxiosAuth } from "../../../hook/api";

function DeleteCustomer({ onSetCustomers }) {
    const themeLogged = React.useContext(LoggedContext);
    const themeCustomer = React.useContext(CustomerContext);
    const action = React.useRef({
        id: null,
        key: null
    });
    themeCustomer.handleDelete = function (id, key) {
        action.current = { id, key };
        setIshow(true);
    }
    const [isShow, setIshow] = React.useState(false);

    function handleUndo() {
        useAxiosAuth.delete(`admin/customer/delete?id=${action.current.id}&undo=1`)
            .then((response) => {
                const result = response.data
                onSetCustomers((customers) => {
                    customers[action.current.key] = result.data.customer;
                    return [
                        ...customers
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
    }

    function handleSubmit() {
        useAxiosAuth.delete(`admin/customer/delete?id=${action.current.id}`)
            .then((response) => {
                const result = response.data
                themeLogged.handleShowSnackBar(result.message, {
                    title: "Quay lại",
                    handleClick: handleUndo
                });
                setIshow(false);
                onSetCustomers((customers) => {
                    customers[action.current.key] = null;
                    return [
                        ...customers
                    ]
                });
            })
            .catch(error => {
                alert(error);
            });
    }
    return (
        <Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIshow(false)} size="sm" position="center">
            Xóa Đối Tác Này
        </Modal>
    )
}

export default DeleteCustomer;