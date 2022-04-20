import React from "react";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { WageContext } from "../../../../../../context/WageContext";

function LevelItem() {
    const themeWage = React.useContext(WageContext);
    return (
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
        >
            <TableCell>
                1
            </TableCell>
            <TableCell>
                Giám Đốc
            </TableCell>
            <TableCell>
                20.000 VNĐ
            </TableCell>
            <TableCell>
                50.000 VNĐ
            </TableCell>
            <TableCell>12/10/2022</TableCell>
            <TableCell>
                <Tooltip title="Edit" onClick={() => themeWage.level.handleAdd()}>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => themeWage.level.handleDelete()}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default LevelItem;