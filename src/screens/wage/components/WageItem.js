import React from "react";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { WageContext } from "../../../context/WageContext";

function WageItem() {
    const themeWage = React.useContext(WageContext);

    return (<TableRow
        hover
        role="checkbox"
        tabIndex={-1}
    >
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
        <TableCell>10.000VNĐ</TableCell>
        <TableCell>200.000VNĐ</TableCell>
        <TableCell>200.000VNĐ</TableCell>
        <TableCell><strong>200.000VNĐ</strong></TableCell>
        <TableCell>
            <Tooltip title="Edit">
                <IconButton onClick={() => themeWage.handleAdd()}>
                    <Edit />
                </IconButton>
            </Tooltip>
        </TableCell>
    </TableRow>)
}

export default WageItem;