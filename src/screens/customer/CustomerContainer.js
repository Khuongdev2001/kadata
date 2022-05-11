import React from "react";
import styles from "./customerContainer.module.scss";
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
import { CustomerContext } from "../../context/CustomerContext";
import CustomerItem from "./components/CustomerItem";
import DeleteCustomer from "./components/DeleteCustomer";
import SaveCustomer from "./components/SaveCustomer";
import { baseURL, useAxiosAuth } from "../../hook/api";

function CustomerContainer() {
    const customerRef = React.useRef({});
    const [customers, setCustomers] = React.useState([]);
    React.useEffect(() => {
        document.title = "Quản lý đối tác";
        handleFetch();
    }, []);

    function handleFetch(search = "") {
        // boxLoadRef.current.setIshow(true);
        useAxiosAuth.get(`admin/customer${search}`)
            .then((value) => {
                const result = value.data.data;
                const { items, _meta } = result;
                setCustomers(items);
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
    return (<CustomerContext.Provider value={customerRef.current}>
        <DeleteCustomer onSetCustomers={setCustomers} />
        <SaveCustomer onSetCustomers={setCustomers} />
        <div className={styles.customerPage}>
            <BoxFlex className={styles.customerTop} alignItems="center" justifyContent="space-between">
                <div className={styles.boxLeft}>
                    <h2 className={styles.title}>Danh sách đối tác</h2>
                </div>
                <form onSubmit={handleSubmit} className={styles.boxRight}>
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
                    <a href={baseURL + "/admin/customer/build-pdf"} target="_blank" className={styles.iconPrint}>
                        <Tooltip title="In Báo Cáo">
                            <IconButton>
                                <LocalPrintshop />
                            </IconButton>
                        </Tooltip>
                    </a>
                    <Button
                        onClick={() => customerRef.current.handleAdd()}
                        color="secondary" className={styles.ml} variant="contained" size="small">
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
                                    active={filters.sortField.customerCode}
                                    direction={filters.sortField.customerCode}
                                    onClick={() => handleSetSort("customerCode", filters.sortField.customerCode)}
                                >
                                    Mã Đối Tác
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sortField.name}
                                    direction={filters.sortField.name}
                                    onClick={() => handleSetSort("name", filters.sortField.name)}

                                >
                                    Tên đối tác
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sortField.surrogate}
                                    direction={filters.sortField.surrogate}
                                    onClick={() => handleSetSort("surrogate", filters.sortField.surrogate)}

                                >
                                    Người quản lý
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
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sortField.address}
                                    direction={filters.sortField.address}
                                    onClick={() => handleSetSort("address", filters.sortField.address)}
                                >
                                    Địa chỉ
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                Hành Động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            customers.map((customer, index) => {
                                if (customer) {
                                    return (<CustomerItem
                                        onSetCustomers={setCustomers}
                                        key={index}
                                        keys={index}
                                        customer={customer} />)
                                }
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
    </CustomerContext.Provider>)
}

export default CustomerContainer;