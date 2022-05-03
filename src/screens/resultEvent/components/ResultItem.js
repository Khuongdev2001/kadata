import React from "react";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
    Checkbox
} from '@mui/material';
import { Edit, Delete, CheckCircle, Block } from '@mui/icons-material';
import { ResultEventContext } from "../../../context/ResultEventContext";

function ResultEvent({ resultEvent, keys }) {
    const themeResultEvent = React.useContext(ResultEventContext);
    return (<TableRow
        hover
        role="checkbox"
        tabIndex={-1}
    >
        <TableCell>
            {resultEvent.buyer_name}
        </TableCell>
        <TableCell>
            {resultEvent.buyer_phone}
        </TableCell>
        <TableCell>
            {resultEvent.created_at}
        </TableCell>
        <TableCell>
            {resultEvent.turnover}
        </TableCell>
        <TableCell>
            {resultEvent.customer_name}
        </TableCell>
        <TableCell>
            {resultEvent.seller_name ?? "chưa sắp xếp"}
        </TableCell>
        <TableCell>
            {
                !resultEvent.status ? (
                    <Tooltip title="Trả kết quá" onClick={() => {
                        if (window.confirm("Xác nhận đã trả kết quả")) {
                            themeResultEvent.handleConfirm(resultEvent.id, keys);
                        }
                    }}>
                        <IconButton>
                            <CheckCircle />
                        </IconButton>
                    </Tooltip>
                )
                    : null
            }
            <Tooltip title="Xem" onClick={() => themeResultEvent.handleUpdate(resultEvent.id, keys)}>
                <IconButton>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
                <IconButton onClick={() => themeResultEvent.handleDelete(resultEvent.id, keys)}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </TableCell>
    </TableRow >)
}

export default ResultEvent;