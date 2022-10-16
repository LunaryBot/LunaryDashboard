import styled from 'styled-components';

const DotsWrapper = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        width: 20px;
        height: 20px;
        background: #8385aa;
        border-radius: 50%;
        margin: 3px;
        animation: loader 0.7s infinite alternate;
    }

    & > div:nth-child(2) {
    animation-delay: 0.2s;
}

    & > div:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes loader {
        to {
            opacity: 0.1;
            background: var(--luny-band-100);
        }
    }
`;

export const Dots = () => (
    <DotsWrapper>
        <div />
        <div />
        <div />
    </DotsWrapper>
)