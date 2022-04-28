import React from "react";
import styles from "./customerItem.module.scss";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
    Checkbox
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CustomerContext } from "../../../context/CustomerContext";

function CustomerItem({ customer, keys }) {
    const themeCustomer = React.useContext(CustomerContext);
    return (<TableRow
        hover
        role="checkbox"
        tabIndex={-1}
    >
        <TableCell padding="checkbox">
            <Checkbox
                color="primary"
            />
        </TableCell>
        <TableCell>
            {customer.id}
        </TableCell>
        <TableCell>
            {customer.customer_code}
        </TableCell>
        <TableCell>
            {customer.name}
        </TableCell>
        <TableCell>
            {customer.surrogate}
        </TableCell>
        <TableCell>
            {customer.phone}
        </TableCell>
        <TableCell>
            {customer.created_at}
        </TableCell>
        <TableCell>
            {customer.address}
        </TableCell>
        <TableCell>
            <Tooltip title="Edit" onClick={() => themeCustomer.handleUpdate(customer.id, keys)}>
                <IconButton>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={() => themeCustomer.handleDelete(customer.id, keys)}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </TableCell>
    </TableRow>)
}

export default CustomerItem;