import sty from "styled-components";

const drop = sty.keyframes`
    from {
        height: 24px;
    }
    to {
        height: 160px;
    }
`

const SelectWrapper = sty.div`
    position: relative;
    width: calc(170px + 5px);
`

const Select = sty.div`
    border-radius: 7px;
    background-color: #0E0F12;
`

const SelectTrigger = sty.div`
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    height: 24px;
    width: calc(170px + 5px);
    max-height: 24px;
    white-space: nowrap;
    overflow: hidden;
    padding-left: 3%;
    padding-right: auto;
    padding-bottom: 3%;

    span {
        white-space: nowrap;
        overflow: hidden;
    }
`

const SelectOptionsSearch = sty.div`
    position: absolute;
    top: -135%;
    display: block;
    font-size: 14px;
    color: #fff;
    height: 32px;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    background: #090a0e;
    width: 175px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    input {
        background-color: #090a0e;
        cursor: pointer;
        border: none transparent;
        padding-left: 10px;
        width: 157px;
        height: 32px;
        color: #fff;
    }
    input:focus {
        outline: none;
    }
`

const SelectOptionsSearchIcon = sty.div`
    margin-right: 1px;
    margin-left: 2px;
    color: #fff
`

const SelectOptions = sty.div`
    overflow-y: scroll;
    position: absolute;
    display: block;
    top: 0%;
    left: 0;
    right: 0;
    background: #0E0F12;
    opacity: 0;
    pointer-events: none;
    z-index: 1;
    height: 160px;
    width: 175px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &::-webkit-scrollbar {
        width: 0.1vh;
    }
      
    &::-webkit-scrollbar-track {
        background: rgba(15, 16, 19, 0);
        border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: #A020F0;
        width: 10px;
    }
`

export {  };