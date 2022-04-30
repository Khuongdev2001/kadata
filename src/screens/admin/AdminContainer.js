import React, { useState } from "react";
import styles from "./adminContainer.module.scss";
import { AdminContext } from "../../context/AdminContext";
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
import { BoxFlex, BoxLoading } from "../../components";
import AdminItem from "./components/AdminItem";
import DeleteAdmin from "./components/DeleteAdmin";
import SaveAdmin from "./components/SaveAdmin";
import { useAxiosAuth } from "../../hook/api";

function AdminContainer() {

    React.useEffect(() => {
        document.title = "Quản trị Thành Viên";
    }, [])

    const [filters, setFilters] = useState({
        search: "",
        sortField: {},
        sort: null,
        totalCount: 1,
        pageCount: 1,
        perPage: 10,
        currentPage: 1
    });
    const [admins, setAdmins] = React.useState([]);
    const adminRef = React.useRef({});

    function handleFetch(search = "") {
        useAxiosAuth.get(`admin/site${search}`)
            .then((value) => {
                const result = value.data.data;
                const { items, _meta } = result;
                setAdmins(items);
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

    React.useEffect(() => {
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

    /* Handle Url */
    function setParam(filters, path = "") {
        const params = new URLSearchParams();
        for (let field in filters) {
            params.append(field, filters[field]);
        }
        return `${path}?${params.toString()}`;
    }

    function handleShowAdd() {
        adminRef.current.handleAdd();
    }

    function handleSubmit(e) {
        handleFetch(setParam(filters));
        e.preventDefault();
    }


    return (<AdminContext.Provider value={adminRef.current}>
        <DeleteAdmin onSetAdmins={setAdmins} />
        <SaveAdmin onSetAdmins={setAdmins} />
        <div className={styles.adminPage}>
            <BoxFlex className={styles.adminTop} alignItems="center" justifyContent="space-between">
                <div className={styles.boxLeft}>
                    <h2 className={styles.title}>Danh sách Thành Viên</h2>
                </div>
                <form action="" onSubmit={handleSubmit} className={styles.boxRight}>
                    <TextField
                        id="input-with-icon-textfield"
                        placeholder="Tìm kiếm"
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
                    <Button onClick={handleShowAdd} color="secondary" className={styles.ml} variant="contained" size="small">
                        Thêm mới
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
                                #
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sortField.email}
                                    direction={filters.sortField.email}
                                    onClick={() => handleSetSort("email", filters.sortField.email)}
                                >
                                    Email
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sortField.fullname}
                                    direction={filters.sortField.fullname}
                                    onClick={() => handleSetSort("fullname", filters.sortField.fullname)}
                                >
                                    Họ và Tên
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
                                    active={filters.sortField.created_at}
                                    direction={filters.sortField.created_at}
                                    onClick={() => handleSetSort("created_at", filters.sortField.created_at)}
                                >
                                    Ngày tạo
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                Hành động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            admins.map((admin, index) => {
                                if (admin) {
                                    return <AdminItem keys={index} admin={admin} key={index} />
                                }
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                onPageChange={((e, newPage) => {
                    console.log(newPage);
                })}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                page={filters.currentPage}
                count={filters.totalCount}
                rowsPerPage={filters.perPage}
                title="dev"
            />
        </div >
    </AdminContext.Provider>)
}

export default AdminContainer;