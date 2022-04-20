import React from "react";
import { BoxFlex } from "../../../components";
import styles from "./customerItem.module.scss";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Close, Add } from '@mui/icons-material';
function CustomerItem({ advise, setAdvise }) {

    const customers = advise.customer;
    const [customer, setCustomer] = React.useState({
        customer_name: "",
        num_member: 0
    })

    function handleAddCustomer(customer_name, num_member) {
        setAdvise((advise) => {
            return {
                ...advise,
                customer: [
                    ...advise.customer,
                    {
                        customer_name,
                        num_member
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

    return (<div className={styles.wpCustomer}>
        <BoxFlex justifyContent="space-between">
            <div className={[styles.boxCustomerName, styles.box].join(" ")}>
                <h4 className={[styles.customerName, styles.title].join(" ")}>Tên đối tác</h4>
                <Autocomplete
                    id="highlights-demo"
                    fullWidth
                    options={[
                        { title: "OE Trường Chinh", key: 1 },
                        { title: "Landmark 81", key: 2 }
                    ]}
                    onChange={(e, newValue) => setCustomer({
                        ...customer,
                        customer_name: newValue.title
                    })}
                    size="small"
                    className={styles.customer}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                        <TextField sx={{ m: 0 }} value={customer.customer_name} fullWidth {...params} label="Đối Tác" margin="normal" />
                    )}
                />
            </div>
            <div className={[styles.boxNumStaffItem, styles.box].join(" ")}>
                <h4 className={[styles.numMember, styles.title].join(" ")}>Yêu cầu số lượng</h4>
                <TextField
                    onChange={(e) => setCustomer({
                        ...customer,
                        num_member: e.target.value
                    })}
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
                                <span className={styles.customerName}>{customer.customer_name}</span>
                            </div>
                            <BoxFlex justifyContent="space-between" alignItems="center" className={styles.box}>
                                <span className={[styles.box, styles.numMember].join(" ")}>{customer.num_member}</span>
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
                onClick={() => handleAddCustomer(customer.customer_name, customer.num_member)}
                variant="contained" size="small">
                <Add />
            </Button>
        </div>
    </div>)
}

export default CustomerItem;