import React, { useContext, useState } from "react";
import styles from "./dashboardContainer.module.scss";
import { BoxFlex, Modal } from "../../components";
import {
    TextField,
    Tooltip,
    IconButton,
    Button,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    Table,
    TableHead,
    TableSortLabel,
    TablePagination,
    Checkbox
} from '@mui/material';
import { FilterList } from '@mui/icons-material';
import FontAwesome from "react-fontawesome";
import { DashboardContext } from "../../context/DashboardContext";
import SaveEvent from "./components/SaveEvent";
import DashboardItem from "./components/DashboardItem";

function DashboardContainer() {
    const [filters, setFilters] = useState({
        search: "",
        sort: {},
        page: 1,
        per_page: 10
    });
    const [show, setShow] = useState({
        isDelete: false,
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

    function handleSetShow(key, isType) {
        setShow((prev) => ({ ...prev, [key]: isType }));
    }

    return (
        <DashboardContext.Provider value={new Object()}>
            <SaveEvent />
            <div className={styles.dashboardPage}>
                {
                    show.isDelete && (
                        <Modal isShow={true} onClose={() => handleSetShow("isDelete", false)} size="sm" position="center">
                            Xóa Sự Kiện Này?
                        </Modal>
                    )
                }
                <BoxFlex className={styles.dashboardTop} alignItems="center" justifyContent="space-between">
                    <div className={styles.boxLeft}>
                        <h2 className={styles.title}>Danh sách sự kiện</h2>
                    </div>
                    <div className={styles.boxRight}>
                        <TextField
                            id="input-with-icon-textfield"
                            placeholder="Search list"
                            size="small"
                            variant="standard"
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
                        <span className={styles.iconFilter}>
                            <Tooltip title="Filter list">
                                <IconButton>
                                    <FilterList />
                                </IconButton>
                            </Tooltip>
                        </span>
                        <Button color="secondary" className={styles.ml} variant="contained" size="small">
                            add New
                        </Button>
                    </div>
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
                                        active={filters.sort.name}
                                        direction={filters.sort.name}
                                        onClick={() => handleSetSort("name", filters.sort.name)}
                                    >
                                        Tên Sự Kiện
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.code_event}
                                        direction={filters.sort.code_event}
                                        onClick={() => handleSetSort("code_event", filters.sort.code_event)}
                                    >
                                        Mã Sự Kiện
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.created_at}
                                        direction={filters.sort.created_at}
                                        onClick={() => handleSetSort("created_at", filters.sort.created_at)}
                                    >
                                        Ngày
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.customer}
                                        direction={filters.sort.customer}
                                        onClick={() => handleSetSort("customer", filters.sort.customer)}
                                    >
                                        Đối Tác
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[1].map(item => <DashboardItem key={item} />)}
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
        </DashboardContext.Provider>)
}

export default DashboardContainer;