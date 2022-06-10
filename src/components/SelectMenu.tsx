import { EventEmitter } from 'events';
import React from 'react';
import { v4 } from 'uuid';
import Styles from '../styles/SelectMenu.module.css';

interface IOption {
    label: string;
    value: string|number|bigint;
    description?: string;
    icon?: {
        url: string;
        borderRadius?: string;
    };
    default?: boolean;
    disabled?: boolean;
}

interface IData {
    placeholder?: string;
    max_values?: number;
    disabled?: boolean;
    customId?: string;
    options: Array<IOption>;
}

class SelectMenu extends React.Component {
    public props: IData;
    public emitter: EventEmitter;
    
    public state: {
        options: Array<IOption>;
        values: Array<IOption>;
        placeholder: string;
        max_values: number;
        disabled: boolean;
        opened: boolean;
        customId: string;
        _id: string;
    };

    constructor(props: IData) {
        super(props);

        this.emitter = new EventEmitter();

        this.state = {
            options: props.options,
            values: props.options.filter((option) => option.default == true) || [],
            placeholder: props.placeholder,
            max_values: props.max_values,
            disabled: props.disabled,
            opened: false,
            customId: props.customId,
            _id: v4().replace(/-/g, ''),
        };

        this.setState({
            _id: v4().replace(/-/g, ''),
        })
    }

    get _id() {
        return this.state._id;
    }

    get options() {
        return this.state.options;
    }

    public get multiple() {
        return this.state.max_values > 1;
    }

    public get value(): Array<string|number|bigint> {
        return this.state.values.map((option) => option.value);
    }

    public removeValue(value: string|number|bigint) {
        this.state.values = this.state.values.filter((option) => option.value != value);

        this.emitter.emit('change', this.state.values);

        return this.state.values;
    }

    public set value(value: string | number | Array<string|number|bigint>) {
        if (Array.isArray(value)) {
            this.state.values = this.options.filter((option) => value.includes(option.value)).splice(0, this.state.max_values);
        } else {
            this.state.values = this.options.filter((option) => option.value == value).splice(0, this.state.max_values);
        }

        this.emitter.emit('change', this.state.values);
    }
    

    public componentDidMount() {
        window.addEventListener('click', (e) => {
            const selectMenu = document.getElementById(this._id);
            
            if(!selectMenu) return false;

            if(!selectMenu?.contains(e.target as HTMLElement)) {
                this.setState({
                    opened: false,
                });
            }

            return false;
        });
    }
        

    private toggle() {
        this.setState({
            opened: !this.state.opened,
        });
    }

    private placeholder() {
        if (this.state.values.length > 0) {
            if(this.multiple) {
                return this.state.values.map((option) => (<span className={Styles.option} key={`${option.value}`} onClick={() => this.removeValue(option.value)}>{option.label}</span>))
            } else {
                return this.state.values[0].label;
            }
        }

        return this.state.placeholder;
    }

    private setValue(value: string|number|bigint) {
        if(this.multiple && this.state.values.length >= this.state.max_values) {
            return false;
        }
        
        if(this.value.includes(value)) {
            this.removeValue(value);
        } else {
            this.value = [value, ...(this.multiple ? this.value : [])];
        }

        this.toggle();

    }

    private getOptions() {
        const options = this.state.max_values > 1 ? this.state.options.filter((option) => !this.state.values.includes(option)) : this.state.options;
        
        if(options.length > 0) {
            return options.map((option) => (
                <div className={Styles.option} data-value={option.value} data-selected={String(this.value.includes(option.value))} key={`${this._id}${option.value}`} onClick={() => this.setValue(option.value)}>
                    {option.icon && <img src={option.icon.url} alt={option.label} />}
                    {option.label}
                </div>
            ));
        }

        return (<span>Não há nada para ver aqui</span>)
    }

    public render() {
        return (
            <div id={this._id} className={Styles.selectMenu} data-opened={String(this.state.opened)} data-values-full={String(this.multiple && this.state.values.length >= this.state.max_values)}>
                <div className={Styles.container}>
                    <div className={Styles.placeholderWrapper} onClick={this.toggle.bind(this)}>
                        <div className={Styles.placeholder}>
                            <div>
                            {this.placeholder()}
                            </div>
                        </div>
                    </div>

                    <div className={Styles.options}>
                        {this.getOptions()}
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectMenu;