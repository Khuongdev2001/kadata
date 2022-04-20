import React from "react";
import FontAwesome from "react-fontawesome";
import styles from "./modal.module.scss";
import styled, { css } from "styled-components";
import { Button } from "@mui/material";
function Modal({
    isShow = false,
    children,
    btnTextConfirm = "Lưu",
    btnTextCancel = "Thoát",
    showModalFooter = true,
    onSetIsShow = () => { },
    onSubmit = () => { },
    onClose = () => { },
    ...props
}
) {
    return (
        isShow
            ? (<ModalStyle className="modal" {...props}>
                <div
                    onClick={() => {
                        onSetIsShow(false)
                        onClose();
                    }}
                    className="modalOuter" />
                <div id="modalDialog" className={["modalDialog", props.classDialog].join(" ")}>
                    <div className="modalHeader">
                        <FontAwesome
                            onClick={() => {
                                onClose();
                                onSetIsShow(false)
                            }}
                            name="times" className="btnExist" />
                    </div>
                    <div className="modalContent">
                        {children}
                    </div>
                    {
                        showModalFooter
                            ? (<div className="modalFooter">
                                <Button
                                    onClick={() => {
                                        onSetIsShow(false)
                                        onClose();
                                    }}
                                    className={[styles.btnCancel, "btnCancel"].join(" ")} variant="outlined" size="small">
                                    {btnTextCancel}
                                </Button>
                                <Button
                                    onClick={onSubmit}
                                    variant="contained" size="small">
                                    {btnTextConfirm}
                                </Button>
                            </div>)
                            : null
                    }
                </div>
            </ModalStyle>)
            : null
    );
}

const ModalStyle = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    overflow: auto;
    ${(props) => {
        return props.zIndex && css`
        z-index:${props.zIndex};
    `
    }
    }
    .modalOuter {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .modalDialog{
        position: absolute;
        background-color: #fff;
        box-shadow: 0px 0px 10px var(--gray-light);
        left: 50%;
        transform: translate(-50%, 20px);
        padding: 20px;
        border-radius: 3px;
        ${(props) => {
        switch (props.position) {
            case "top":
                return css`
                            top:10px;
                        `
            case "center":
                return css`
                            top:50%;
                            transform: translate(-50%, -50%);
                        `
        }
    }
    }

        ${(props) => {
        return props.height && css`
                height:${props.height};
            `
    }
    }


        ${(props) => {
        switch (props.size) {
            case "sm":
                return css`
                            width:400px;
                            @media(max-width:487px){
                                width:93%;
                            }
                        `
            case "xl":
                return css`
                        width:834px;
                        @media(max-width:834px){
                            width:93%;
                        }
                    `
            case "lg":
                return css`
                width:1028px;
                @media(max-width:834px){
                    width:93%;
                }
        `

        }
    }
    }

        .modalHeader{
            .btnExist {
                background-color: var(--light);
                padding: 5px;
                box-shadow: 0px 0px 10px var(--gray-light);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                right: -10px;
                top: -15px;
                cursor: pointer;
                z-index: 10;
            }
        }
        .modalFooter{
            float:right;
            .btnCancel{
                margin-right:5px;
            }
        }
    }
`;

export default Modal;