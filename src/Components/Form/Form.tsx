import * as React from 'react';
import emailjs from '@emailjs/browser';
import { Dictionary, Language } from '../../@types/typeLanguage';
import { getCountries, getLanguage } from '../../@presets/language';
import './Form.scss';

interface Props {
    handleError: Function;
    handleSuccess: Function;
    language: Language;
}

interface States {
    form: {
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
    };
    status: 'Incomplete' | 'Input' | 'Loading';
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

type Validation = 'isAlphabet' | 'isCountry' | 'isDate' | 'isEmail' | 'isHouseNumber' | 'isNumber' | 'isPassPort' | 'isPhoneNumber' | 'isPostCode' | 'isStreet';

export default class Form extends React.Component<Props, States> {

    state: States = {
        form: {
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
                description: 'inputDateOfArrival',
                required: true,
                showWarning: false,
                type: 'date',
                validation: 'isDate',
                value: '',
            },
            dateOfDepature: {
                description: 'inputDateOfDepature',
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
                validation: 'isCountry',
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
                validation: 'isCountry',
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
        },
        status: 'Input'
    }

    componentDidMount() {
        emailjs.init({
            publicKey: 'O_tJf5nTjpIAdqUN2'
        });
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                form: {
                    ...this.state.form,
                    nationality: {
                        ...this.state.form.nationality,
                        value: '',
                    },
                    addressCountry: {
                        ...this.state.form.addressCountry,
                        value: '',
                    },
                    
                }
            })
        }
    }

    changeField(fieldName: string, value: string) {
        // ASSIGN VALUE
        const form: any = Object.assign({}, this.state.form);
        form[fieldName].value = value.trim();
        // GET VALIDATION
        const validation = form[fieldName].validation as Validation;
        // VALIDATE FIELD
        if (validation && !this.validateField(validation, value.trim())) {
            form[fieldName].showWarning = true;
        } else {
            form[fieldName].showWarning = false;
        }
        // SET STATE
        this.setState({ form });
    }

    validateField(method: Validation, value: string) {
        if (value === '') {
            return true;
        } else if (method === 'isAlphabet') {
            return (/^[\p{L}\p{M}]+$/u).test(value);
        } else if (method === 'isCountry') {
            return value !== '';
        } else if (method === 'isDate') {
            return value !== '';
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
        } else if (method === 'isCountry') {
            return getLanguage(this.props.language, 'warningCorrectCountry');
        } else if (method === 'isDate') {
            return getLanguage(this.props.language, 'warningCorrectDate');
        } else if (method === 'isEmail') {
            return getLanguage(this.props.language, 'warningCorrectEmail');
        } else if (method === 'isHouseNumber') {
            return getLanguage(this.props.language, 'warningCorrectHouseNumber');
        } else if (method === 'isNumber') {
            return getLanguage(this.props.language, 'warningOnlyNumbers');
        } else if (method === 'isPassPort') {
            return getLanguage(this.props.language, 'warningCorrectPassPort');
        } else if (method === 'isPhoneNumber') {
            return getLanguage(this.props.language, 'warningCorrectPhoneNumber');
        } else if (method === 'isPostCode') {
            return getLanguage(this.props.language, 'warningCorrectPostCode');
        } else if (method === 'isStreet') {
            return getLanguage(this.props.language, 'warningOnlyAlphabets');
        }
    }

    checkForm() {
        // GET WARNINGS
        const warnings = Object.entries(this.state.form)
            .map(item => ({ fieldName: item[0], ...item[1] }))
            .filter(item => item.showWarning || (item.required && item.value === ''));
        // IF WARNINGS ARE NOT AVAILABLE
        if (warnings.length === 0) {
            // RETURN TRUE
            return true;
        } 
        // IF WARNINGS ARE AVAILABLE
        else {
            // SHOW WARNING
            const form: any = Object.assign({}, this.state.form);
            warnings.forEach(item => form[item.fieldName].showWarning = true);
            this.setState({ form });
            // RETURN FALSE
            return false;
        }
    }

    async onSend(event: any) {
        // STOP EVENT
        event.preventDefault();
        event.stopPropagation();
        // IF IS ALREADY SENDING RETURN
        if (this.state.status === 'Loading') {
            return;
        }
        // CHANGE TO IS SENDING
        this.setState({ status: 'Loading' });
        // CHECK FORM
        if (this.checkForm()) {
            const params = {
                to_name: 'Benedict',
                from_name: `${this.state.form.firstName.value} ${this.state.form.lastName.value}`,
                message: `
                    Vorname: ${this.state.form.firstName.value}
                    Nachname: ${this.state.form.lastName.value}
                    Geburtsdatum: ${this.state.form.dateOfBirth.value}
                    Datum der Anreise: ${this.state.form.dateOfArrival.value}
                    Datum der Abreise: ${this.state.form.dateOfDepature.value}
                    Staatsangehögkeit: ${this.state.form.nationality.value}
                    Strasse: ${this.state.form.addressStreet.value}
                    Hausnummer: ${this.state.form.addressHouseNumber.value}
                    Postleitzahl: ${this.state.form.addressPostCode.value}
                    Stadt: ${this.state.form.addressCity.value}
                    Land: ${this.state.form.addressCountry.value}
                    Ausweisnummer: ${this.state.form.passportNumber.value}
                    Anzahl der Gäste: ${this.state.form.numberOfGuests.value}
                    Telefonnummer: ${this.state.form.guestPhone.value ? this.state.form.guestPhone.value : 'keine Angabe'}
                    E-Mail: ${this.state.form.guestEmail.value ? this.state.form.guestEmail.value : 'keine Angabe'}
                `.trim()
            }
            emailjs.send('service_p34hlgj', 'template_5ngkmwb', params)
                .then(
                    (response) => {
                        console.log('E-MAIL SERVICE SUCCESSFUL', response);
                        this.props.handleSuccess();
                        this.setState({ status: 'Input' });
                    },
                    (error) => {
                        console.error('E-MAIL SERVICE FAILED', error);
                        this.props.handleError();
                        this.setState({ status: 'Input' });
                    });
        } else {
            setTimeout(() => this.setState({ status: 'Incomplete' }), 250);
            setTimeout(() => this.setState({ status: 'Input' }), 1000);
        }
    }

    render() {
        return (
            <form>
                {Object.entries(this.state.form).map(item => {
                    const fieldName: string = item[0];
                    const fieldProps: Field = item[1];
                    return (
                        <label key={fieldName} className={[
                            fieldProps.required ? 'required' : '',
                            fieldProps.value ? 'hasValue' : '',
                            fieldProps.showWarning ? 'hasWarning' : '',
                        ].filter(x => x).join(' ')}>
                            <span className='description'>
                                {getLanguage(this.props.language, fieldProps.description)}
                                {fieldProps.required ? <span>＊</span> : null}
                            </span>
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
                                <span className='warning'>{this.getWarningMessage(fieldProps.validation)}</span>
                            ) : null}
                        </label>
                    );
                })}
                <button onClick={(event) => this.onSend(event)} className={this.state.status === 'Loading' ? 'loading' : ''}>
                    {this.state.status === 'Input' && (
                        <>
                            <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='256' height='256' viewBox='0 0 256 256'>
                                <g transform='translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)' >
                                    <path d='M 89.999 3.075 C 90 3.02 90 2.967 89.999 2.912 c -0.004 -0.134 -0.017 -0.266 -0.038 -0.398 c -0.007 -0.041 -0.009 -0.081 -0.018 -0.122 c -0.034 -0.165 -0.082 -0.327 -0.144 -0.484 c -0.018 -0.046 -0.041 -0.089 -0.061 -0.134 c -0.053 -0.119 -0.113 -0.234 -0.182 -0.346 C 89.528 1.382 89.5 1.336 89.469 1.29 c -0.102 -0.147 -0.212 -0.288 -0.341 -0.417 c -0.13 -0.13 -0.273 -0.241 -0.421 -0.344 c -0.042 -0.029 -0.085 -0.056 -0.129 -0.082 c -0.118 -0.073 -0.239 -0.136 -0.364 -0.191 c -0.039 -0.017 -0.076 -0.037 -0.116 -0.053 c -0.161 -0.063 -0.327 -0.113 -0.497 -0.147 c -0.031 -0.006 -0.063 -0.008 -0.094 -0.014 c -0.142 -0.024 -0.285 -0.038 -0.429 -0.041 C 87.03 0 86.983 0 86.936 0.001 c -0.141 0.003 -0.282 0.017 -0.423 0.041 c -0.035 0.006 -0.069 0.008 -0.104 0.015 c -0.154 0.031 -0.306 0.073 -0.456 0.129 L 1.946 31.709 c -1.124 0.422 -1.888 1.473 -1.943 2.673 c -0.054 1.199 0.612 2.316 1.693 2.838 l 34.455 16.628 l 16.627 34.455 C 53.281 89.344 54.334 90 55.481 90 c 0.046 0 0.091 -0.001 0.137 -0.003 c 1.199 -0.055 2.251 -0.819 2.673 -1.943 L 89.815 4.048 c 0.056 -0.149 0.097 -0.3 0.128 -0.453 c 0.008 -0.041 0.011 -0.081 0.017 -0.122 C 89.982 3.341 89.995 3.208 89.999 3.075 z M 75.086 10.672 L 37.785 47.973 L 10.619 34.864 L 75.086 10.672 z M 55.136 79.381 L 42.027 52.216 l 37.302 -37.302 L 55.136 79.381 z' transform='matrix(1 0 0 1 0 0)' />
                                </g>
                            </svg>
                            <span>{getLanguage(this.props.language, 'inputSend')}</span>
                        </>
                    )}
                    {this.state.status === 'Incomplete' && (
                        <span>{getLanguage(this.props.language, 'inputIncomplete')}</span>
                    )}
                </button>
            </form>
        );
    }
}