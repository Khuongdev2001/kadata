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


function DashboardItem({ event, keys }) {
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
                {event.id}
            </TableCell>
            <TableCell>
                {event.name}
            </TableCell>
            <TableCell>
                {event.code}
            </TableCell>
            <TableCell>
                {event.created_at}
            </TableCell>
            <TableCell>
                {event.start_at}
            </TableCell>
            <TableCell>
                <Tooltip title="Edit" onClick={() => themeDashboardContext.handleUpdate(event.id, keys)}>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => themeDashboardContext.handleDelete(event.id, keys)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default DashboardItem;