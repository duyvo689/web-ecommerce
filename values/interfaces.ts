
export interface productsInterface {
    id?: string
    created_at?: Date
    name: string
    price: number
    description: string
    like: number
    image: []
    category_id: categoryInterface
}

export interface categoryInterface {
     id?: string
    created_at?: Date
    name: string
}

