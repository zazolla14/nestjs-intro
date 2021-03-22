import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from './product.entity'

@Injectable()
export class ProductsService {
        products: Product[] = []

        getProducts() {
                return { products: [...this.products] }
        }

        getProduct(id: string) {
                const [product, _] = this.findProduct(id)
                return { ...product }
        }

        createProduct(title: string, description: string, price: number) {
                const id = Math.random().toString()
                const newProduct = new Product(id, title, description, price)
                this.products.push(newProduct)
                return id
        }

        updateProduct(
                id: string,
                title: string,
                description: string,
                price: number,
        ) {
                const [product, index] = this.findProduct(id)
                const updatedProduct = { ...product }
                if (title) {
                        updatedProduct.title = title
                }
                if (description) {
                        updatedProduct.description = description
                }
                if (price) {
                        updatedProduct.price = price
                }
                this.products[index] = updatedProduct
        }

        deleteProduct(id: string) {
                const index = this.findProduct(id)[1]
                this.products.splice(index, 1)
                return { message: `Product ${id} deleted` }
        }

        private findProduct(id: string): [Product, number] {
                const productsIndex = this.products.findIndex(
                        (product) => product.id === id,
                )
                const product = this.products[productsIndex]

                // console.log(product)
                if (!product) {
                        throw new NotFoundException('Product not found')
                }
                return [product, productsIndex]
        }
}
