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
import DeleteDashboard from "./components/DeleteDashboard";
import { baseURL, useAxiosAuth } from "../../hook/api";

function DashboardContainer() {
    const dashboardRef = React.useRef({});
    const [dashboards, setDashboards] = React.useState([]);
    const [show, setShow] = useState({
        isDelete: false,
    });
    dashboardRef.current.onSetDashboards = setDashboards;
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

    React.useEffect(() => {
        document.title = "Quản lý sự kiện";
        handleFetch();
    }, []);

    function handleFetch(search = "") {
        // boxLoadRef.current.setIshow(true);
        useAxiosAuth.get(`admin/event${search}`)
            .then((value) => {
                const result = value.data.data;
                const { items, _meta } = result;
                setDashboards(items);
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

    const [filters, setFilters] = React.useState({
        search: "",
        sortField: {},
        sort: null,
        totalCount: 1,
        pageCount: 1,
        perPage: 10,
        currentPage: 1
    });

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

    /* Handle Url */
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
        <DashboardContext.Provider value={dashboardRef.current}>
            <DeleteDashboard onSetDashboards={setDashboards} />
            <SaveEvent />
            <div className={styles.dashboardPage}>
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
                        <Button color="secondary"
                            onClick={() => dashboardRef.current.handleAdd()}
                            className={styles.ml} variant="contained" size="small">
                            Thêm Mới
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
                                        active={filters.sortField.name}
                                        direction={filters.sortField.name}
                                        onClick={() => handleSetSort("name", filters.sortField.name)}
                                    >
                                        Tên Sự Kiện
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.code}
                                        direction={filters.sortField.code}
                                        onClick={() => handleSetSort("code", filters.sortField.code)}
                                    >
                                        Mã Sự Kiện
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.created_at}
                                        direction={filters.sortField.created_at}
                                        onClick={() => handleSetSort("created_at", filters.sortField.created_at)}
                                    >
                                        Ngày Tạo
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.start_at}
                                        direction={filters.sortField.start_at}
                                        onClick={() => handleSetSort("start_at", filters.sortField.start_at)}
                                    >
                                        Ngày Diễn Ra
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Hành Động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dashboards.map((dashboard, index) => {
                                if (dashboard) {
                                    return (
                                        <DashboardItem event={dashboard} key={index} keys={index} />
                                    )
                                }
                            })}
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