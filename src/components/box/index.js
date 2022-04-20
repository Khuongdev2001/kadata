import React from "react";
import styled, { css } from "styled-components";
import {
    Snackbar,
    Alert as MuiAlert,
    LinearProgress,
    Box as BoxMui,
    CircularProgress,
    MenuItem

} from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SnackbarsStyled({ children, ...props }) {
    return (
        <Snackbar {...props}>
            <Alert severity={props.type} sx={{ width: '100%' }}>
                {children}
            </Alert>
        </Snackbar>
    )
}


export const Box = styled.div`
    ${(props) => {
        switch (props.textAlign) {
            case "center":
                return css`
                        text-align:center;
                    `;
        }
    }
    }

    ${(props) => {
        switch (props.cursor) {
            case "pointer":
                return css`
                        cursor:pointer;
                    `;
        }
    }
    }

    :hover{
        ${(props) => {
        switch (props.hoverShadow) {
            case "sm":
                return css`
                            box-shadow:0px 0px 10px #dfdfdfc7;
                        `;
        }
    }
    }
        

        ${(props) => {
        switch (props.hoverBackground) {
            case "light":
                return css`
                            background:var(--light);
                        `;
        }
    }
    }
    
    }
    ${(props) => {
        switch (props.borderRadius) {
            case "sm":
                return css`
                        border-radius:5px;
                    `;
            case "md":
                return css`
                            border-radius:10px;
                        `;
        }
    }
    }

    ${(props) => {
        switch (props.position) {
            case "relative":
                return css`
                        position:relative;
                    `;
        }
    }
    }

    ${(props) => {
        switch (props.background) {
            case "light":
                return css`
                    background:var(--light);
                    `;
            case "graylight":
                return css`
                    background:#DBDBDB;
                `;
        }
    }
    }

    ${(props) => {
        switch (props.shadow) {
            case "sm":
                return css`
                    box-shadow: 0px 0px 10px #5c585830
                    `;
            case "graylight":
                return css`
                    background:#DBDBDB;
                `;
        }
    }
    }

    ${(props) => {
        switch (props.padding) {
            case "sm":
                return css`
                        padding:2px;
                    `;
            case "md":
                return css`
                    padding:5px;
                `
        }
    }
    }

    ${(props) => {
        switch (props.color) {
            case "red":
                return css`
                    color:var(--red);
                `;
        }

    }}

    ${(props) => {
        switch (props.size) {
            case "sm":
                return css`
                    font-size:12px;
                `;
        }

    }}

    ${(props) => {
        switch (props.fontWeight) {
            case "sm":
                return css`
                    font-weight:400;
                `;
        }

    }}
`;

export const BoxFlex = styled.div`
    display:flex;
    flex-wrap:wrap;
    ${(props) => {
        if (props.sx) {
            return css`
                ${(props.sx)}
            `
        }
    }
    }
    ${(props) => {
        switch (props.textAlign) {
            case "center":
                return css`
                    text-align:center;
                `;

        }

    }
    }

    ${(props) => {
        if (props.justifyContent) {
            return css`
                justify-content:${props.justifyContent};
            `
        }

    }
    }
    ${(props) => {
        switch (props.alignItems) {
            case "center":
                return css`
                    align-items:center;
                `;

        }

    }
    }

    ${(props) => {
        switch (props.background) {
            case "light":
                return css`
                    background:var(--light);
                    `;
            case "graylight":
                return css`
                    background:#DBDBDB;
                `;
        }
    }
    }

    ${(props) => {
        switch (props.shadow) {
            case "sm":
                return css`
                    box-shadow: 0px 0px 10px #5c585830;
                    `;
            case "graylight":
                return css`
                    background:#DBDBDB;
                `;
        }
    }
    }

    ${(props) => {
        switch (props.borderRadius) {
            case "sm":
                return css`
                        border-radius:5px;
                    `;
            case "space-between":
                return css`
                        justify-content:space-between;
                    `

        }

    }
    }
`;

export function BoxLoading(props) {
    const [isShow, setIsShow] = React.useState(props.isShow);
    props.refer.current = {
        setIsShow
    }
    return (
        isShow && (
            <BoxMui sx={{ width: '100%', position: "absolute", top: "0px", left: "0px" }}>
                {props.disableClick && <BoxDisableClick background="light" />}
                <LinearProgress />
            </BoxMui>
        )
    );
}



export function BoxLoadingCircle(props) {
    return (
        <BoxFlex alignItems="center" justifyContent="center">
            <CircularProgress {...props} />
        </BoxFlex>
    )
}

export const BoxDisableClick = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1000;
    ${(props) => {
        switch (props.background) {
            case "light":
                return css`
                    background: #ffffff69;
                    `
        }
    }
    }
`;

export const BoxImage = styled.a`
    display:flex;
    align-items:center;
    justify-content:center;
    ${(props) => {
        switch (props.size) {
            case "md":
                return css`
                        width:80px;
                        height:80px;
                    `;
            case "lg":
                return css`
                        width:150px;
                        height:150px;
                    `;
            case "sm":
                return css`
                    width:30px;
                    height:30px;
                `
        }
    }
    }
    img{
        width:100%;
    }
`;

export const Image = styled.img`
   width:100%;
   display:inline-block;
`;

export const BoxLink = styled.a`
    display:inline-block;
`

export const MenuItemList = styled(MenuItem)`
    display:flex;
    align-items:center;
    .boxThumbnail{
        width: 40px;
        height: 40px;
        padding-right: 10px;
        position: relative;
        img{
            width:100%;
            position:absolute;
            top:0px;
        }
    }
`;


