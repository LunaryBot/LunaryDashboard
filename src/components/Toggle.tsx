import sty from 'styled-components';

export const CheckRadio = sty.div`
    position: relative;
`

const Input = sty.input`
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--luny-colors-red);
    width: 26px;
    height: 16px;
    border-radius: 10px;
    box-shadow: inset 0 1px 5px var(--luny-colors-flow-40);

    &:focus{
        outline: none;
        cursor: pointer;
    }

    &:before{
        content: '';
        margin-top: 1.5px;
        display: block;
        width: 12px;
        height: 12px;
        background-color: var(--luny-colors-ui-100);
        border-radius: 50%;
        position: absolute;
        left: 2.5px;
        transition: left .3s ease-out;
        -webkit-transition: left .3s ease-out;
    }

    &:after{
        display: block;
        margin-top: 1.5px;
        left: 20px;
        position: absolute;
        font-size: 14px;
        font-weight: bold;
        transition: left .3s ease-out;
        -webkit-transition: left .3s ease-out;
        background-color: var(--luny-colors-red);
    }

    &:checked{
        background-color: var(--luny-colors-band-100);
    }

    &:checked:before{
        left: 12.5px;
    }

    &:checked:after{
        left: 43.5px;
        color: var(--luny-colors-green);
    }
`

export default function Toggle(props) {
    return (
        <Input type="checkbox" {...props} />
    )
}