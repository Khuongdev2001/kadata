import React, { useContext, useState } from "react";
import styles from "./wageContainer.module.scss";
import { BoxFlex, Modal } from "../../components";
import { useNavigate } from "react-router-dom";
import { Sync, LocalPrintshop } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import dateFormat, { masks } from "dateformat";
import {
    TextField,
    Tooltip,
    TableContainer,
    TableRow,
    TableCell,
    TableBody,
    Table,
    TableHead,
    TableSortLabel,
    TablePagination,
    IconButton,
    Button
} from '@mui/material';
import FontAwesome from "react-fontawesome";
import { WageContext } from "../../context/WageContext";
import WageItem from "./components/WageItem";
import SaveWage from "./components/SaveWage";
import { useAxiosAuth, baseURL } from "../../hook/api";
import { LoggedContext } from "../../context/LoggedContext";

function WageContainer() {
    React.useEffect(() => {
        document.title = "Quản trị lương nhân viên";
        handleFetch();
    }, [])

    const [filters, setFilters] = useState({
        search: "",
        sortField: {},
        sort: null,
        totalCount: 1,
        pageCount: 1,
        perPage: 10,
        currentPage: 1,
        salaryed_at: new Date()
    });
    const [wages, setWages] = React.useState({
        items: []
    });
    const wageRef = React.useRef();
    const [show, setShow] = useState({
        isDelete: false,
    });
    const navigate = useNavigate();
    const themeLogged = React.useContext(LoggedContext);
    function handleFetch(search = "") {
        useAxiosAuth.get(`admin/wage-staff${search}`)
            .then((value) => {
                const result = value.data.data;
                const { _meta } = result;
                setWages(result);
                setFilters((filter) => {
                    return {
                        ...filter,
                        ..._meta,
                        salaryed_at: result.salary_now
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


    /* Handle Url */
    function setParam(filters, path = "") {
        const params = new URLSearchParams();
        for (let field in filters) {
            params.append(field, filters[field]);
        }
        return `${path}?${params.toString()}`;
    }

    function handlePay() {
        if (window.confirm("Xác nhận tính lương")) {
            useAxiosAuth.get(`admin/wage-staff/pay`)
                .then((value) => {
                    const result = value.data;
                    if (result.status) {
                        themeLogged.handleShowSnackBar(result.message);
                        handleFetch(setParam(filters));
                    }
                    else {
                        alert(result.message);
                    }
                })
                .catch((e) => {
                    alert(e);
                })
        }
    }

    function handleSubmit(e) {
        handleFetch(setParam(filters));
        e.preventDefault();
    }

    function handleRedirectLevel() {
        navigate("level");
    }

    function handleViewPdf() {
        window.open(`${baseURL}/admin/wage-staff/build-pdf?salaryed_at=${wages.salary_now}`);
    }

    return (
        <WageContext.Provider value={new Object()}>
            <SaveWage onSetWages={setWages} />
            <div className={styles.wagePage}>
                <BoxFlex className={styles.wageTop} alignItems="center" justifyContent="space-between">
                    <div className={styles.boxLeft}>
                        <h2 className={styles.title}>Bảng Lương {wages.salary_now}</h2>
                    </div>
                    <div className={styles.boxRight}>
                        <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Tìm kiếm"
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
                        </form>
                        <span className={styles.iconFilter}>
                            <Tooltip title="Filter list">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Tháng Lương"
                                        value={filters.salaryed_at}
                                        views={['month', 'year']}
                                        onChange={function (newValue) {
                                            setFilters({
                                                ...filters,
                                                salaryed_at: dateFormat(newValue, "yyyy-mm")
                                            })
                                            handleFetch(setParam({
                                                ...filters,
                                                salaryed_at: dateFormat(newValue, "yyyy-mm")
                                            }));
                                        }}
                                        maxDate={new Date}
                                        renderInput={(params) => <TextField sx={{
                                        }} size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                            </Tooltip>
                        </span>
                        {
                            !wages.is_payed
                                ? (
                                    <Tooltip title="Tính lương" onClick={handlePay}>
                                        <IconButton>
                                            <Sync />
                                        </IconButton>
                                    </Tooltip>
                                )
                                : (<Tooltip title="In Báo Cáo">
                                    <IconButton
                                        onClick={handleViewPdf}
                                    >
                                        <LocalPrintshop />
                                    </IconButton>
                                </Tooltip>)
                        }
                        <Button onClick={handleRedirectLevel} color="secondary" className={styles.ml} variant="contained" size="small">
                            Quản lý cấp bậc
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
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.staffCode}
                                        direction={filters.sortField.staffCode}
                                        onClick={() => handleSetSort("staffCode", filters.sortField.staffCode)}
                                    >
                                        MNV
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.level}
                                        direction={filters.sortField.level}
                                        onClick={() => handleSetSort("level", filters.sortField.level)}
                                    >
                                        Cấp bậc
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.staffName}
                                        direction={filters.sortField.staffName}
                                        onClick={() => handleSetSort("staffName", filters.sortField.staffName)}
                                    >
                                        Tên nhân viên
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.phone}
                                        direction={filters.sortField.phone}
                                        onClick={() => handleSetSort("phone", filters.sortField.phone)}
                                    >
                                        SĐT
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.basic_pay}
                                        direction={filters.sortField.basic_pay}
                                        onClick={() => handleSetSort("basic_pay", filters.sortField.basic_pay)}
                                    >
                                        Lương cơ bản
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.piece_pay}
                                        direction={filters.sortField.piece_pay}
                                        onClick={() => handleSetSort("piece_pay", filters.sortField.piece_pay)}
                                    >
                                        Lương doanh số
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sortField.allowance_pay}
                                        direction={filters.sortField.allowance_pay}
                                        onClick={() => handleSetSort("allowance_pay ", filters.sortField.allowance_pay)}
                                    >
                                        Phụ cấp
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell width={150}>
                                    <TableSortLabel
                                        active={filters.sortField.total_pay}


                                        direction={filters.sortField.total_pay}
                                        onClick={() => handleSetSort("total_pay", filters.sortField.total_pay)}
                                    >
                                        Tổng
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    Trạng Thái TT
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                wages.items.map((wage, index) => {
                                    return (
                                        <WageItem wage={wage} key={index} keys={index} />
                                    )
                                })
                            }
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
        </WageContext.Provider>)
}

export default WageContainer;