import sty from 'styled-components';

const Loading_dots = sty.div`
    & > div {
        width: 3rem;
        height: 3rem;
        background: #fff;
        border-radius: 50%;
        display: inline-block;
        animation: 1.5s bounce infinite ease-in-out both;
    }

    & .bounce {
        animation-delay: -0.30s;
    }

    & .bounce2 {
        animation-delay: -0.15s;
    }

    @keyframes bounce {
        0%, 80%, 100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1);
        }
    }
`

export default function LoadingDots() {
    return (
        <Loading_dots>
            <div className='bounce'/>
            <div className='bounce2' />
            <div className='bounce3' />
        </Loading_dots>
    )
}