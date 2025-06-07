'use client'
import React, { useEffect, useState } => 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js';
import { obtenerValorTotalPorMarca, DatosValorTotalPorMarca } from '../api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartDataItem {
    brandCode: string;
    total_value: number;
}

export default function ValorTotalPorMarcaGrafico() {
    const [datosGrafico, setDatosGrafico] = useState<ChartData<'line'>>({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                borderColor: '',
                backgroundColor: '',
                fill: false
            }
        ]
    });

    useEffect(() => {
        obtenerValorTotalPorMarca()
            .then((data: DatosValorTotalPorMarca[]) => {
                const etiquetas = data.map(item => item.brandCode);
                const valores = data.map(item => parseFloat(item.total_value.toString()));

                setDatosGrafico({
                    labels: etiquetas,
                    datasets: [{
                        label: 'Valor Total de Productos por Marca',
                        data: valores,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                        tension: 0.2
                    }]
                });
            })
            .catch((error) => console.log('Ocurrió un error al cargar los datos del valor total por marca:', error));
    }, []);

    const opciones: ChartOptions<'line'> = {
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
                text: 'Valor Total de Productos por Marca',
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Valor Total de Productos por Marca</h2>
            <div className="relative w-full h-80 md:h-96">
                <Line data={datosGrafico} options={opciones} />
            </div>
        </div>
    );
}
