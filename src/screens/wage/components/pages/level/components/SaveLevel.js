import React from "react";
import { Modal } from "../../../../../../components";
import { WageContext } from "../../../../../../context/WageContext";
import { TextField, Grid } from '@mui/material';

function SaveLevel() {
    const themeWage = React.useContext(WageContext);
    const [isShow, setIshow] = React.useState(false);
    themeWage.level = {
        ...themeWage.level,
        handleAdd: function () {
            setIshow(true);
        }
    }
    return (<Modal isShow={isShow} onClose={() => setIshow(false)} size="sm">
        <h2>Cập Nhật Cấp Bậc</h2>
        <Grid container spacing={2} sx={{ py: 2 }}>
            <Grid item xs={6}>
                <TextField
                    aria-readonly
                    label="Tên cấp bậc"
                    defaultValue="Giám Đốc"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Lương cơ bản"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Phụ cấp"
                    id="filled-size-small"
                    fullWidth
                    size="small" />
            </Grid>
        </Grid>
    </Modal>)
}


export default SaveLevel;
