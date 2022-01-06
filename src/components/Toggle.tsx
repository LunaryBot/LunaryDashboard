import sty from 'styled-components';

export const CheckRadio = sty.div`
    margin-left: 3%;
    position: relative;
`

const Input = sty.input`
    -webkit-appearance: none;
    appearance: none;
    background-color: #eee;
    width: 30px;
    height: 15px;
    border-radius: 10px;
    box-shadow: inset 0 1px 5px rgba(0,0,0,.5);

    &:focus{
        outline: none;
        cursor: pointer;
    }

    &:before{
        content: '';
        margin-top: -2.5px;
        display: block;
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        left: 0;
        transition: left .3s ease-out;
        -webkit-transition: left .3s ease-out;
    }

    &:after{
        display: block;
        margin-top: -2.5px;
        left: 20px;
        position: absolute;
        font-size: 14px;
        font-weight: bold;
        transition: left .3s ease-out;
        -webkit-transition: left .3s ease-out;
        color: #666;
    }

    &:checked{
        background-color: #A020F0;
    }

    &:checked:before{
        left: 12.5px;
    }

    &:checked:after{
        left: 43.5px;
        color: green;
    }
`
export default function Toggle(props) {
    return (
        <Input type="checkbox" {...props} />
    )
}