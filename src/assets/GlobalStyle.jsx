import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&family=Playball&display=swap');
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }

    body{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form{
        width: 80%;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .root{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input{
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        height: 45px;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #DBDBDB;
        padding-left: 11px;
    }

    form button{
        background: #52B6FF;
        border-radius: 4.63636px;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
    }

    a[href="/cadastro"], a[href="/"]{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
        margin-top: 25px;
    }

    footer{
        display: flex;
        background: #FFFFFF;
        height: 70px;
        align-items: center;
        position: fixed;
        bottom: 0px;
        width: 100%;
        padding-left: 36px;
        justify-content: space-between;
    }

    footer a{
        font-family: 'Lexend Deca';
        font-style: normal;
       font-weight: 400;
       font-size: 17.976px;
       line-height: 22px;
       text-align: center;
       color: #52B6FF;
       text-decoration: none;
    }

    footer button{
        color: white;
    }

    body{
        box-sizing: border-box;
    }

    ion-icon{
        position: absolute;
        top: 11px;
        right: 11px;
    }
`

export default GlobalStyle;