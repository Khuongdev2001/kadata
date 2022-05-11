import React from "react";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { WageContext } from "../../../context/WageContext";

function WageItem({ wage, keys }) {
    const themeWage = React.useContext(WageContext);

    return (<TableRow
        style={wage.status ? { background: "#2ecc71" } : null}
        hover
        role="checkbox"
        tabIndex={-1}
    >
        <TableCell>
            {wage.id}
        </TableCell>
        <TableCell>
            {wage.staff.staff_code}
        </TableCell>
        <TableCell>
            {wage.level}
        </TableCell>
        <TableCell>
            {wage.staff.fullname}
        </TableCell>
        <TableCell>{wage.staff.phone}</TableCell>
        <TableCell>{wage.basic_pay}</TableCell>
        <TableCell>{wage.piece_pay}</TableCell>
        <TableCell>{wage.allowance_pay}</TableCell>
        <TableCell><strong>{wage.total_pay}</strong></TableCell>
        <TableCell>
            <Tooltip title="Chi Tiết">
                <IconButton onClick={() => themeWage.handleAdd(wage.id, keys)}>
                    <Edit />
                </IconButton>
            </Tooltip>
        </TableCell>
    </TableRow>)
}

export default WageItem;