'use client'
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { obtenerPromedioValorPorCategoria, DatosPromedioValorPorCategoria } from '../api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartDataItem {
    categoryCode: string;
    average_value: number;
}

export default function PromedioValorPorCategoriaGrafico() {
    const [datosGrafico, setDatosGrafico] = useState<ChartData<'bar'>>({
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

    useEffect(() => {
        obtenerPromedioValorPorCategoria()
            .then((data: DatosPromedioValorPorCategoria[]) => {
                const etiquetas = data.map(item => item.categoryCode);
                const valores = data.map(item => parseFloat(item.average_value.toString()));

                setDatosGrafico({
                    labels: etiquetas,
                    datasets: [{
                        label: 'Valor Promedio por Categoría de Producto',
                        data: valores,
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    }]
                });
            })
            .catch((error) => console.log('Ocurrió un error al cargar los datos del promedio de valor por categoría:', error));
    }, []);

    const opciones: ChartOptions<'bar'> = {
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
                text: 'Valor Promedio de Productos por Categoría',
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
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        family: 'Inter',
                    }
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        family: 'Inter',
                    }
                }
            }
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md mb-8 flex flex-col justify-center items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Valor Promedio de Productos por Categoría</h2>
            <div className="relative w-full h-80 md:h-96">
                <Bar data={datosGrafico} options={opciones} />
            </div>
        </div>
    );
}
