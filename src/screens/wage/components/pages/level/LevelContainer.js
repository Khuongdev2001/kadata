import React, { useContext, useState } from "react";
import styles from "./levelContainer.module.scss";
import { BoxFlex, Modal } from "../../../../../components";
import { useNavigate } from "react-router-dom";
import {
    Breadcrumbs,
    Link,
    TextField,
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
import { WageContext } from "../../../../../context/WageContext";
import LevelItem from "./components/LevelItem";
import SaveLevel from "./components/SaveLevel";
import DeleteLevel from "./components/DeleteLevel";
import { useAxiosAuth } from "../../../../../hook/api";

function LevelContainer() {
    const themeWage = React.useContext(WageContext);
    const staffLevelRef = React.useRef({});
    const [staffLevels, setStaffLevels] = React.useState([]);
    React.useEffect(() => {
        document.title = "Quản lý Cấp Bậc";
        handleFetch();
    }, []);

    const [filters, setFilters] = useState({
        search: "",
        sortField: {},
        sort: null,
        totalCount: 1,
        pageCount: 1,
        perPage: 10,
        currentPage: 1
    });
    const navigate = useNavigate();
    function handleFetch(search = "") {
        // boxLoadRef.current.setIshow(true);
        useAxiosAuth.get(`admin/staff-level${search}`)
            .then((value) => {
                const result = value.data.data;
                const { items, _meta } = result;
                setStaffLevels(items);
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

    function handleSubmit(e) {
        handleFetch(setParam(filters));
        e.preventDefault();
    }

    return (<WageContext.Provider value={staffLevelRef.current}>
        <DeleteLevel onSetStaffLevels={setStaffLevels} />
        <SaveLevel onSetStaffLevels={setStaffLevels} />
        <div className={styles.wagePage}>
            <BoxFlex className={styles.wageTop} alignItems="center" justifyContent="space-between">
                <div className={styles.boxLeft}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/wage")
                            }}
                            underline="hover" color="inherit" href="/">
                            Quản lý lương
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/material-ui/getting-started/installation/"
                        >
                            Lương cấp bậc
                        </Link>
                    </Breadcrumbs>
                    <h2 className={styles.title}>Lương cấp bậc</h2>
                </div>
                <BoxFlex className={styles.boxRight} alignItems="center">
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
                    <Button color="secondary" sx={{
                        ml: 1
                    }}
                        onClick={() => staffLevelRef.current.level.handleAdd()}
                        className={styles.ml} variant="contained" size="small">
                        add New
                    </Button>
                </BoxFlex>
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
                                    active={filters.sortField.name}
                                    direction={filters.sortField.name}
                                    onClick={() => handleSetSort("name", filters.sortField.name)}
                                >
                                    Cấp bậc
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sortField.pay_level}
                                    direction={filters.sortField.pay_level}
                                    onClick={() => handleSetSort("pay_level", filters.sortField.pay_level)}
                                >
                                    Lương cấp bậc
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sortField.allowance_pay}
                                    direction={filters.sortField.allowance_pay}
                                    onClick={() => handleSetSort("allowance_pay", filters.sortField.allowance_pay)}
                                >
                                    Phụ cấp
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
                                Hành động
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            staffLevels.map((staffLevel, key) => {
                                if(staffLevel){
                                    return <LevelItem key={key} keys={key} staffLevel={staffLevel} />;
                                }
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                page={filters.currentPage}
                count={filters.totalCount}
                rowsPerPage={filters.perPage}
                title="dev"
            />
        </div >
    </WageContext.Provider>)
}


export default LevelContainer;