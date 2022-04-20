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

function CustomerItem() {
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
            1
        </TableCell>
        <TableCell>
            OETC
        </TableCell>
        <TableCell>
            Đối tác 1
        </TableCell>
        <TableCell>Nguyễn Văn A</TableCell>
        <TableCell>0856345642</TableCell>
        <TableCell>Ocean Edu Trường Chinh,....</TableCell>
        <TableCell>
            <Tooltip title="Edit" onClick={() => themeCustomer.handleUpdate()}>
                <IconButton>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={() => themeCustomer.handleDelete()}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </TableCell>
    </TableRow>)
}

export default CustomerItem;