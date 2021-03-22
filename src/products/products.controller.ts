import {
        Body,
        Controller,
        Delete,
        Get,
        Param,
        Patch,
        Post,
} from '@nestjs/common'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
        constructor(private readonly productsService: ProductsService) {}

        @Get()
        getProducts() {
                return this.productsService.getProducts()
        }

        @Get(':id')
        getProduct(@Param('id') id: string) {
                return this.productsService.getProduct(id)
        }

        @Post()
        createProduct(
                @Body('title') title: string,
                @Body('description') description: string,
                @Body('price') price: number,
        ) {
                const id = this.productsService.createProduct(
                        title,
                        description,
                        price,
                )
                return { id }
        }

        @Patch(':id')
        updateProduct(
                @Param('id') id: string,
                @Body('title') title: string,
                @Body('description') description: string,
                @Body('price') price: number,
        ) {
                this.productsService.updateProduct(
                        id,
                        title,
                        description,
                        price,
                )
                return null
        }

        @Delete(':id')
        deleteProduct(@Param('id') id: string) {
                this.productsService.deleteProduct(id)
        }
}
