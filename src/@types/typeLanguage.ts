export const availableLanguages = ['de', 'en', 'es'] as const;

export type Language = typeof availableLanguages[number]

export type Dictionary = {
    language_de: string;
    language_en: string;
    language_es: string;
    title: string;
    inputFirstName: string;
    inputLastName: string;
    inputDateOfBirth: string;
    inputDateOfArrival: string;
    inputDateOfDepature: string;
    inputNationality: string;
    inputAddressStreet: string;
    inputAddressHouseNumber: string;
    inputAddressPostCode: string;
    inputAddressCity: string;
    inputAddressCountry: string;
    inputPassportNumber: string;
    inputNumberOfGuests: string;
    inputGuestPhone: string;
    inputGuestEmail: string;
    inputSubmit: string;
    warningCorrectDate: string;
    warningCorrectEmail: string;
    warningCorrectHouseNumber: string;
    warningCorrectPassPort: string;
    warningCorrectPhoneNumber: string;
    warningCorrectPostCode: string;
    warningOnlyAlphabets: string;
    warningOnlyNumbers: string;
}