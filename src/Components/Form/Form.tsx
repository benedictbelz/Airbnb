import * as React from 'react';
import { Dictionary, Language } from '../../@types/typeLanguage';
import { getCountries, getLanguage } from '../../@presets/language';
import './Form.scss';

interface Props {
    language: Language;
}

interface States {
    firstName: Field;
    lastName: Field;
    dateOfBirth: Field;
    dateOfArrival: Field;
    dateOfDepature: Field;
    nationality: Field;
    addressStreet: Field;
    addressHouseNumber: Field;
    addressPostCode: Field;
    addressCity: Field;
    addressCountry: Field;
    passportNumber: Field;
    numberOfGuests: Field;
    guestPhone: Field;
    guestEmail: Field;
}

interface Field {
    description: keyof Dictionary;
    items?: { value: string, label: string }[];
    required?: boolean;
    showWarning: boolean;
    type: React.HTMLInputTypeAttribute | 'country';
    validation?: Validation;
    value: string;
}

type Validation = 'isAlphabet' | 'isDate' | 'isEmail' | 'isHouseNumber' | 'isNumber' | 'isPassPort' | 'isPhoneNumber' | 'isPostCode' | 'isStreet';

export default class Form extends React.Component<Props, States> {

    state: States = {
        firstName: {
            description: 'inputFirstName',
            required: true,
            showWarning: false,
            type: 'text',
            validation: 'isAlphabet',
            value: '',
        },
        lastName: {
            description: 'inputLastName',
            required: true,
            showWarning: false,
            type: 'text',
            validation: 'isAlphabet',
            value: '',
        },
        dateOfBirth: {
            description: 'inputDateOfBirth',
            required: true,
            showWarning: false,
            type: 'date',
            validation: 'isDate',
            value: '',
        },
        dateOfArrival: {
            description: 'inputDateOfBirth',
            required: true,
            showWarning: false,
            type: 'date',
            validation: 'isDate',
            value: '',
        },
        dateOfDepature: {
            description: 'inputDateOfBirth',
            required: true,
            showWarning: false,
            type: 'date',
            validation: 'isDate',
            value: '',
        },
        nationality: {
            description: 'inputNationality',
            required: true,
            showWarning: false,
            type: 'country',
            value: '',
        },
        addressStreet: {
            description: 'inputAddressStreet',
            required: true,
            showWarning: false,
            type: 'text',
            validation: 'isStreet',
            value: '',
        },
        addressHouseNumber: {
            description: 'inputAddressHouseNumber',
            required: true,
            showWarning: false,
            type: 'text',
            validation: 'isHouseNumber',
            value: '',
        },
        addressPostCode: {
            description: 'inputAddressPostCode',
            required: true,
            showWarning: false,
            type: 'text',
            validation: 'isPostCode',
            value: '',
        },
        addressCity: {
            description: 'inputAddressCity',
            required: true,
            showWarning: false,
            type: 'text',
            validation: 'isAlphabet',
            value: '',
        },
        addressCountry: {
            description: 'inputAddressCountry',
            required: true,
            showWarning: false,
            type: 'country',
            value: '',
        },
        passportNumber: {
            description: 'inputPassportNumber',
            required: true,
            showWarning: false,
            type: 'text',
            validation: 'isPassPort',
            value: '',
        },
        numberOfGuests: {
            description: 'inputNumberOfGuests',
            required: true,
            showWarning: false,
            type: 'number',
            validation: 'isNumber',
            value: '',
        },
        guestPhone: {
            description: 'inputGuestPhone',
            showWarning: false,
            type: 'tel',
            validation: 'isPhoneNumber',
            value: '',
        },
        guestEmail: {
            description: 'inputGuestEmail',
            showWarning: false,
            type: 'email',
            validation: 'isEmail',
            value: '',
        },
    }

    changeField(fieldName: string, value: string) {
        // ASSIGN VALUE
        const state: any = Object.assign({}, this.state);
        state[fieldName].value = value;
        // GET VALIDATION
        const validation = state[fieldName].validation as Validation;
        // VALIDATE FIELD
        if (validation && !this.validateField(validation, value)) {
            state[fieldName].showWarning = true;
        } else {
            state[fieldName].showWarning = false;
        }
        // SET STATE
        this.setState(state);
    }

    validateField(method: Validation, value: string) {
        if (value === '') {
            return true;
        } else if (method === 'isAlphabet') {
            return (/^[\p{L}\p{M}]+$/u).test(value);
        } else if (method === 'isDate') {
            return Date.parse(value) > 0
        } else if (method === 'isEmail') {
            return (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g).test(value); 
        } else if (method === 'isHouseNumber') {
            return (/^[1-9]\d*(?: ?(?:[a-z]|[/-] ?\d+[a-z]?))?$/g).test(value); 
        } else if (method === 'isNumber') {
            return (/^\d+$/g).test(value); 
        } else if (method === 'isPassPort') {
            return (/^[\p{L}\p{M}0-9]+$/u).test(value); 
        } else if (method === 'isPhoneNumber') {
            return (/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/g).test(value); 
        } else if (method === 'isPostCode') {
            return (/^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/g).test(value); 
        } else if (method === 'isStreet') {
            return (/^[\p{L}\p{M}|-]+\.?$/u).test(value);
        } else {
            return true;
        }
    }

    getWarningMessage(method: Validation) {
        if (method === 'isAlphabet') {
            return getLanguage(this.props.language, 'warningOnlyAlphabets');
        } else if (method === 'isDate') {
            return getLanguage(this.props.language, 'warningCorrectDate');
        } else if (method === 'isEmail') {
            return getLanguage(this.props.language, 'warningCorrectPassPort');
        } else if (method === 'isHouseNumber') {
            return getLanguage(this.props.language, 'warningCorrectHouseNumber');
        } else if (method === 'isNumber') {
            return getLanguage(this.props.language, 'warningOnlyNumbers');
        } else if (method === 'isPassPort') {
            return getLanguage(this.props.language, 'warningCorrectPassPort');
        } else if (method === 'isPhoneNumber') {
            return getLanguage(this.props.language, 'warningCorrectPassPort');
        } else if (method === 'isPostCode') {
            return getLanguage(this.props.language, 'warningCorrectPostCode');
        } else if (method === 'isStreet') {
            return getLanguage(this.props.language, 'warningOnlyAlphabets');
        }
    }

    onSubmit() {

    }

    render() {
        return (
            <form>
                {Object.entries(this.state).map(item => {
                    const fieldName: string = item[0];
                    const fieldProps: Field = item[1];
                    return (
                        <label key={fieldName}>
                            <span className='description'>{getLanguage(this.props.language, fieldProps.description)}</span>
                            {fieldProps.required ? (
                                <span className='required'>*</span>
                            ) : null}
                            {fieldProps.type !== 'country' ? (
                                <input
                                    type={fieldProps.type}
                                    value={fieldProps.value}
                                    onChange={event => this.changeField(fieldName, event.target.value)}
                                />
                            ) : (
                                <select onChange={(event) => this.changeField(fieldName, event.target.value)}>
                                    {getCountries(this.props.language)
                                        .sort((a, b) => a.label.localeCompare(b.label))
                                        .map(item => <option key={item.label} value={item.value}>{item.label}</option>)
                                    }
                                </select>
                            )}
                            {fieldProps.showWarning ? (
                                <p>{this.getWarningMessage(fieldProps.validation)}</p>
                            ) : null}
                        </label>
                    );
                })}
                <button onClick={() => this.onSubmit()}>
                    {getLanguage(this.props.language, 'inputSubmit')}
                </button>
            </form>
        );
    }
}