import axios from 'axios';

const URL_API = "http://localhost:5000";

export interface DatosSumaSalarioDepartamento {
    DEPARTMENT_ID: number;
    Salario_total: string;
}

export interface DatosConteoPuestoDeptos {
    DEPARTMENT_ID: number;
    JOB_ID: string;
    total_empleados: string;
}

export interface DatosPromedioValorPorCategoria {
    categoryCode: string;
    average_value: number;
}

export interface DatosValorTotalPorMarca {
    brandCode: string;
    total_value: number;
}

export interface DatosCantidadProductosPorTipo {
    productType: string;
    total_products: number;
}


export const obtenerSumaSalarioDepartamento = async (): Promise<DatosSumaSalarioDepartamento[]> => {
    try {
        const response = await axios.get<DatosSumaSalarioDepartamento[]>(`${URL_API}/suma-salario-departamento`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la suma de salario por departamento:", error);
        throw error;
    }
}

export const obtenerConteoPuestoDeptos = async (): Promise<DatosConteoPuestoDeptos[]> => {
    try {
        const response = await axios.get<DatosConteoPuestoDeptos[]>(`${URL_API}/cantidad-empleado-puesto`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el conteo de puestos por departamento:", error);
        throw error;
    }
}

export const obtenerPromedioValorPorCategoria = async (): Promise<DatosPromedioValorPorCategoria[]> => {
    try {
        const response = await axios.get<DatosPromedioValorPorCategoria[]>(`${URL_API}/average-value-by-category`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el promedio de valor por categoría:", error);
        throw error;
    }
}

export const obtenerValorTotalPorMarca = async (): Promise<DatosValorTotalPorMarca[]> => {
    try {
        const response = await axios.get<DatosValorTotalPorMarca[]>(`${URL_API}/total-value-by-brand`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el valor total por marca:", error);
        throw error;
    }
}

export const obtenerCantidadProductosPorTipo = async (): Promise<DatosCantidadProductosPorTipo[]> => {
    try {
        const response = await axios.get<DatosCantidadProductosPorTipo[]>(`${URL_API}/count-products-by-type`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la cantidad de productos por tipo:", error);
        throw error;
    }
}
