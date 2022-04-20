import React from "react";
import styles from "./staffItem.module.scss";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
    Checkbox
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { StaffContext } from "../../../context/StaffContext";

function StaffItem() {
    const saveStaff = React.useContext(StaffContext);
    return (
        <TableRow
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
                Tổng giám đốc
            </TableCell>
            <TableCell>Nguyễn Văn A</TableCell>
            <TableCell>0856345642</TableCell>
            <TableCell>Ocean Edu Trường Chinh,....</TableCell>
            <TableCell>
                <Tooltip title="Edit" onClick={() => saveStaff.handleUpdate()}>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => saveStaff.handleDelete()}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default StaffItem;