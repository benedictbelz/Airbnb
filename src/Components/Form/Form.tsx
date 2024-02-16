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
        form[fieldName].value = value;
        // GET VALIDATION
        const validation = form[fieldName].validation as Validation;
        // VALIDATE FIELD
        if (validation && !this.validateField(validation, value)) {
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
            return (/^[\p{L}\p{M}|-]+$/u).test(value);
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
            return (/^[\p{L}\p{M}][\p{L}\p{M}\-\s]+\.?$/u).test(value);
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
                from_name: `${this.state.form.firstName.value.trim()} ${this.state.form.lastName.value.trim()}`,
                first_name: `${this.state.form.firstName.value.trim()}`,
                last_name: `${this.state.form.lastName.value.trim()}`,
                date_of_birth: `${this.state.form.dateOfBirth.value.trim()}`,
                date_of_arrival: `${this.state.form.dateOfArrival.value.trim()}`,
                date_of_departure: `${this.state.form.dateOfDepature.value.trim()}`,
                nationality: `${this.state.form.nationality.value.trim()}`,
                address_street: `${this.state.form.addressStreet.value.trim()}`,
                address_house_number: `${this.state.form.addressHouseNumber.value.trim()}`,
                address_post_code: `${this.state.form.addressPostCode.value.trim()}`,
                address_city: `${this.state.form.addressCity.value.trim()}`,
                address_country: `${this.state.form.addressCountry.value.trim()}`,
                passport_number: `${this.state.form.passportNumber.value.trim()}`,
                number_of_guests: `${this.state.form.numberOfGuests.value.trim()}`,
                guest_phone: `${this.state.form.guestPhone.value ? this.state.form.guestPhone.value.trim() : 'keine Angabe'}`,
                guest_email: `${this.state.form.guestEmail.value ? this.state.form.guestEmail.value.trim() : 'keine Angabe'}`,
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
                                    {...(fieldProps.type === 'number' ? { pattern: '\\d*' } : {})}
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
                <div id='information'>
                    {this.props.language === 'de' && (
                        <>
                            <span className='title'>Allgemein</span>
                            <span className='text'>
                                Rechtsgrundlage für die Erhebung der erfragten Daten sowie die Vorlage eines gültigen Identitätsdokuments
                                für ausländische Gäste ist das <a href='https://www.gesetze-im-internet.de/bmg/'>Bundesmeldegesetz</a> und das <a href='https://dsgvo-gesetz.de/bdsg/'>Bundesdatenschutzgesetz</a>.
                                <br/><br/>
                                Wer diesen Meldepflichten nicht nachkommt, handelt ordnungswidrig. Die Ordnungswidrigkeit kann mit einer Geldbuße geahndet werden.
                                Der Schutz und die Sicherheit von persönlichen Daten hat bei uns eine hohe Priorität. Daher halten wir uns strikt an die Regeln des deutschen Bundesdatenschutzgesetzes.
                                Nachfolgend werden Sie darüber informiert, welche Art von Daten erfasst und zu welchem Zweck sie erhoben, übermittelt und genutzt werden.
                                <br /><br/>
                                Die Angabe der Daten ist freiwillig. Wenn Sie mit der Angabe Ihrer Daten in diesem Formular nicht einverstanden sind, verlassen Sie diese Seite.
                                Die Erhebung der Daten wird dann vor Ort beim Check-In erfolgen. Ansonsten bestätigen Sie mit dem oberen Button Ihr Einverständnis mit der Datenübermittlung.
                                <br /><br/>
                                Ihre Daten werden nur zum Zweck der Übertragung von Meldedaten an die Beherbungsstätte benutzt. Weitergabe der Daten an andere,
                                wie z.B. für Werbung, Markt- oder Meinungsforschungsunternehmen, findet nicht statt.
                            </span>
                            <span className='title'>Informationen über die Beherbergungsstätte</span>
                            <span className='text'>
                                Benedict Belz
                                <br/>
                                Senefelderstr. 15
                                <br/>
                                10437 Berlin
                                <br/>
                                <a href='mailto:airbnb@benedictbelz.eu'>airbnb@benedictbelz.eu</a> 
                            </span>
                            <span className='title'>Einwilligungserklärung der Datenspeicherung nach Bundesdatenschutzgesetz</span>
                            <span className='text'>
                                Persönliche Daten werden nur erhoben oder verarbeitet, wenn Sie diese Angaben freiwillig mitteilen. Sie können jederzeit die zuvor erteilte Genehmigung
                                Ihrer persönlichen Datenspeicherung mit sofortiger Wirkung schriftlich, z.B. per E-Mail, an obenstehende Adresse widerrufen. Ihre Daten werden nicht an Dritte weitergeben,
                                es sei denn, eine Weitergabe ist aufgrund gesetzlicher Vorschriften erforderlich.
                                <br /><br/>
                                Gemäß geltendem Recht können Sie jederzeit bei uns schriftlich nachfragen, ob und welche personenbezogenen Daten bei uns über Sie gespeichert sind.
                                Eine entsprechende Mitteilung hierzu erhalten Sie umgehend.
                                <br /><br/>
                                Ihre uns zur Verfügung gestellten persönlichen Daten werden durch Ergreifung aller technischen sowie organisatorischen Sicherheitsmaßnahmen so gesichert,
                                dass sie für den Zugriff unberechtigter Dritter unzugänglich sind.
                            </span>
                        </>
                    )}
                    {this.props.language === 'en' && (
                        <>
                            <span className='title'>General information</span>
                            <span className='text'>
                                The legal basis for the collection of the requested data as well as the presentation of a valid identity document for foreign guests
                                is the <a href='https://www.gesetze-im-internet.de/bmg/'>Federal Registration Law</a> and the <a href='https://dsgvo-gesetz.de/bdsg/'>Federal Data Protection Act</a>.
                                <br/><br/>
                                Anyone who fails to comply with these reporting obligations is unlawful. The administrative offense can be punished with a fine.
                                The protection and security of personal data is a high priority for us. We therefore adhere strictly to the rules of the German Federal Data Protection Act.
                                In the following, you will be informed about the type of data collected and the purpose for which they are collected, transmitted and used.
                                <br /><br/>
                                Providing the data is voluntary. If you do not agree to this, please leave this page.
                                The data will be collected on your arrival at check-in. Otherwise, you agree to the data transmission by clicking on the button above.
                                <br /><br/>
                                Your data will only be used for the purpose of transferring registration data to the accommodation facility.
                                The data will not be passed on to others, e.g. for advertising, marketing or opinion research companies.
                            </span>
                            <span className='title'>Information about the accommodation</span>
                            <span className='text'>
                                Benedict Belz
                                <br/>
                                Senefelderstr. 15
                                <br/>
                                10437 Berlin
                                <br/>
                                <a href='mailto:airbnb@benedictbelz.eu'>airbnb@benedictbelz.eu</a> 
                            </span>
                            <span className='title'>Declaration of consent for data storage in accordance with the Federal Data Protection Act</span>
                            <span className='text'>
                                Personal data will only be collected or processed if you provide this information voluntarily. You may at any time revoke the prior approval
                                of your personal data storage by writing an e-mail to the above address. Your data will not be passed on to third parties,
                                unless a transfer is required by law.
                                <br /><br/>
                                In accordance with applicable law, you can ask us in writing at any time whether and what personal data we have stored about you.
                                You will receive a corresponding notification immediately.
                                <br /><br/>
                                Your personal data provided to us will be secured by taking all technical and organizational security measures so that
                                they are inaccessible to unauthorized third parties.
                            </span>
                        </>
                    )}
                    {this.props.language === 'es' && (
                        <>
                            <span className='title'>Información general</span>
                            <span className='text'>
                                La base jurídica para la recogida de los datos solicitados y la presentación de un documento de identidad válido para los huéspedes
                                extranjeros es la <a href='https://www.gesetze-im-internet.de/bmg/'>Ley Federal de Registro</a> y la <a href='https://dsgvo-gesetz.de/bdsg/'>Ley Federal de Protección de Datos</a>.
                                <br/><br/>
                                Quien incumple estas obligaciones de notificación está cometiendo una infracción administrativa. La infracción puede castigarse con una multa.
                                La protección y seguridad de los datos personales es una prioridad para nosotros. Por ello, cumplimos estrictamente las normas de la Ley Federal Alemana de Protección de Datos.
                                A continuación encontrará información sobre qué tipo de datos se recopilan y con qué fin se recogen, transmiten y utilizan.
                                <br /><br/>
                                El suministro de datos es voluntario. Si no está de acuerdo con el suministro de sus datos en este formulario, le rogamos que abandone esta página.
                                Los datos se recogerán in situ en el momento del registro. De lo contrario, acepta la transmisión de datos haciendo clic en el botón de arriba.
                                <br /><br/>
                                Sus datos sólo se utilizarán para transmitir los datos de inscripción al centro de alojamiento.
                                Los datos no se transmitirán a terceros,por ejemplo, a empresas de publicidad, estudios de mercado o de opinión.
                            </span>
                            <span className='title'>Información sobre el alojamiento</span>
                            <span className='text'>
                                Benedict Belz
                                <br/>
                                Senefelderstr. 15
                                <br/>
                                10437 Berlin
                                <br/>
                                <a href='mailto:airbnb@benedictbelz.eu'>airbnb@benedictbelz.eu</a> 
                            </span>
                            <span className='title'>Declaración de consentimiento para el almacenamiento de datos de conformidad con la Ley Federal de Protección de Datos</span>
                            <span className='text'>
                                Los datos personales sólo se recogerán o tratarán si usted los facilita voluntariamente. Puede revocar la autorización previamente concedida
                                de almacenamiento de sus datos personales con efecto inmediato por escrito, por ejemplo por correo electrónico, a la dirección arriba indicada.
                                Sus datos no se transmitirán a terceros salvo que la ley exija su divulgación.
                                <br /><br/>
                                De conformidad con la legislación aplicable, puede preguntarnos por escrito en cualquier momento si tenemos datos personales almacenados sobre usted y cuáles son.
                                Recibirá inmediatamente la notificación correspondiente.
                                <br /><br/>
                                Los datos personales que nos facilite estarán protegidos mediante la adopción de todas las medidas de seguridad técnicas y organizativas necesarias para
                                garantizar que sean inaccesibles a terceros no autorizados, que sean inaccesibles a terceros no autorizados.
                            </span>
                        </>
                    )}
                </div>
            </form>
        );
    }
}