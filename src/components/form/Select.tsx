import { useEffect, useState, PropsWithChildren, DetailedHTMLProps, HTMLAttributes, useId } from 'react';
import styles from '../../styles/Select.module.scss';

type Props = PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;

interface Option {
    label: string;
    value: string|number|bigint;
    icon?: {
        url: string;
    };
    default?: boolean;
}

interface SelectProps extends Props {
    placeholder: string;
    customId: string;
    options: Option[];
    maxValues?: number;
}

export function Select(props: SelectProps) {
    const [opened, setOpen] = useState<boolean>(false);
    const [values, setValues] = useState<Option[]>(props.options.filter(option => option.default));

    const _values = values.map(({ value }) => value);
    const isMultiple = props.maxValues > 1;
    const id = useId();

    function Placeholder() {
        let placeholder: string|JSX.Element[] = props.placeholder;
    
        if (values.length > 0) {
            if(isMultiple) {
                placeholder = values.map((option) => (
                    <span className={styles.option} key={`${option.value}`} onClick={() => removeValue(option.value)}>
                        {option.label}
                    </span>
                ))
            } else {
                placeholder = values[0].label;
            }
        }
    
        return (
            <div>
                {placeholder}
            </div>
        )
    }

    function Options() {
        const options = isMultiple ? props.options.filter((option) => !_values.includes(option.value)) : props.options;
        
        if(options.length > 0) {
            return options.map((option) => {
                const props = {
                    'data-value': option.value,
                };

                if(_values.includes(option.value)) {
                    props['data-selected'] = true;
                }

                return (
                    <div className={styles.option} {...props} key={`${id}${option.value}`} onClick={() => setValue(option.value)}>
                        {option.icon && <img src={option.icon.url} alt={option.label} />}
                        {option.label}
                    </div>
                )
            });
        }

        return (<span>Não há nada para ver aqui</span>)
    }

    function setValue(value: Option['value']) {
        if(isMultiple && values.length >= props.maxValues) {
            return false;
        }

        if(_values.includes(value)) {
            removeValue(value);
        } else {
            const option = props.options.find(option => option.value == value);

            setValues([option, ...(isMultiple ? values : [])].splice(0, props.maxValues))
        }

        setOpen(false);
    }

    function removeValue(value: Option['value']) {
        return setValues(values.filter((option) => option.value != value));
    }

    const selectProps = {};

    if(opened) selectProps['data-opened'] = true;
    if(values.length >= props.maxValues) selectProps['data-full-values'] = true;

    return (
        <div className={styles.select} {...selectProps}>
            <div className={styles.container}>
                <div className={styles.placeholderWrapper} onClick={() => setOpen(!opened)}>
                    <div className={styles.placeholder}>
                        <Placeholder />
                    </div>
                </div>

                <div className={styles.options}>
                    {Options()}
                </div>
            </div>
        </div>
    )
}