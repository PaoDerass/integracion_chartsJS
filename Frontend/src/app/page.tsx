'use client'
import React from 'react';
import PromedioValorPorCategoriaGrafico from './component/PromedioValorPorCategoria';
import ValorTotalPorMarcaGrafico from './component/CantidadProductosPorTipoGrafico';
import CantidadProductosPorTipoGrafico from './component/ValorTotalPorMarcaGrafico';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-8 font-inter">
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <h1 className="text-4xl font-bold text-center text-gray-900 mb-10 mt-4">
                Análisis de Métricas de Productos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PromedioValorPorCategoriaGrafico />
                <ValorTotalPorMarcaGrafico />
                <CantidadProductosPorTipoGrafico />
            </div>
        </div>
    );
}
