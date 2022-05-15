import { EventEmitter } from 'events';
import React from 'react';
import { v4 } from 'uuid';
import Styles from '../styles/SelectMenu.module.css';

interface IOption {
    label: string;
    value: string;
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
}

class SelectMenu extends EventEmitter {
    public declare data: IData;

    public options: Array<IOption>;
    public values: Array<IOption>;
    public placeholder: string;
    public max_values: number;
    public disabled: boolean;
    public _id: string;

    constructor(options: Array<IOption>, data: IData = {}) {
        super();

        this.options = options;
        this.values = options.filter((option) => option.default == true) || [];
        this.placeholder = data.placeholder;
        this.max_values = data.max_values || 1;
        this.disabled = data.disabled;
        this._id = v4();
    }

    public get multiple() {
        return this.max_values > 1;
    }

    public get value(): Array<string> {
        return this.values.map((option) => option.value);
    }

    public removeValue(value: string) {
        this.values = this.values.filter((option) => option.value != value);

        this.emit('change', this.values);

        return this.values;
    }

    public set value(value: string | Array<string>) {
        if (Array.isArray(value)) {
            this.values = this.options.filter((option) => value.includes(option.value)).splice(0, this.max_values);
        } else {
            this.values = this.options.filter((option) => option.value == value).splice(0, this.max_values);;
        }
    }

    get Component() {
        return SelectMenuComponent;
    }
}

class SelectMenuComponent extends React.Component {
    public manager: SelectMenu;
    
    public state: {
        options: Array<IOption>;
        values: Array<IOption>;
        placeholder: string;
        max_values: number;
        disabled: boolean;
        opened: boolean;
        _id: string;
    };

    constructor(props: { manager: SelectMenu }) {
        super(props);

        this.manager = props.manager;

        this.state = {
            options: this.manager.options,
            values: this.manager.values,
            placeholder: this.manager.placeholder,
            max_values: this.manager.max_values,
            disabled: this.manager.disabled,
            opened: false,
            _id: v4(),
        };

        this.manager.on('change', (values) => {
            this.setState({
                values,
            })
        });

        this.setState({
            _id: v4(),
        })
    }

    get _id() {
        return this.state._id;
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
            _id: v4(),
        });
    }

    private placeholder() {
        if (this.manager.values.length > 0) {
            if(this.manager.multiple) {
                return this.state.values.map((option) => (<span className={Styles.option} key={option.value} onClick={() => this.manager.removeValue(option.value)}>{option.label}</span>))
            } else {
                return this.manager.values[0].label;
            }
        }

        return this.state.placeholder;
    }

    private setValue(value: string) {
        if(this.manager.multiple && this.manager.values.length >= this.manager.max_values) {
            return false;
        }

        console.log([value, ...this.manager.value]);

        this.manager.value = [value, ...(this.manager.multiple ? this.manager.value : [])];

        console.log(this.manager.value);
        this.toggle();

        this.manager.emit('change', this.manager.values);
    }

    private getOptions() {
        const options = this.state.options.filter((option) => !this.state.values.includes(option));
        
        if(options.length > 0) {
            return options.map((option) => (
                <div className={Styles.option} data-value={option.value} key={option.value} onClick={() => this.setValue(option.value)}>
                    {option.icon && <img src={option.icon.url} alt={option.label} />}
                    {option.label}
                </div>
            ));
        }

        return (<span>Não há nada para ver aqui</span>)
    }

    public render() {
        return (
            <div id={this._id} className={Styles.selectMenu} data-opened={String(this.state.opened)} data-values-full={String(this.manager.multiple && this.state.values.length >= this.manager.max_values)}>
                <div className={Styles.container}>
                    <div className={Styles.placeholderWrapper} onClick={() => this.toggle()}>
                        <div className={Styles.placeholder}>
                            <div>
                                <span>{this.placeholder()}</span>
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

export { SelectMenu, SelectMenuComponent };

export default SelectMenu;