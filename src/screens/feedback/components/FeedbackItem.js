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
        onClick={() => themeFeedback.handleView(feedback.id, keys)}
        hover
        role="checkbox"
        tabIndex={-1}
    >
        <TableCell>
            {feedback.id}
        </TableCell>
        <TableCell>
            <span>
                {feedback.report_title}
            </span>
        </TableCell>
        <TableCell>
            <span>
                {feedback.report_content_raw}
            </span>
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