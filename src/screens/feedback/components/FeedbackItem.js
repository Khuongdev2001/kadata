import React from "react";
import {
    Tooltip,
    IconButton,
    TableRow,
    TableCell,
    Checkbox
} from '@mui/material';
import { Edit, Delete, RemoveRedEye } from '@mui/icons-material';
import { FeedbackContext } from "../../../context/FeedbackContext";

function FeedbackItem() {
    const themeFeedback = React.useContext(FeedbackContext);
    return (<TableRow
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
            Thay đổi chính sách
        </TableCell>
        <TableCell>
            Vui lòng kiểm tra
        </TableCell>
        <TableCell>
            Đối tác 1
        </TableCell>
        <TableCell>12/1/2022</TableCell>
        <TableCell>Đã xử lý</TableCell>
        <TableCell>
            <Tooltip title="Xem" onClick={() => themeFeedback.handleView()}>
                <IconButton>
                    <RemoveRedEye />
                </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
                <IconButton onClick={() => themeFeedback.handleDelete()}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </TableCell>
    </TableRow>)
}

export default FeedbackItem;