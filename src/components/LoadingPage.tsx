import React from 'react';
import styles from '../styles/LoadingPage.module.css';

interface IProps {
    loading: boolean;
}

export default class LoadingPage extends React.Component {
    constructor(props: IProps) {
        super(props as IProps);

        const { loading } = this.props as IProps;
        this.state = {
            loading: loading
        }
    }

    componentDidMount() {
        const { loading } = this.props as IProps;
        setTimeout(() => {
            const el = document.querySelector(`.${styles["l-overlay"]}`) as HTMLElement;
            if(loading) {
                el.classList.add(styles["active"]);
            } else {
                el.classList.remove(styles["active"]);
            }
        });
    }
 
    componentDidUpdate() {
        const { loading } = this.props as IProps;
        if(loading == false) {
            const el = document.querySelector(`.${styles["l-overlay"]}`) as HTMLElement;
            el.style.transitionDuration = "3s";
            setTimeout(() => {
                el.classList.remove(styles["active"]);
                this.setState({ loading: false })
            });
        }
    }

    render() {
        const { loading } = this.props as IProps;
        return (
            <>
                <div className={styles[loading ? "ll-overlay active" : "ll-overlay"]}></div>
                <div className={styles["l-overlay"]}>
                    <div className={styles["ll"]}>
                        <div className={styles["dots"]}>
                        <div className={styles["bounce"]}/>
                        <div className={styles["bounce2"]}/>
                        <div className={styles["bounce3"]}/>
                    </div>
                    </div>
                        <div className={styles["f"]}></div>
                        <div className={styles["s"]}></div>
                    </div>
            </>
        )
    }
}