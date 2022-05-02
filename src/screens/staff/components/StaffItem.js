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

function StaffItem({ staff, keys }) {
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
                {staff.id}
            </TableCell>
            <TableCell>
                {staff.staff_code}
            </TableCell>
            <TableCell>
                {staff.staff_level_name}
            </TableCell>
            <TableCell>
                {staff.fullname}
            </TableCell>
            <TableCell>
                {staff.phone}
            </TableCell>
            <TableCell>
                {staff.address}
            </TableCell>
            <TableCell>
                <Tooltip title="Chỉnh sửa" onClick={() => saveStaff.handleUpdate(staff.id, keys)}>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                    <IconButton onClick={() => saveStaff.handleDelete(staff.id, keys)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default StaffItem;