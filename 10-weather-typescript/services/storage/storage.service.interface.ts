export interface IStorageService {
    saveToken: (token: string) => Promise<void>;
    getToken: () => Promise<string | null>;
    saveCity: (city: string) => Promise<void>;
    getCities: () => Promise<string[] | null>;
    getLanguage: () => Promise<Lang | null>;
    saveLanguage: (language: Lang) => Promise<void>;
}