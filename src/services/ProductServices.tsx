import { ApiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { Product } from "@/interfaces/Product";

export interface ProductFilters {
    pageNumber: number;
    pageSize: number;
    search?: string;
    categories?: string;
    brands?: string;
    orderBy?: "price" | "priceDesc";
}

export const ProductServices = {
    async fetchProducts(filters: ProductFilters) {
        const {data} = await ApiBackend.get<ResponseAPI>('Product', {
            params: {...filters}
        });
        if (!data.success) {
            throw new Error(data.message || 'Error al obtener productos');
        }
        if (!data.data || !Array.isArray(data.data)) {
            throw new Error('Datos de productos no válidos');
        }
        if (data.errors){
            console.error("Errores al obtener productos:", data.errors);
        }
        return data.data as Product[];
    }
}