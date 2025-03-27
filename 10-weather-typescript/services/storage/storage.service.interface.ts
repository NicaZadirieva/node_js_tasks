export interface IStorageService {
    saveToken: (token: string) => Promise<void>;
    getToken: () => Promise<string>;
    saveCity: (city: string) => Promise<void>;
    getCities: () => Promise<string[]>;
    getLanguage: () => Promise<string>;
    saveLanguage: (language: string) => Promise<void>;
}