import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useAxiosAuth } from "../../../hook/api";

function Customer({ onSetFeedback, feedback, errors }) {
    const [customers, setCustomers] = React.useState([]);
    React.useEffect(() => {
        useAxiosAuth.get(`admin/customer`)
            .then((value) => {
                const result = value.data.data;
                const { items, _meta } = result;
                setCustomers(items);
            })
            .catch((e) => {
                alert(e);
            })
    }, []);

    function handleChange(key, value) {
        onSetFeedback((feedback) => {
            return {
                ...feedback,
                [key]: value
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
            onChange={(e, value) => handleChange("customer_id", value ? value.id : null)}
            renderOption={(props, option) => <li {...props} key={option.id}>{option.name}</li>}
            id="combo-box-demo"
            options={customers}
            renderInput={(params) => <TextField  {...params} size="small" label="Đối tác" />}
        />
    )
}

export default Customer;