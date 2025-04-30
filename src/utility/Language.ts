export type LanguageStrings = Record<string, string>

class Language {
    data: LanguageStrings | null = null

    public initial(data: LanguageStrings) {
        this.data = data
    }
    
    public text(id: string) {
        const text = this.data ? this.data[id] : undefined
        if (!text) return `Local_${id}`
        return text
    }
}

export const language = new Language()