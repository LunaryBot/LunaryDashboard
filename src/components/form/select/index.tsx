import React, { useState, PropsWithChildren, DetailedHTMLProps, HTMLAttributes, useId, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { Utils } from '../../../utils';

type Props = PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;

interface Option {
    label: string;
    value: string|number|bigint;
    icon?: {
        url: string;
    };
    default?: boolean;
    color?: string;
}

interface SelectProps extends Props {
    placeholder: string;
    customId: string;
    options: Option[];
    maxValues?: number;

    backgroundColor?: string;
}

export class Select extends React.Component<SelectProps, { opened: boolean, values: Option[] }> {
    ref: React.RefObject<HTMLDivElement>;
    _id: string;

    constructor(props: SelectProps) {
        super(props);

        this.state = {
            opened: false,
            values: props.options.filter(option => option.default),
        }

        this.ref = React.createRef<HTMLDivElement>();

        this._id = Utils.uuid();
    }

    componentDidMount(): void {
        window.addEventListener('click', e => {
            if(this.ref.current && this.state.opened && !this.ref.current.contains(e.target as Node)) {
                this.setState({ opened: false })
            } 
        }, { capture: true });
    }

    setValue(value: Option['value']) {
        const { props, state } = this;

        const _values = state.values.map(({ value }) => value);

        const isMultiple = props.maxValues > 1;

        if(isMultiple && state.values.length >= props.maxValues) {
            return false;
        }

        if(_values.includes(value)) {
            this.removeValue(value);
            this.setState({ opened: false })
        } else {
            const option = props.options.find(option => option.value == value);

            this.setState({ 
                values: [option, ...(isMultiple ? state.values : [])].splice(0, props.maxValues), 
                opened: false 
            });
        }
    }

    removeValue(value: Option['value']) {
        return this.setState({ values: this.state.values.filter((option) => option.value != value) });
    }

    render() {
        const { props, state: { values, opened }, _id: id } = this;

        const _values = values.map(({ value }) => value);

        const isMultiple = props.maxValues > 1;

        const style = {backgroundColor: props.backgroundColor};

        const Placeholder = () => {
            let placeholder: string|JSX.Element[] = props.placeholder;
        
            if (values.length > 0) {
                if(isMultiple) {
                    placeholder = values.map((option) => (
                        <span className={styles.option} style={style} key={`${option.value}`} onClick={() => this.removeValue(option.value)}>
                            {option.label}
                        </span>
                    ))
                } else {
                    placeholder = values[0].label;
                }
            }
        
            return (
                <div style={style}>
                    {placeholder}
                </div>
            )
        }
    
        const Options = () => {
            const options = isMultiple ? props.options.filter((option) => !_values.includes(option.value)) : props.options;
            
            if(options.length > 0) {
                return options.map((option) => {
                    const props = {
                        'data-value': option.value,
                        style: {},
                    };
    
                    if(_values.includes(option.value)) {
                        props['data-selected'] = true;
                    }
    
                    if(option.color) {
                        const c = hexToRgb(option.color);
    
                        if(c) props.style = {
                            color: `rgb(${c.r}, ${c.g}, ${c.b})`
                        }
                    }
    
                    return (
                        <div className={styles.option} {...props} key={`${id}${option.value}`} onClick={() => this.setValue(option.value)}>
                            {option.icon && <img src={option.icon.url} alt={option.label} />}
                            <span {...props}>{option.label}</span>
                        </div>
                    )
                });
            }
    
            return (<span>Não há nada para ver aqui</span>)
        }

        const selectProps = {};

        if(opened) selectProps['data-opened'] = true;
        if(values.length >= props.maxValues && isMultiple) selectProps['data-full-values'] = true;

        return (
            <div className={styles.select} {...selectProps} ref={this.ref} data-itemID={id}>
                <div className={styles.container}>
                    <div className={styles.placeholderWrapper} onClick={() => this.setState({ opened: !opened })}>
                        <div className={styles.placeholder}>
                            <Placeholder />
                        </div>
                    </div>
    
                    <div className={styles.options} style={{backgroundColor: props.backgroundColor}}>
                        {Options()}
                    </div>
                </div>
            </div>
        )
    }
}

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}