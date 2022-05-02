import React from "react";
import styles from "./staffContainer.module.scss";
import { BoxFlex } from "../../components";
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
import { FilterList, LocalPrintshop } from '@mui/icons-material';
import FontAwesome from "react-fontawesome";
import { StaffContext } from "../../context/StaffContext";
import StaffItem from "./components/StaffItem";
import SaveStaff from "./components/SaveStaff";
import DeleteStaff from "./components/DeleteStaff";
import { baseURL, useAxiosAuth } from "../../hook/api";


function StaffContainer() {
    const [staffs, setStaffs] = React.useState([]);
    const staffRef = React.useRef({});
    const [filters, setFilters] = React.useState({
        search: "",
        sortField: {},
        sort: null,
        totalCount: 1,
        pageCount: 1,
        perPage: 10,
        currentPage: 1
    });
    React.useEffect(() => {
        document.title = "Quản lý Nhân Sự";
        handleFetch();
    }, []);
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

    function handleFetch(search = "") {
        // boxLoadRef.current.setIshow(true);
        useAxiosAuth.get(`admin/staff${search}`)
            .then((value) => {
                const result = value.data.data;
                const { items, _meta } = result;
                setStaffs(items);
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

    function handleSubmit(e) {
        handleFetch(setParam(filters));
        e.preventDefault();
    }
    return (<StaffContext.Provider value={staffRef.current}>
        <SaveStaff onSetStaffs={setStaffs} />
        <DeleteStaff onSetStaffs={setStaffs} />
        <div className={styles.customerPage}>
            <BoxFlex className={styles.customerTop} alignItems="center" justifyContent="space-between">
                <div className={styles.boxLeft}>
                    <h2 className={styles.title}>Danh sách nhân sự</h2>
                </div>
                <div className={styles.boxRight}>
                    <TextField
                        id="input-with-icon-textfield"
                        placeholder="Search list"
                        size="small"
                        variant="standard"
                        onChange={(e) => setFilters(prev => ({
                            ...prev,
                            search: e.target.value
                        }))}
                        InputProps={{
                            startAdornment: (
                                <FontAwesome name="search" className={styles.iconSearch} />
                            ),
                        }}
                    />
                    <a href={baseURL + "/admin/staff/build-pdf"} target="_blank" className={styles.iconPrint}>
                        <Tooltip title="In Báo Cáo">
                            <IconButton>
                                <LocalPrintshop />
                            </IconButton>
                        </Tooltip>
                    </a>
                    <span className={styles.iconFilter}>
                        <Tooltip title="Filter list">
                            <IconButton>
                                <FilterList />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <Button
                        onClick={() => staffRef.current.handleAdd()}
                        color="secondary" className={styles.ml} variant="contained" size="small">
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
                                    active={filters.sortField.staffCode}
                                    direction={filters.sortField.staffCode}
                                    onClick={() => handleSetSort("staffCode", filters.sortField.staffCode)}
                                >
                                    Mã NV
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
                                    active={filters.sortField.fullname}
                                    direction={filters.sortField.fullname}
                                    onClick={() => handleSetSort("fullname", filters.sortField.fullname)}

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
                                    Số điện thoại
                                </TableSortLabel>
                            </TableCell>
                            <TableCell width={200}>
                                <TableSortLabel
                                    active={filters.sortField.address}
                                    direction={filters.sortField.address}
                                    onClick={() => handleSetSort("address", filters.sortField.address)}
                                >
                                    Địa chỉ
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            staffs.map((staff, key) => {
                                if (staff) {
                                    return <StaffItem staff={staff} keys={key} key={key} />
                                }
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
    </StaffContext.Provider>)

}

export default StaffContainer;