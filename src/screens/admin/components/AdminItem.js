import React from "react";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
    Checkbox
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { AdminContext } from "../../../context/AdminContext";

function AdminItem({ admin, keys }) {
    const themeAdmin = React.useContext(AdminContext);
    return (
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
        >
            <TableCell>
                {admin.id}
            </TableCell>
            <TableCell>
                {admin.email}
            </TableCell>
            <TableCell>
                {admin.fullname}
            </TableCell>
            <TableCell>
                {admin.status_text}
            </TableCell>
            <TableCell>{admin.created_at}</TableCell>
            <TableCell>
                <Tooltip title="Edit" onClick={() => themeAdmin.handleUpdate(admin.id, keys)}>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => themeAdmin.handleDelete(admin.id, keys)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default AdminItem;