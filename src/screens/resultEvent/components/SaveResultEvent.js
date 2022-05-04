import React from "react";
import { Modal } from "../../../components";
import { ResultEventContext } from "../../../context/ResultEventContext";
import { TextField, Grid, Autocomplete, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import SaveResultEventValidate, { field } from "../validates/SaveResultEvent";
import { useAxiosAuth } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";
import { useParams } from "react-router-dom";


function SaveResultEvent({ onSetResultEvents }) {
    let { id } = useParams();
    const [customers, setCustomers] = React.useState([]);
    const [staffs, setStaffs] = React.useState([]);
    const themeLogged = React.useContext(LoggedContext);
    const themeResultEvent = React.useContext(ResultEventContext);
    const [isShow, setIsShow] = React.useState(false);
    const action = React.useRef({
        id: null,
        isAdd: true,
        isLoad: false
    });

    const [resultEvent, setResultCustomer] = React.useState(field);
    const [errors, setErrors] = React.useState({});
    themeResultEvent.handleUpdate = function (id, key) {
        setResultCustomer({
            ...field,
            event_id: id
        });
        action.current.id = id;
        action.current.key = key;
        useAxiosAuth.get(`admin/event-result/view?id=${id}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setResultCustomer(result.data.event_result);
                    handleChangeAutocomplate(result.data.event_result.customer_id);
                }
            })
            .catch(e => {
                alert(e);
            })
        action.current.isAdd = false;
        setErrors({});
        setIsShow(true);
    }
    themeResultEvent.handleAdd = function () {
        action.current.isAdd = true;
        setErrors({});
        setResultCustomer(field);
        setIsShow(true);
    }

    React.useEffect(() => {
        useAxiosAuth.get(`admin/customer-event?event_id=${id}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setCustomers(result.data.items);
                }
            })
            .catch(e => {
                alert(e);
            })
    }, [id]);

    React.useEffect(() => {
        console.log(errors);
    }, [errors]);

    function handleSubmit() {
        const url = action.current.isAdd
            ? `admin/event-result/create?event_id=${id}`
            : `admin/event-result/update?id=${action.current.id}`;
        const errors = SaveResultEventValidate(resultEvent, action);
        setErrors(errors);
        if (Object.keys(errors).length) {
            return;
        }
        useAxiosAuth.post(url, resultEvent)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    themeLogged.handleShowSnackBar(result.message);
                    if (action.current.isAdd) {
                        handleRenderAdd(result.data.event_result);
                    }
                    else {
                        handleRenderUpdate(result.data.event_result);
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

    function handleRenderAdd(resultEvent) {
        onSetResultEvents((resultEvents) => ([
            ...resultEvents,
            resultEvent
        ]))
    }

    function handleRenderUpdate(resultEvent) {
        onSetResultEvents((resultEvents) => {
            resultEvents[action.current.key] = resultEvent;
            return [...resultEvents];
        });
    }

    function handleChangeField(key, value) {
        setResultCustomer({
            ...resultEvent,
            event_id: id,
            [key]: value
        });
    }
    React.useEffect(() => {
    }, [resultEvent]);

    function handleChangeAutocomplate(customer_id) {
        useAxiosAuth.get(`admin/staff-event?event_id=${id}&customer_id=${customer_id}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setStaffs(result.data.items);
                }
            })
            .catch(e => {
                alert(e);
            })
    }
    return (<Modal onSubmit={handleSubmit} isShow={isShow} onClose={() => setIsShow(false)} size="xl">
        <h2>
            {action.current.isAdd ?
                "Thêm Sắp Xếp Trả KQ"
                : "Cập Nhật Sắp Xếp Trả KQ"
            }</h2>
        <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item xs={4}>
                <TextField
                    disabled={resultEvent.status}
                    error={Boolean(errors.buyer_name)}
                    helperText={errors.buyer_name}
                    onChange={(e) => handleChangeField("buyer_name", e.target.value)}
                    value={resultEvent.buyer_name} fullWidth size="small" id="outlined-basic" label="Tên khách hàng" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    disabled={resultEvent.status}
                    error={Boolean(errors.buyer_phone)}
                    helperText={errors.buyer_phone}
                    onChange={(e) => handleChangeField("buyer_phone", e.target.value)}
                    value={resultEvent.buyer_phone}
                    fullWidth size="small" id="outlined-basic" label="SĐT khách hàng" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    disabled={resultEvent.status}
                    value={customers.find(function (item) {
                        return item.customer_id == resultEvent.customer_id;
                    }) ?? ""}
                    disablePortal
                    getOptionLabel={(customer) => customer.customer_name ?? ""}
                    renderOption={((props, customer) => (<li {...props}>
                        {customer.customer_name}
                    </li>))}
                    id="combo-box-demo"
                    onChange={(e, newValue) => {
                        handleChangeAutocomplate(newValue.customer_id)
                        handleChangeField("customer_id", newValue.customer_id)
                    }}
                    options={customers}
                    size="small"
                    renderInput={(params) => <TextField
                        error={Boolean(errors.customer_id)}
                        helperText={errors.customer_id} {...params} label="Đối tác" />}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    disabled={resultEvent.status}
                    error={Boolean(errors.turnover)}
                    helperText={errors.turnover}
                    onChange={(e) => handleChangeField("turnover", e.target.value)}
                    value={resultEvent.turnover} fullWidth size="small" id="outlined-basic" label="Doanh số" variant="outlined" />
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    disabled={resultEvent.status}
                    value={staffs.find(function (item) {
                        return item.staff_id == resultEvent.consultant_id;
                    }) ?? ""}
                    error={Boolean(errors.staff_id)}
                    helperText={errors.staff_id}
                    disablePortal
                    options={staffs}
                    getOptionLabel={(customer) => customer.staff_name ?? ""}
                    renderOption={((props, customer) => (<li {...props}>
                        {customer.staff_name}
                    </li>))}
                    onChange={(e, newValue) => {
                        handleChangeField("consultant_id", newValue.staff_id)
                    }}
                    id="combo-box-demo"
                    size="small"
                    renderInput={(params) => <TextField {...params} label="Người tư vấn" />}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField fullWidth size="small" value={resultEvent.seller_name} id="outlined-basic" label="Người trả kết quản" disabled variant="outlined" />
            </Grid>
        </Grid>
    </Modal >)
}


export default SaveResultEvent;