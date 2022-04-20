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
import { FilterList } from '@mui/icons-material';
import FontAwesome from "react-fontawesome";
import { CustomerContext } from "../../context/CustomerContext";
import CustomerItem from "./components/CustomerItem";
import DeleteCustomer from "./components/DeleteCustomer";
import SaveCustomer from "./components/SaveCustomer";

function CustomerContainer() {
    const customerRef = React.useRef({});
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
    const [filters, setFilters] = React.useState({
        search: "",
        sort: {},
        page: 1,
        per_page: 10
    });
    return (<CustomerContext.Provider value={customerRef.current}>
        <DeleteCustomer />
        <SaveCustomer />
        <div className={styles.customerPage}>
            <BoxFlex className={styles.customerTop} alignItems="center" justifyContent="space-between">
                <div className={styles.boxLeft}>
                    <h2 className={styles.title}>Danh sách đối tác</h2>
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
                    <span className={styles.iconFilter}>
                        <Tooltip title="Filter list">
                            <IconButton>
                                <FilterList />
                            </IconButton>
                        </Tooltip>
                    </span>
                    <Button
                        onClick={() => customerRef.current.handleAdd()}
                        color="secondary" className={styles.ml} variant="contained" size="small">
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
                                    active={filters.sort.customerCode}
                                    direction={filters.sort.customerCode}
                                    onClick={() => handleSetSort("customerCode", filters.sort.customerCode)}
                                >
                                    Mã Đối Tác
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sort.customer}
                                    direction={filters.sort.customer}
                                    onClick={() => handleSetSort("customer", filters.sort.customer)}

                                >
                                    Tên đối tác
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sort.surrogate}
                                    direction={filters.sort.surrogate}
                                    onClick={() => handleSetSort("surrogate", filters.sort.surrogate)}

                                >
                                    Người quản lý
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sort.phone}
                                    direction={filters.sort.phone}
                                    onClick={() => handleSetSort("phone", filters.sort.phone)}

                                >
                                    Số điện thoại
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sort.address}
                                    direction={filters.sort.address}
                                    onClick={() => handleSetSort("address", filters.sort.address)}
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
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => <CustomerItem />)
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
    </CustomerContext.Provider>)
}

export default CustomerContainer;