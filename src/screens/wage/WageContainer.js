import React, { useContext, useState } from "react";
import styles from "./wageContainer.module.scss";
import { BoxFlex, Modal } from "../../components";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
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
    Button
} from '@mui/material';
import FontAwesome from "react-fontawesome";
import { WageContext } from "../../context/WageContext";
import WageItem from "./components/WageItem";
import SaveWage from "./components/SaveWage";

function WageContainer() {
    const [filters, setFilters] = useState({
        search: "",
        sort: {},
        page: 1,
        per_page: 10
    });
    const [show, setShow] = useState({
        isDelete: false,
    });
    const navigate = useNavigate();
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

    function handleRedirectLevel() {
        navigate("level");
    }


    return (
        <WageContext.Provider value={new Object()}>
            <SaveWage />
            <div className={styles.wagePage}>
                <BoxFlex className={styles.wageTop} alignItems="center" justifyContent="space-between">
                    <div className={styles.boxLeft}>
                        <h2 className={styles.title}>Bảng Lương 10/10</h2>
                    </div>
                    <div className={styles.boxRight}>
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
                        <span className={styles.iconFilter}>
                            <Tooltip title="Filter list">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Tháng Lương"
                                        views={['year', 'month']}
                                        onChange={() => null}
                                        renderInput={(params) => <TextField sx={{
                                        }} size="small" {...params} />}
                                    />
                                </LocalizationProvider>
                            </Tooltip>
                        </span>
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
                                        active={filters.sort.staffCode}
                                        direction={filters.sort.staffCode}
                                        onClick={() => handleSetSort("staffCode", filters.sort.staffCode)}
                                    >
                                        MNV
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.level}
                                        direction={filters.sort.level}
                                        onClick={() => handleSetSort("level", filters.sort.level)}
                                    >
                                        Cấp bậc
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.staffName}
                                        direction={filters.sort.staffName}
                                        onClick={() => handleSetSort("staffName", filters.sort.staffName)}
                                    >
                                        Tên nhân viên
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.phone}
                                        direction={filters.sort.phone}
                                        onClick={() => handleSetSort("phone", filters.sort.phone)}
                                    >
                                        SĐT
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.basic_pay}
                                        direction={filters.sort.basic_pay}
                                        onClick={() => handleSetSort("basic_pay", filters.sort.basic_pay)}
                                    >
                                        Lương cơ bản
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.piece_pay}
                                        direction={filters.sort.piece_pay}
                                        onClick={() => handleSetSort("piece_pay", filters.sort.piece_pay)}
                                    >
                                        Lương doanh số
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.allowance_pay}
                                        direction={filters.sort.allowance_pay}
                                        onClick={() => handleSetSort("allowance_pay ", filters.sort.allowance_pay)}
                                    >
                                        Phụ cấp
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={filters.sort.total_pay}
                            
                            
                                        direction={filters.sort.total_pay}
                                        onClick={() => handleSetSort("total_pay", filters.sort.total_pay)}
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
                                [1, 2, 3, 4, 5, 6, 1, 1].map((value) => {
                                    return (
                                        <WageItem key={value} />
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