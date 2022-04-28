import React from "react";
import { Modal } from "../../../components";
import { CustomerContext } from "../../../context/CustomerContext";
import { TextField, Grid } from '@mui/material';
import fields from "./FieldCustomer";
import SaveCustomerValidate from "../validates/SaveCustomer";
import { useAxiosAuth } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";

function SaveCustomer({ onSetCustomers }) {
    const themeLogged = React.useContext(LoggedContext);
    const themeCustomer = React.useContext(CustomerContext);
    const [isShow, setIsShow] = React.useState(false);
    const action = React.useRef({
        customerId: null,
        isAdd: true,
        isLoad: false
    });
    const customerRef = React.useRef({});
    const [customer, setCustomer] = React.useState({
        address: "",
        name: "",
        phone: "",
    });
    const [errors, setErrors] = React.useState({});
    themeCustomer.handleUpdate = function (id, key) {
        setCustomer({
            address: "",
            name: "",
            phone: "",
        })
        action.current.id = id;
        action.current.key = key;
        useAxiosAuth.get(`admin/customer/view?id=${id}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setCustomer(result.data.customer);
                }
            })
            .catch(e => {
                alert(e);
            })
        action.current.isAdd = false;
        setErrors({});
        setIsShow(true);
    }
    themeCustomer.handleAdd = function () {
        action.current.isAdd = true;
        setErrors({});
        setCustomer({
            address: "",
            name: "",
            phone: "",
        })
        setIsShow(true);
    }

    function handleSubmit() {
        const url = action.current.isAdd
            ? "admin/customer/create"
            : `admin/customer/update?id=${action.current.id}`;
        const errors = SaveCustomerValidate(customer, action);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        useAxiosAuth.post(url, customer)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    themeLogged.handleShowSnackBar(result.message);
                    if (action.current.isAdd) {
                        handleRenderAdd(result.data.customer);
                    }
                    else {
                        handleRenderUpdate(result.data.customer);
                    }
                    setIsShow(false);
                    return;
                }
                else {
                    const errors = result.data;
                    const errorArr = [];
                    for (let error in errors) {
                        errorArr[error] = errors[error][0];
                    }
                    setErrors(errorArr);
                }
            })
    }

    function handleRenderAdd(customer) {
        onSetCustomers((customers) => ([
            ...customers,
            customer
        ]))
    }

    function handleRenderUpdate(customer) {
        onSetCustomers((customers) => {
            customers[action.current.key] = customer;
            return [...customers];
        });
    }

    function handleChangeField(key, value) {
        setCustomer({
            ...customer,
            [key]: value
        });
    }

    React.useEffect(() => {
        console.log(customer);
    })

    return (<Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIsShow(false)} size="xl">
        <h2>
            {action.current.isAdd ?
                "Thêm Đối Tác"
                : "Cập Nhật Đối Tác"
            }</h2>
        <Grid container spacing={2} sx={{ py: 2 }}>
            {
                fields.map((field, key) => {
                    return (
                        <Grid item xs={6} key={key}>
                            <TextField
                                value={customer[field.key] || ""}
                                error={errors[field.key] || ""}
                                helperText={errors[field.key] || ""}
                                onChange={(e) => handleChangeField(field.key, e.target.value)}
                                label={field.label}
                                id="filled-size-small"
                                fullWidth
                                size="small" />
                        </Grid>
                    )
                })
            }
        </Grid>
    </Modal >)
}


export default SaveCustomer;