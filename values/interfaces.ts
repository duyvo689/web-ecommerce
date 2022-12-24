
export interface productsInterface {
    id: string
    name: string
    price: number
    description: string
    image: string[]
    category_id: string
    total: number
}

export interface categoryInterface {
     id: string
    name: string
}

export interface orderInterface {
     id: string
    name: string
    phone: string
    address: string
    description: string
    created_at:Date
    confirm:boolean
}

export interface orderDetailInterface {
     id: string
    product_id: productsInterface
    order_id: string | orderInterface
    total: number
status: string
price: number
    created_at:Date
}


export interface userInterface {
     id: string
    name: string
email: string
avatar: string
phone: string
password: string
    created_at:Date
}

