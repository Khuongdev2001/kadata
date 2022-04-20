import React from "react";
import { BoxFlex } from "../../../components";
import styles from "./staffItem.module.scss";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Close, Add } from '@mui/icons-material';
function StaffItem({ advise, setAdvise }) {
    const staffs = advise.staff;
    const [staff, setStaff] = React.useState({
        staff_id: null,
        fullname: ""
    });

    function handleAddStaff({ staff_id, fullname }) {
        setAdvise((advise) => {
            return {
                ...advise,
                staff: [
                    ...advise.staff,
                    {
                        staff_id,
                        fullname
                    }
                ]
            }
        })
    }

    function handleDeleteCustomer(index) {
        const staff = advise.staff;
        staff.splice(index, 1);
        setAdvise((advise) => {
            return {
                ...advise,
                advise: [
                    ...staff
                ]
            }
        })
    }

    return (<div className={styles.wpStatff}>
        <div className={styles.topTitle}>
            <h4>Nhân Viên</h4>
        </div>
        <BoxFlex alignItems="center">
            <Autocomplete
                id="highlights-demo"
                sx={{ mb: 0 }}
                fullWidth
                options={[{
                    staff_id: 1,
                    fullname: "NVA"
                }, {
                    staff_id: 2,
                    fullname: "NVC"
                }]}
                size="small"
                onChange={(e, newValue) => setStaff(newValue)}
                getOptionLabel={(option) => option.fullname}
                renderInput={(params) => (
                    <TextField {...params} label="Nhân Viên" margin="normal" />
                )}
            />
        </BoxFlex>
        {
            staffs.map((staff, index) => {
                return (
                    <BoxFlex justifyContent="space-between" alignItems="center" className={styles.listStaffItem}>
                        <span className={styles.staffName}>{staff.fullname}</span>
                        <Button
                            onClick={() => handleDeleteCustomer(index)}
                            className={styles.btnRemove} size="sm" variant="contained" color="error">
                            <Close fontSize="10" />
                        </Button>
                    </BoxFlex>
                )
            })
        }
        <div className={styles.staffCreate}>
            <Button variant="contained" onClick={() => handleAddStaff(staff)} size="small">
                <Add />
            </Button>
        </div>
    </div>)
}

export default StaffItem;