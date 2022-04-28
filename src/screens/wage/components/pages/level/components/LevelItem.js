import React from "react";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { WageContext } from "../../../../../../context/WageContext";

function LevelItem({ staffLevel, keys }) {
    const themeWage = React.useContext(WageContext);
    return (
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
        >
            <TableCell>
                {staffLevel.id}
            </TableCell>
            <TableCell>
                {staffLevel.name}
            </TableCell>
            <TableCell>
                {staffLevel.pay_level}
            </TableCell>
            <TableCell>
                {staffLevel.allowance_pay}
            </TableCell>
            <TableCell>
                {staffLevel.created_at}
            </TableCell>
            <TableCell>
                <Tooltip title="Edit" onClick={() => themeWage.level.handleUpdate(staffLevel.id, keys)}>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => themeWage.level.handleDelete(staffLevel.id, keys)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default LevelItem;