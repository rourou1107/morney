type RecordItem = {
    tags: string[],
    notes: string,
    types: string,
    amount: number,
    createAt?: Date,
}
type Tag = {
    id: string,
    name: string
}
type tagList = {
    data: Tag[],
    fetch: () => Tag[],
    create: (name: string) => 'success' | 'duplication',
    update: (id: string, name: string) => 'success' | 'duplication' | 'not found',
    remove: (id: string) => boolean
    save: () => void
}

interface Window {
    store: {
        tagList: Tag[],
        createTag: (name: string) => void,
        removeTag: (tag: Tag) => boolean,
        updateTag: (id: string, value: string) => 'success' | 'duplication' | 'not found',
        findTag: (id: string) => Tag | undefined,
        recordList: RecordItem[],
        createRecord: (record: RecordItem) => void
    }
}
