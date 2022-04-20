import React from "react";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
    Checkbox
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { DashboardContext } from "../../../context/DashboardContext";


function DashboardItem() {
    const themeDashboardContext = React.useContext(DashboardContext);
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
                Sự kiện 1
            </TableCell>
            <TableCell>OETC1210</TableCell>
            <TableCell>12/10/2021</TableCell>
            <TableCell>Ocean Edu Trường Chinh,....</TableCell>
            <TableCell>
                <Tooltip title="Edit" onClick={() => themeDashboardContext.handleUpdate()}>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => null}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default DashboardItem;