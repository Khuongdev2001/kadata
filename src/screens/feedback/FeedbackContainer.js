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

function FeedbackContainer() {
    const feedbackRef = useRef({});
    const [filters, setFilters] = useState({
        search: "",
        sort: {},
        page: 1,
        per_page: 10
    });

    function handleSetSort(key, value) {
        const reverse = { asc: "desc", desc: "asc" };
        setFilters((filters) => {
            return {
                ...filters,
                sort: {
                    [key]: reverse[value] ?? "asc"
                }
            }
        });
    };

    return (
        <FeedbackContext.Provider value={feedbackRef.current}>
            <FeedbackSee />
            <DeleteFeedback />
            <AddFeedback />
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
                            add New
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
                                        active={filters.sort.staffCode}
                                        direction={filters.sort.staffCode}
                                        onClick={() => handleSetSort("staffCode", filters.sort.staffCode)}
                                    >
                                        Tiêu đề
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.level}
                                        direction={filters.sort.level}
                                        onClick={() => handleSetSort("level", filters.sort.level)}
                                    >
                                        Nội dung
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.staffName}
                                        direction={filters.sort.staffName}
                                        onClick={() => handleSetSort("staffName", filters.sort.staffName)}
                                    >
                                        Đối tác
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.staffName}
                                        direction={filters.sort.staffName}
                                        onClick={() => handleSetSort("staffName", filters.sort.staffName)}
                                    >
                                        Ngày phản hồi
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.staffName}
                                        direction={filters.sort.staffName}
                                        onClick={() => handleSetSort("staffName", filters.sort.staffName)}
                                    >
                                        Trạng thái
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                [1, 2, 3, 4, 5, 6].map(() => {
                                    return (
                                        <FeedbackItem />
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    page={2}
                    count={10}
                    rowsPerPage={12}
                    title="dev"
                />
            </div >
        </FeedbackContext.Provider>)
}

export default FeedbackContainer;