import React from "react";
import styles from "./advise.module.scss";
import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { BoxFlex, Button } from "../../../components";
import CustomerItem from "./CustomerItem";
import StaffItem from "./StaffItem";
import dateFormat from "dateformat";
import { useAxiosAuth, baseURL } from "../../../hook/api";
import { LoggedContext } from "../../../context/LoggedContext";
import { DashboardContext } from "../../../context/DashboardContext";
import FontAwesome from "react-fontawesome";


function Advise({ eventRef, onIsShow }) {
    const themeDashboard = React.useContext(DashboardContext);
    const themeLogged = React.useContext(LoggedContext);
    const datePickerRef = React.useRef();
    React.useEffect(() => {
        if (!eventRef.current.isAdd) {
            useAxiosAuth.get(`admin/event/view?id=${eventRef.current.id}`)
                .then(response => {
                    const result = response.data;
                    if (result.status) {
                        const event = result.data.event;
                        event.date_start = event.start_at;
                        setAdvise(result.data.event);
                    }
                }).catch(e => {
                    alert(1);
                })
        }
    }, []);
    function handleAdvise() {
        advise.date_start_value = advise.date_start
            ? dateFormat(advise.date_start, "yyyy-mm-dd")
            : "";
        const url = eventRef.current.isAdd
            ? "admin/event/create"
            : `admin/event/update?id=${eventRef.current.id}`;

        useAxiosAuth.post(url, advise)
            .then(response => {
                const result = response.data;
                if (!result.status) {
                    const errorValue = {};
                    for (let field in result.data.errors) {
                        errorValue[field] = result.data.errors[field][0];
                    }
                    if (typeof errorValue.total_requirement != "undefined") {
                        alert(errorValue.total_requirement);
                    }
                    setErrors(errorValue);
                }
                else {
                    if (eventRef.current.isAdd) {
                        handleRenderAdd(result.data.event);
                    }
                    else {
                        handleRenderUpdate(result.data.event);
                    }
                    themeLogged.handleShowSnackBar(result.message);
                    setTimeout(() => {
                        window.open(result.data.link_target);
                    }, 500);
                    onIsShow(false);
                }
            })
            .catch(error => {
                alert(error);
            })
    }
    const [errors, setErrors] = React.useState({})
    const [advise, setAdvise] = React.useState({
        customer: [],
        staff: [],
        date_start_value: "",
        date_start: "",
        code: "",
        name: ""
    });

    function handleRenderAdd(event) {
        themeDashboard.onSetDashboards((prevState) => {
            return [
                ...prevState,
                event
            ]
        })
    }

    function handleRenderUpdate(event) {
        themeDashboard.onSetDashboards((prevState) => {
            prevState[eventRef.current.key] = event;
            return [...prevState];
        })
    }

    function handleChangeDateStart(value) {
        handleRenderCode(value, false);
        setAdvise({
            ...advise,
            date_start: value
        });
    }

    function setErrorEmpty() {
        setErrors({});
    }

    function handleRenderCode(date, isCheck = true) {
        const checkDate = datePickerRef.current.getAttribute("aria-invalid");
        if (isCheck && checkDate === "true") {
            return false;
        }
        const dateFormated = dateFormat(date, "yyyy-mm-dd");
        useAxiosAuth.get(`admin/event/generate-code?date=${dateFormated}`)
            .then(response => {
                const result = response.data;
                if (result.status) {
                    setAdvise((prevState) => {
                        return {
                            ...prevState,
                            code: result.data.code
                        }
                    });
                }
                else {
                    setAdvise((prevState) => {
                        return {
                            ...prevState,
                            date_start: "",
                            code: result.data.code
                        }
                    });
                    alert(result.message);
                }
            })
    }

    function handleRedirectToView() {
        window.open(`${baseURL}/admin/staff-event/build-pdf?event_id=${eventRef.current.id}`)
    }

    return (
        <div className={styles.wpAdvise}>
            <BoxFlex className={styles.listEvent}>
                <CustomerItem onSetErrorEmpty={setErrorEmpty} errors={errors} advise={advise} setAdvise={setAdvise} />
                <StaffItem onSetErrorEmpty={setErrorEmpty} errors={errors} advise={advise} setAdvise={setAdvise} />
                <div className={styles.eventInfo}>
                    <div className={styles.createAt}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                value={advise.date_start}
                                label="Ngày diễn ra"
                                inputRef={datePickerRef}
                                onChange={(value) => handleChangeDateStart(value)}
                                minDate={new Date()}
                                renderInput={(params) => <TextField
                                    value={""}
                                    onBlur={(e) => handleRenderCode(e.target.value)}
                                    sx={{
                                        mt: 1
                                    }} size="small" {...params} />}
                            />
                        </LocalizationProvider>
                        <p className="error">{errors.date_start_value}</p>
                    </div>
                    <div className={styles.eventCode}>
                        <p>Mã Sự Kiện<small>(Mã này sẽ tự tạo)</small>:</p>
                        <TextField size="small" fullWidth disabled value={advise.code} />
                        <TextField
                            fullWidth
                            size="small"
                            sx={{ display: "block", mt: 2 }}
                            label="Tên Sự Kiện"
                            value={advise.name}
                            error={Boolean(errors.name)}
                            helperText={errors.name}
                            onChange={(e) => setAdvise(prev => {
                                return {
                                    ...prev,
                                    name: e.target.value
                                }
                            })}
                        />
                    </div>
                </div>
            </BoxFlex>

            <div className={styles.actionEvent}>
                <Button
                    onClick={() => handleAdvise()}
                    type="info" radius="sm" size={"sm"} className={styles.btn}>
                    <FontAwesome name="database" /> <p className={styles.btnTitle}>Sắp xếp kết quả</p>
                </Button>
                {!eventRef.current.isAdd && (
                    <React.Fragment>
                        <Button radius="sm" size="sm" className={styles.btn}
                            onClick={handleRedirectToView}
                        >
                            <FontAwesome name="print" />
                            <p className={styles.btnTitle}>
                                Báo Cáo
                            </p>
                        </Button>
                    </React.Fragment>
                )}
            </div>

        </div>
    )
}

export default Advise;