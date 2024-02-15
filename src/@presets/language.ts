import { Dictionary, Language } from "../@types/typeLanguage";
import { countries_de, countries_en, countries_es } from "./countries";

const de: Dictionary = {
    language_de: 'Deutsch',
    language_en: 'Englisch',
    language_es: 'Spanisch',
    title: 'Meldeschein',
    inputFirstName: 'Vorname',
    inputLastName: 'Nachname',
    inputDateOfBirth: 'Geburtsdatum',
    inputDateOfArrival: 'Datum der Anreise',
    inputDateOfDepature: 'Datum der Abreise',
    inputNationality: 'Staatsangehögkeit',
    inputAddressStreet: 'Strasse',
    inputAddressHouseNumber: 'Hausnummer',
    inputAddressPostCode: 'Postleitzahl',
    inputAddressCity: 'Stadt',
    inputAddressCountry: 'Land',
    inputPassportNumber: 'Ausweisnummer',
    inputNumberOfGuests: 'Anzahl der Gäste',
    inputGuestPhone: 'Telefonnummer',
    inputGuestEmail: 'E-Mail',
    inputSend: 'Absenden',
    inputIncomplete: 'Unvollständiges Formular...',
    warningCorrectCountry: 'Bitte ein korrektes Land angeben',
    warningCorrectDate: 'Bitte ein korrektes Datum eingeben',
    warningCorrectEmail: 'Bitte eine korrekte E-Mail eingeben',
    warningCorrectHouseNumber: 'Bitte eine korrekte Hausnummer eingeben',
    warningCorrectPassPort: 'Bitte eine korrekte Ausweisnummer eingeben',
    warningCorrectPhoneNumber: 'Bitte eine korrekte Telefonnummer eingeben',
    warningCorrectPostCode: 'Bitte eine korrekte Postleitzahl eingeben',
    warningOnlyAlphabets: 'Bitte nur Buchstaben eingeben',
    warningOnlyNumbers: 'Bitte nur Zahlen eingeben',
    errorInfo: 'Leider ist etwas schiefgelaufen...',
    errorRetry: 'Wiederholen',
    successInfo: 'Die Meldebescheinigung wurde versendet.\nVielen Dank und wir freuen uns dich\nbald willkommen zu heißen!',
}

const en: Dictionary = {
    language_de: 'German',
    language_en: 'English',
    language_es: 'Spanish',
    title: 'Registration Form',
    inputFirstName: 'First Name',
    inputLastName: 'Last Name',
    inputDateOfBirth: 'Date of Birth',
    inputDateOfArrival: 'Arrival Date',
    inputDateOfDepature: 'Date of Departure',
    inputNationality: 'Nationality',
    inputAddressStreet: 'Street Address',
    inputAddressHouseNumber: 'House Number',
    inputAddressPostCode: 'Post Code',
    inputAddressCity: 'City',
    inputAddressCountry: 'Country',
    inputPassportNumber: 'Passport Number',
    inputNumberOfGuests: 'Number of Travelers',
    inputGuestPhone: 'Phone Number',
    inputGuestEmail: 'E-Mail',
    inputSend: 'Submit',
    inputIncomplete: 'Incomplete Form...',
    warningCorrectCountry: 'Please enter a correct country',
    warningCorrectDate: 'Please enter a correct date',
    warningCorrectEmail: 'Please enter a correct e-mail',
    warningCorrectHouseNumber: 'Please enter a correct house number',
    warningCorrectPassPort: 'Please enter a correct passport number',
    warningCorrectPhoneNumber: 'Please enter a correct phone number',
    warningCorrectPostCode: 'Please enter a correct post code',
    warningOnlyAlphabets: 'Please enter alphabets only',
    warningOnlyNumbers: 'Please enter numbers only',
    errorInfo: 'Unfortunately, something went wrong...',
    errorRetry: 'Retry',
    successInfo: 'The registration form has been sent.\nThank you very much and we look forward\nto welcome you soon!',
}

const es: Dictionary = {
    language_de: 'Alemán',
    language_en: 'Inglés',
    language_es: 'Español',
    title: 'Formulario de inscripción',
    inputFirstName: 'Nombre',
    inputLastName: 'Apellido',
    inputDateOfBirth: 'Fecha de Nacimiento',
    inputDateOfArrival: 'Fecha de Obtención',
    inputDateOfDepature: 'Fecha de Salida',
    inputNationality: 'Nacionalidad',
    inputAddressStreet: 'Dirección Calle',
    inputAddressHouseNumber: 'Número de Casa',
    inputAddressPostCode: 'Código Postal',
    inputAddressCity: 'Ciudad',
    inputAddressCountry: 'Dirección país',
    inputPassportNumber: 'Número de Pasaporte',
    inputNumberOfGuests: 'Número de Viajeros',
    inputGuestPhone: 'Número de Teléfono ',
    inputGuestEmail: 'Correo Electrónico',
    inputSend: 'Envío',
    inputIncomplete: 'Formulario Incompleto...',
    warningCorrectCountry: 'Por favor, introduzca un país correcto',
    warningCorrectDate: 'Por favor, introduzca una fecha correcta',
    warningCorrectEmail: 'Por favor, introduzca un correo electrónico correcto',
    warningCorrectHouseNumber: 'Por favor, introduzca un número de casa correcto',
    warningCorrectPassPort: 'Por favor, introduzca un número de pasaporte correcto',
    warningCorrectPhoneNumber: 'Por favor, introduzca un número de teléfono correcto',
    warningCorrectPostCode: 'Por favor, introduzca un código postal correcto',
    warningOnlyAlphabets: 'Por favor, introduzca sólo letras',
    warningOnlyNumbers: 'Por favor, introduzca sólo números',
    errorInfo: 'Por desgracia, algo salió mal...',
    errorRetry: 'Reintentar',
    successInfo: 'Se ha enviado el formulario de inscripción.\nMuchas gracias y esperamos recibirle pronto!',
}

export const getLanguage = (language: Language, key: keyof Dictionary) => {
    if (language === 'de') {
        return de[key];
    } else if (language === 'en') {
        return en[key];
    } else if (language === 'es') {
        return es[key];
    }
}

export const getCountries = (language: Language) => {
    if (language === 'de') {
        return countries_de;
    } else if (language === 'en') {
        return countries_en;
    } else if (language === 'es') {
        return countries_es;
    }
}