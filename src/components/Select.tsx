import React from 'react';
import styles from '../styles/Select.module.css';

export default class Select extends React.Component {
    componentDidMount() {
        const { id } = this.props as { id: string };
        const w = document.getElementById(`w-${id}`) as HTMLElement;
        const select = document.getElementById(id);
        const options = select.querySelectorAll(`#options-${id} .${styles["option"]}`) as NodeListOf<HTMLElement>;
        const placeholder = select.querySelector(`#placeholder-${id}`);
        console.log(placeholder.innerHTML);
        options.forEach(element => {
            const attrs = element.attributes
            element.addEventListener('click', (e) => {
                console.log(attrs["data-li"])

                options.forEach(element => {
                    element.classList.remove(styles["selected"])
                })
                
                element.classList.add(styles["selected"])

                w.setAttribute('data-value', attrs["data-value"]?.value || attrs["data-li"]?.value || element.innerHTML);
                
                placeholder.innerHTML = attrs["data-li"]?.value || element.innerHTML
            })
        })
        console.log(options)
        select.addEventListener('click', () => {
            select.classList.toggle(styles["open"])
        })
        
        window.addEventListener('click', (e: any) => {
            if(!select.contains(e.target)) {
                select.classList.remove(styles["open"])
            }
        })
    }

    componentDidUpdate() {
        const { id } = this.props as { id: string };
        const w = document.getElementById(`w-${id}`) as HTMLElement;
        const select = document.getElementById(id)
        const options = select.querySelectorAll(`#options-${id} .${styles["option"]}`)
        const placeholder = select.querySelector(`#placeholder-${id}`)
        console.log(placeholder.innerHTML)
        options.forEach(element => {
            const attrs = element.attributes
            element.addEventListener('click', (e) => {
                console.log(attrs["data-li"])

                options.forEach(element => {
                    element.classList.remove(styles["selected"])
                })
                
                element.classList.add(styles["selected"])

                w.setAttribute('data-value', attrs["data-value"]?.value || attrs["data-li"]?.value || element.innerHTML);

                placeholder.innerHTML = attrs["data-li"]?.value || element.innerHTML
            })
        })
    }
    
    render() {
        const { children, id, ['data-value']: data_value, value, placeholder = "", ...m } = this.props as { children: any; id: string; 'data-value': string, value: string, placeholder: string };
        return (
            <main id={`w-${id}`} {...m} data-value={data_value || value || 'none'}>
                <div className={styles["select-wrapper"]}>
                    <div id={id} className={`${styles["select"]}`}>
                        <div className={styles["placeholder"]}>
                            <span id={`placeholder-${id}`}>{value || placeholder}</span>
                            <div className={styles["arrow"]}></div>
                        </div>
                        <div className={styles["options"]} id={`options-${id}`}>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export const Option = function(props) {
    return (
        <span 
            className={`${styles["option"]}${!!props.selected ? ` ${styles["selected"]}` : ''}`}
            data-value={props["data-value"]}
            data-li={props["data-li"]}
        >
            {props.children}
        </span>
    )
}