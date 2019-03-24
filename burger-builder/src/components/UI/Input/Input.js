import React from 'react';
import styles from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputStyles = [styles.InputElement];

    let validationError = null;
    if (props.invalid && props.shouldValidate && props.touched) {
        inputStyles.push(styles.Invalid);
        validationError = <p className={styles.ValidationError}>Please enter a valid {props.valueType}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = 
                <input 
                    className={inputStyles.join(' ')}
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}
                />
            break;
        case ('textarea'):
            inputElement = 
                <textarea 
                    className={inputStyles.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}
                />
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputStyles.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option => (
                        <option 
                            key={option.value}
                            value={option.value}
                            onChange={props.changed}
                        >
                            {option.displayValue} 
                        </option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = 
                <input 
                    className={inputStyles.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value}
                    onChange={props.changed}
                />
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;