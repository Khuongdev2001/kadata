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

function LevelContainer() {

    const [filters, setFilters] = useState({
        search: "",
        sort: {},
        page: 1,
        per_page: 10
    });
    const navigate = useNavigate();
    const [show, setShow] = useState({
        isDelete: false,
    });
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


    return (<WageContext.Provider value={new Object()}>
        <DeleteLevel />
        <SaveLevel />
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
                    }} className={styles.ml} variant="contained" size="small">
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
                                    active={filters.sort.name}
                                    direction={filters.sort.name}
                                    onClick={() => handleSetSort("name", filters.sort.name)}
                                >
                                    Cấp bậc
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sort.basic_pay}
                                    direction={filters.sort.basic_pay}
                                    onClick={() => handleSetSort("basic_pay", filters.sort.basic_pay)}
                                >
                                    Lương cấp bậc
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sort.allowance_pay}
                                    direction={filters.sort.allowance_pay}
                                    onClick={() => handleSetSort("allowance_pay", filters.sort.allowance_pay)}
                                >
                                    Phụ cấp
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={filters.sort.created_at}
                                    direction={filters.sort.created_at}
                                    onClick={() => handleSetSort("created_at", filters.sort.created_at)}
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
                            [1, 2, 2, 2, 2, 2, 2, 2, 2].map((value) => {
                                return <LevelItem key={value} />;
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
    </WageContext.Provider>)
}


export default LevelContainer;