import React, { useState } from "react";
import styles from "./resultEventContainer.module.scss";
import { BoxFlex } from "../../components";
import {
    Breadcrumbs,
    Link,
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
import { Sync, LocalPrintshop } from '@mui/icons-material';
import FontAwesome from "react-fontawesome";
import { LoggedContext } from "../../context/LoggedContext";
import { ResultEventContext } from "../../context/ResultEventContext";
import { baseURL, useAxiosAuth } from "../../hook/api";
import { useParams, useNavigate } from "react-router-dom";
import ResultEvent from "./components/ResultItem";
import SaveResultEvent from "./components/SaveResultEvent";
import DeleteResultItem from "./components/DeleteResultItem";

function DashboardContainer() {
    let { id } = useParams();
    const navigate = useNavigate();
    const resultEventRef = React.useRef({});
    const [event, setEvent] = React.useState({});
    const [resultEvents, setResultEvents] = React.useState([]);
    const [show, setShow] = useState({
        isDelete: false,
    });
    const themeLogged = React.useContext(LoggedContext);
    resultEventRef.current.onSetDashboards = setResultEvents;
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
        document.title = "Quản lý trả kết quả";
        handleFetch(setParam(filters));
        handleInitGetEvent();
    }, []);

    function handleInitGetEvent() {
        useAxiosAuth.get(`admin/event/view?id=${id}`)
            .then((response) => {
                const result = response.data;
                if (result.status) {
                    setEvent(result.data.event);
                }
            })
            .catch(e => {
                alert(e);
            })
    }

    function handleFetch(search = "") {
        // boxLoadRef.current.setIshow(true);
        useAxiosAuth.get(`admin/event-result${search}`)
            .then((value) => {
                const result = value.data.data;
                const { items, _meta } = result;
                setResultEvents(items);
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
        currentPage: 1,
        event_id: id
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

    function handleSortResult() {
        useAxiosAuth.get(`admin/event-result/sort?event_id=${id}`)
            .then((response) => {
                const result = response.data;
                if (result.status) {
                    handleFetch(setParam(filters));
                    themeLogged.handleShowSnackBar(result.message);
                }
                else {
                    alert(result.message);
                }
            })
            .catch(e => {
                alert(e);
            })
    }

    function handleViewPdf(){
        window.open(`${baseURL}/admin/event-result/build-pdf?event_id=${id}`);
    }

    return (
        <ResultEventContext.Provider value={resultEventRef.current}>
            <SaveResultEvent onSetResultEvents={setResultEvents} />
            <DeleteResultItem onSetResultEvents={setResultEvents} />
            <div className={styles.dashboardPage}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ p: 2 }}>
                    <Link
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/dashboard")
                        }}
                        underline="hover" color="inherit" href="/">
                        Quản lý sự kiện
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/material-ui/getting-started/installation/"
                    >
                        Danh sách kết quả sự kiện
                    </Link>
                </Breadcrumbs>
                <BoxFlex className={styles.dashboardTop} alignItems="center" justifyContent="space-between">
                    <div className={styles.boxLeft}>
                        <h2 className={styles.title}>
                            Danh sách trả kết quả sk: {event.name}
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className={styles.boxRight}>
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
                            <Tooltip title="Sắp xếp trả kết quả">
                                <IconButton
                                    onClick={handleSortResult}
                                >
                                    <Sync />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="In Báo Cáo">
                            <IconButton
                                onClick={handleViewPdf}
                            >
                                <LocalPrintshop />
                            </IconButton>
                        </Tooltip>
                        </span>
                        <Button color="secondary"
                            onClick={() => resultEventRef.current.handleAdd()}
                            className={styles.ml} variant="contained" size="small">
                            Thêm Mới
                        </Button>
                    </form>
                </BoxFlex>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.name}
                                        direction={filters.sortField.name}
                                        onClick={() => handleSetSort("name", filters.sortField.name)}
                                    >
                                        Tên Khách Hàng
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.code}
                                        direction={filters.sortField.code}
                                        onClick={() => handleSetSort("code", filters.sortField.code)}
                                    >
                                        SĐT Khách Hàng
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
                                        active={filters.sortField.turnover}
                                        direction={filters.sortField.turnover}
                                        onClick={() => handleSetSort("turnover", filters.sortField.turnover)}
                                    >
                                        Doanh Thu
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.customer_id}
                                        direction={filters.sortField.customer_id}
                                        onClick={() => handleSetSort("customer_id", filters.sortField.customer_id)}
                                    >
                                        Đối Tác
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.seller_id}
                                        direction={filters.sortField.seller_id}
                                        onClick={() => handleSetSort("seller_id", filters.sortField.seller_id)}
                                    >
                                        Người Trả Kết Quả
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Hành Động
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resultEvents.map((resultEvent, key) => {
                                if (resultEvent) {
                                    return (<ResultEvent resultEvent={resultEvent} keys={key} key={key} />)
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    page={2}
                    count={10}
                    rowsPerPage={12}
                    title="dev"
                /> */}
            </div >
        </ResultEventContext.Provider>)
}

export default DashboardContainer;