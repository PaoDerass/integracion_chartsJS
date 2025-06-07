'use client'
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartData, ChartOptions } from 'chart.js';
import { obtenerCantidadProductosPorTipo, DatosCantidadProductosPorTipo } from '../api';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface ChartDataItem {
    productType: string;
    total_products: number;
}

export default function CantidadProductosPorTipoGrafico() {
    const [datosGrafico, setDatosGrafico] = useState<ChartData<'doughnut'>>({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            }
        ]
    });

    const generarColoresAleatorios = (numColores: number): string[] => {
        const colores: string[] = [];
        for (let i = 0; i < numColores; i++) {
            const r = Math.floor(Math.random() * 200) + 50;
            const g = Math.floor(Math.random() * 200) + 50;
            const b = Math.floor(Math.random() * 200) + 50;
            colores.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
        }
        return colores;
    };

    useEffect(() => {
        obtenerCantidadProductosPorTipo()
            .then((data: DatosCantidadProductosPorTipo[]) => {
                const etiquetas = data.map(item => item.productType);
                const valores = data.map(item => parseInt(item.total_products.toString()));

                const coloresFondo = generarColoresAleatorios(etiquetas.length);
                const coloresBorde = coloresFondo.map(color => color.replace('0.7', '1'));

                setDatosGrafico({
                    labels: etiquetas,
                    datasets: [{
                        label: 'Cantidad de Productos',
                        data: valores,
                        backgroundColor: coloresFondo,
                        borderColor: coloresBorde,
                        borderWidth: 1,
                    }]
                });
            })
            .catch((error) => console.log('Ocurrió un error al cargar los datos de la cantidad de productos por tipo:', error));
    }, []);

    const opciones: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    font: {
                        family: 'Inter',
                    }
                }
            },
            title: {
                display: true,
                text: 'Distribución de Productos por Tipo',
                font: {
                    size: 18,
                    family: 'Inter',
                },
                color: '#333',
            },
            tooltip: {
                bodyFont: {
                    family: 'Inter',
                },
                titleFont: {
                    family: 'Inter',
                },
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((sum, current) => (current as number) + sum, 0);
                        const percentage = ((value / total) * 100).toFixed(2) + '%';
                        return `${label}: ${value} (${percentage})`;
                    }
                }
            }
        },
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md mb-8 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Cantidad de Productos por Tipo</h2>
            <div className="relative w-full h-80 md:h-96">
                <Doughnut data={datosGrafico} options={opciones} />
            </div>
        </div>
    );
}
