export interface IStorageService {
    saveToken: (token: string) => void;
    getToken: () => string;
    saveCity: (city: string) => void;
    getCities: () => string[];
    getLanguage: () => string;
    saveLanguage: (language: string) => void;
}