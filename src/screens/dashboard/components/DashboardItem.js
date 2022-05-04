import React from "react";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
    Checkbox,
    Box
} from '@mui/material';
import { Edit, Delete, Article, Block } from '@mui/icons-material';
import { DashboardContext } from "../../../context/DashboardContext";
import { useNavigate } from "react-router-dom";


function DashboardItem({ event, keys }) {
    const themeDashboardContext = React.useContext(DashboardContext);
    const navigate = useNavigate();
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
                {
                    event.is_check_result
                        ? (
                            <Tooltip title="Xem trả kết quả"
                                onClick={() => navigate(`/dashboard/${event.id}`)}>
                                <IconButton>
                                    <Article />
                                </IconButton>
                            </Tooltip>
                        )
                        : (<Tooltip title="Chưa đến thời gian xem kết quả">
                            <IconButton>
                                <Block />
                            </IconButton>
                        </Tooltip>)
                }
                <Tooltip title="Chỉnh Sửa" onClick={() => themeDashboardContext.handleUpdate(event.id, keys)}>
                    <IconButton>
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Xóa">
                    <IconButton onClick={() => themeDashboardContext.handleDelete(event.id, keys)}>
                        <Delete />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    )
}

export default DashboardItem;