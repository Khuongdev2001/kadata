import React, { useState, useRef } from "react";
import styles from "./feedbackContainer.module.scss";
import { BoxFlex } from "../../components";
import {
    TextField,
    Tooltip,
    IconButton,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    Table,
    TableHead,
    TableSortLabel,
    Checkbox,
    TablePagination,
    Button
} from '@mui/material';
import FontAwesome from "react-fontawesome";
import { FilterList } from '@mui/icons-material';
import { FeedbackContext } from "../../context/FeedbackContext";
import FeedbackItem from "./components/FeedbackItem";
import FeedbackSee from "./components/FeedbackSee";
import DeleteFeedback from "./components/DeleteFeedback";
import AddFeedback from "./components/AddFeedback";
import { useAxiosAuth } from "../../hook/api";

function FeedbackContainer() {
    const [feedbacks, setFeedBacks] = React.useState([]);
    const feedbackRef = useRef({});
    const [filters, setFilters] = useState({
        search: "",
        sortField: {},
        sort: null,
        totalCount: 1,
        pageCount: 1,
        perPage: 10,
        currentPage: 1
    });

    React.useEffect(() => {
        document.title = "Quản lý Phản Hồi";
        handleFetch();
    }, []);

    function handleFetch(search = "") {
        // boxLoadRef.current.setIshow(true);
        useAxiosAuth.get(`admin/report${search}`)
            .then((value) => {
                const result = value.data.data;
                const { items, _meta } = result;
                setFeedBacks(items);
                // boxLoadRef.current.setIshow(false);
                setFilters((filter) => {
                    return {
                        ...filter,
                        ..._meta
                    }
                })
            })
            .catch((e) => {
                alert(e);
            })
    }

    function handleSetSort(key, value) {
        const reverse = { asc: "desc", desc: "asc" };
        const convert = { asc: `${key}`, desc: `-${key}` };
        const fieldSort = reverse[value] ? reverse[value] : "asc";
        const keySort = convert[fieldSort];
        const filters_2 = {
            ...filters,
            sortField: {
                [key]: fieldSort,
            },
            sort: keySort
        }
        handleFetch(setParam(filters_2));
        setFilters(filters_2);
    };

    function setParam(filters, path = "") {
        const params = new URLSearchParams();
        for (let field in filters) {
            params.append(field, filters[field]);
        }
        return `${path}?${params.toString()}`;
    }

    function handleSubmit(e) {
        handleFetch(setParam(filters));
        e.preventDefault();
    }

    return (
        <FeedbackContext.Provider value={feedbackRef.current}>
            <FeedbackSee onSetFeedbacks={setFeedBacks} />
            <DeleteFeedback onSetFeedbacks={setFeedBacks} />
            <AddFeedback onSetFeedbacks={setFeedBacks} />
            <div className={styles.feedbackPage}>
                <BoxFlex className={styles.feedbackTop} alignItems="center" justifyContent="space-between">
                    <div className={styles.boxLeft}>
                        <h2 className={styles.title}>Danh sách phản hồi</h2>
                    </div>
                    <BoxFlex alignItems="center" className={styles.boxRight}>
                        <TextField
                            id="input-with-icon-textfield"
                            placeholder="Search list"
                            size="small"
                            label="Tìm Kiếm"
                            value={filters.search}
                            onChange={(event) => setFilters((prev) => {
                                return {
                                    ...prev,
                                    search: event.target.value
                                }
                            })}
                            InputProps={{
                                startAdornment: (
                                    <FontAwesome name="search" className={styles.iconSearch} />
                                ),
                            }}
                        />
                        <Tooltip title="Filter list">
                            <IconButton>
                                <FilterList />
                            </IconButton>
                        </Tooltip>
                        <Button
                            onClick={() => feedbackRef.current.handleAdd()}
                            color="secondary" className={styles.ml} variant="contained" size="small">
                            Thêm mới
                        </Button>
                    </BoxFlex>
                </BoxFlex>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'select all desserts',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.report_title}
                                        direction={filters.sortField.report_title}
                                        onClick={() => handleSetSort("report_title", filters.sortField.report_title)}
                                    >
                                        Tiêu đề
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.report_content}
                                        direction={filters.sortField.report_content}
                                        onClick={() => handleSetSort("report_content", filters.sortField.report_content)}
                                    >
                                        Nội dung
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.customer}
                                        direction={filters.sortField.customer}
                                        onClick={() => handleSetSort("customer", filters.sortField.customer)}
                                    >
                                        Đối tác
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.created_at}
                                        direction={filters.sortField.created_at}
                                        onClick={() => handleSetSort("created_at", filters.sortField.created_at)}
                                    >
                                        Ngày phản hồi
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.status}
                                        direction={filters.sortField.status}
                                        onClick={() => handleSetSort("status", filters.sortField.status)}
                                    >
                                        Trạng thái
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.done_at}
                                        direction={filters.sortField.done_at}
                                        onClick={() => handleSetSort("done_at", filters.sortField.done_at)}
                                    >
                                        Ngày tiếp nhận
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                feedbacks.map((feedback, key) => {
                                    if (feedback) {
                                        return (
                                            <FeedbackItem feedback={feedback} key={key} keys={key} />
                                        )
                                    }
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    page={filters.currentPage}
                    count={filters.totalCount}
                    rowsPerPage={filters.perPage}
                    title="dev"
                />
            </div >
        </FeedbackContext.Provider>)
}

export default FeedbackContainer;