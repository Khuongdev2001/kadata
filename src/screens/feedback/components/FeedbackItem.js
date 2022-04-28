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

function FeedbackItem({ feedback, keys }) {
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
            {feedback.id}
        </TableCell>
        <TableCell>
            {feedback.report_title}
        </TableCell>
        <TableCell>
            {feedback.report_content}
        </TableCell>
        <TableCell>
            {feedback.customer.name}
        </TableCell>
        <TableCell>{feedback.created_at}</TableCell>
        <TableCell>{feedback.status_text}</TableCell>
        <TableCell>{feedback.done_at}</TableCell>
        <TableCell>
            <Tooltip title="Xem" onClick={() => themeFeedback.handleView(feedback.id, keys)}>
                <IconButton>
                    <RemoveRedEye />
                </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
                <IconButton onClick={() => themeFeedback.handleDelete(feedback.id, keys)}>
                    <Delete />
                </IconButton>
            </Tooltip>
        </TableCell>
    </TableRow>)
}

export default FeedbackItem;