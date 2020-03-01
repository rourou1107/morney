type RecordItem = {
    tags: string[],
    notes: string,
    types: string,
    amount: number,
    createAt?: string,
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

type Flag = {
    type: number, // 0--成功 1--标签名重复 2--标签名为空
    value: boolean
}
type myState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag,
    flag?: Flag
}

interface Window {
}
