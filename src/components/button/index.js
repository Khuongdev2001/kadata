import styled, { css } from "styled-components";

const Button = styled.button`
    background:none;
    border:none;
    padding:5px;
    display:inline-block;
    cursor: pointer;
    ${(props) => {
        switch (props.type) {
            case "info":
                return css`
                    background-color:#1565c0;
                    color:var(--light);
                    `
            case "danger":
                return css`
                    background-color:#d33030;
                    color:var(--light);
                    `
            case "success":
                return css`
                    background-color:#436645;
                    color:var(--light);
                    `
        }
    }
    }
    ${(props) => {
        switch (props.radius) {
            case "sm":
                return css`
                    border-radius:5px;
                    `
        }
    }
    }

    ${(props) => {
        switch (props.size) {
            case "sm":
                return css`
                    line-height:1.2;
                    width:40px;
                    height:40px;
                    `
        }
    }
    }
    .fa{
        font-size:20px;
    }
`;


export { Button }