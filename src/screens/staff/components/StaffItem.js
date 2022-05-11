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
            <TableCell>
                {staff.id}
            </TableCell>
            <TableCell>
                {staff.staff_code}
            </TableCell>
            <TableCell>
                <span>
                    {staff.staff_level_name}
                </span>
            </TableCell>
            <TableCell>
                <span>
                    {staff.fullname}
                </span>
            </TableCell>
            <TableCell>
                <span>
                    {staff.phone}
                </span>
            </TableCell>
            <TableCell>
                <span>
                    {staff.address}
                </span>
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