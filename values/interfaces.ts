
export interface productsInterface {
    id: string
    name: string
    price: number
    description: string
    image: string[]
    category_id: string
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


