import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useAxiosAuth } from "../../../hook/api";

function StaffLevel({ onSetStaff, staff, errors }) {
    const [staffLevels, setStaffLevels] = React.useState([]);
    React.useEffect(() => {
        useAxiosAuth.get(`admin/staff-level`)
            .then((value) => {
                const result = value.data.data;
                const { items, _meta } = result;
                setStaffLevels(items);
            })
            .catch((e) => {
                alert(e);
            })
    }, []);

    function handleChange(key, key_text, value) {
        onSetStaff((staff) => {
            return {
                ...staff,
                [key]: value ? value.id : null,
                [key_text]: value ? value.name : ""
            }
        })
    }

    return (
        <Autocomplete
            disablePortal
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Add "xxx" option created dynamically
                // Regular option
                return option.name;
            }}
            value={staffLevels.find(function (item) {
                return item.id == staff.staff_level;
            }) ?? ""}
            onChange={(e, value) => handleChange("staff_level", "staff_level_name", value)}
            renderOption={(props, option) => <li {...props} key={option.id}>{option.name}</li>}
            id="combo-box-demo"
            size="small"
            options={staffLevels}
            renderInput={(params) => (
                <TextField
                    error={Boolean(errors.staff_level)}
                    helperText={errors.staff_level || ""}
                    size="small" {...params} label="Cấp Bậc" />)}
        />
    )
}

export default StaffLevel;