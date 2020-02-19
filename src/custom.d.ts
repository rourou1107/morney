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
    tagList: Tag[],
    createTag: (name: string)=>void
}
