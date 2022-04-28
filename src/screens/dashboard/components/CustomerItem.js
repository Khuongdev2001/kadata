import React from "react";
import { BoxFlex } from "../../../components";
import styles from "./customerItem.module.scss";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Close, Add } from '@mui/icons-material';
import { useAxiosAuth } from "../../../hook/api";
function CustomerItem({ advise, setAdvise, errors }) {

    const customers = advise.customer;
    const [customerOptions, setCustomerOptions] = React.useState([]);
    const [customer, setCustomer] = React.useState({
        name: "",
        qty: 0
    })

    React.useEffect(() => {
        useAxiosAuth.get("admin/customer")
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setCustomerOptions(result.data.items);
                }
            })
    }, []);

    function handleAddCustomer({ name, id, qty }) {
        if (!name || !qty) {
            alert("Không Được Để Trống Tên Đối Tác Hoặc Số Lượng");
            return false;
        }
        setCustomer({
            name: "",
            qty: 0
        });
        setAdvise((advise) => {
            return {
                ...advise,
                customer: [
                    ...advise.customer,
                    {
                        name,
                        id,
                        qty
                    }
                ]
            }
        })
    }

    function handleDeleteCustomer(index) {
        const customer = advise.customer;
        customer.splice(index, 1);
        setAdvise((advise) => {
            return {
                ...advise,
                customer: [
                    ...customer
                ]
            }
        })
    }

    function handleSetOption(customer) {
        const index = customers.findIndex(item => {
            return item.id == customer.id;
        })
        if (index != -1) {
            return "";
        }
        else {
            return customer.name;
        }
    }

    return (<div className={styles.wpCustomer}>
        <BoxFlex justifyContent="space-between">
            <div className={[styles.boxCustomerName, styles.box].join(" ")}>
                <h4 className={[styles.customerName, styles.title].join(" ")}>Tên đối tác</h4>
                <Autocomplete
                    id="highlights-demo"
                    fullWidth
                    options={customerOptions}
                    onChange={(e, newValue) => setCustomer({
                        ...customer,
                        id: newValue.id,
                        name: newValue.name
                    })}
                    size="small"
                    className={styles.customer}
                    getOptionLabel={handleSetOption}
                    renderInput={(params) => (
                        <TextField error={Boolean(errors.customer)} helperText={errors.customer} sx={{ m: 0 }} value={customer.customer_name} fullWidth {...params} label="Đối Tác" margin="normal" />
                    )}
                />
            </div>
            <div className={[styles.boxNumStaffItem, styles.box].join(" ")}>
                <h4 className={[styles.numMember, styles.title].join(" ")}>Yêu cầu số lượng</h4>
                <TextField
                    type="number"
                    onChange={(e) => setCustomer({
                        ...customer,
                        qty: e.target.value
                    })}
                    value={customer.qty}
                    className={styles.numStaffItem} fullWidth size="small" label="Số Lượng" variant="outlined" />
            </div>
        </BoxFlex>
        <div className={styles.listCustomers}>
            {
                customers.map((customer, index) => {
                    return (
                        <BoxFlex
                            key={index}
                            justifyContent="space-between" className={styles.customerItem} alignItems="center">
                            <div className={styles.box}>
                                <span className={styles.customerName}>{customer.name}</span>
                            </div>
                            <BoxFlex justifyContent="space-between" alignItems="center" className={styles.box}>
                                <span className={[styles.box, styles.numMember].join(" ")}>{customer.qty}</span>
                                <Button
                                    onClick={() => handleDeleteCustomer(index)}
                                    className={styles.btnRemove} size="sm" variant="contained" color="error">
                                    <Close fontSize="10" />
                                </Button>
                            </BoxFlex>
                        </BoxFlex>)
                })
            }
        </div>
        <div className={styles.customerCreate}>
            <Button
                onClick={() => handleAddCustomer(customer)}
                variant="contained" size="small">
                <Add />
            </Button>
        </div>
    </div>)
}

export default CustomerItem;