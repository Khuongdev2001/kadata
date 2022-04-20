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
import { FilterList } from '@mui/icons-material';
import FontAwesome from "react-fontawesome";
import { StaffContext } from "../../context/StaffContext";
import StaffItem from "./components/StaffItem";
import SaveStaff from "./components/SaveStaff";
import DeleteStaff from "./components/DeleteStaff";


function StaffContainer() {
    const staffRef = React.useRef({});
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
    return (<StaffContext.Provider value={staffRef.current}>
        <SaveStaff />
        <DeleteStaff/>
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
                                    active={filters.sort.staffCode}
                                    direction={filters.sort.staffCode}
                                    onClick={() => handleSetSort("staffCode", filters.sort.staffCode)}
                                >
                                    Mã NV
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
                            [1, 2, 3, 4, 5, 6, 7, 7].map(() => <StaffItem />)
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