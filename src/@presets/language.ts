import { Dictionary, Language } from "../@types/typeLanguage";

const de: Dictionary = {
    language_de: 'Deutsch',
    language_en: 'Englisch',
    language_es: 'Spanisch',
    title: 'Meldebescheinigung',
}

const en: Dictionary = {
    language_de: 'German',
    language_en: 'English',
    language_es: 'Spanish',
    title: 'Registration Form',
}

const es: Dictionary = {
    language_de: 'Alemán',
    language_en: 'Inglés',
    language_es: 'Español',
    title: 'Formulario de inscripción',
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