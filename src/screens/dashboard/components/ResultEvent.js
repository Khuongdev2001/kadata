import React from "react";
import styles from "./resultEvent.module.scss";
import { Modal } from "../../../components";
import { Checkbox, TextField, Autocomplete } from "@mui/material";


function ResultEvent() {
    return (<div className={styles.wpResultEvent}>
        <table className={styles.tableResultEvent}>
            <thead className={styles.tableHead}>
                <tr>
                    <th className={[styles.headCustomerName, styles.colHead].join(" ")}>Tên Khách Hàng</th>
                    <th className={[styles.headPhone, styles.colHead].join(" ")}>SĐT</th>
                    <th className={[styles.headCompany, styles.colHead].join(" ")}>Đối tác</th>
                    <th className={[styles.headrevenue, styles.colHead].join(" ")}>Doanh số</th>
                    <th className={[styles.headadviser, styles.colHead].join(" ")}>Người tư vấn</th>
                    <th className={[styles.headresulter, styles.colHead].join(" ")}>Người trả kết quả</th>
                    <th className={[styles.headStatus, styles.colHead].join(" ")}>Trạng thái</th>
                </tr>
            </thead>
            <tbody className={styles.tableBody}>
                <tr>
                    <td className={[styles.bodyCustomerName, styles.colBody].join(" ")}>
                        <TextField size="small" fullWidth className={styles.overText} />
                    </td>
                    <td className={[styles.bodyPhone, styles.colBody].join(" ")}>
                        <TextField size="small" fullWidth className={styles.overText} />
                    </td>
                    <td className={[styles.bodyCompany, styles.colBody].join(" ")}>
                        <TextField size="small" fullWidth className={styles.overText} />
                    </td>
                    <td className={[styles.bodyRevenue, styles.colBody].join(" ")}>
                        <TextField size="small" fullWidth className={styles.overText} />
                    </td>
                    <td className={[styles.bodyAdviser, styles.colBody].join(" ")}>
                        <Autocomplete
                            id="highlights-demo"
                            sx={{ m: 0, width: 150 }}
                            options={[]}
                            size="small"
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField {...params} className={styles.selectAdviser} label="Đối Tác" margin="normal" />
                            )}
                        />
                    </td>
                    <td className={[styles.bodyResult, styles.colBody].join(" ")}>Đỗ Văn C</td>
                    <td className={[styles.bodyStatus, styles.colBody].join(" ")}><Checkbox /></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default ResultEvent;