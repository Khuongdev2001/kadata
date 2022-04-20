import React, { useState } from "react";
import { Snackbar, Button } from "@mui/material";
/*
* @param refer add list function
*/
function WpSnackbar({ refer }) {
    const [result, setResult] = useState({
        message: "",
        action: {
            title: "",
            handleClick: () => { }
        }
    });
    /**
     * 
     * @param string notification
     * @param object title|handleClick
     */
    refer.current.handleShowSnackBar = function (message, { title = null, handleClick } = {}) {
        setResult({
            message,
            action: {
                title,
                handleClick
            }
        });
    };

    return (<Snackbar message={result.message}
        autoHideDuration={2000}
        onClose={() => {
            setResult({
                message: "",
                action: {}
            });
        }} open={Boolean(result.message)} action={
            (
                result.action.title
                &&
                <Button color="secondary"
                    size="small"
                    onClick={result.action.handleClick}>
                    {result.action.title}
                </Button>
            )
        } />)
}


export default WpSnackbar;