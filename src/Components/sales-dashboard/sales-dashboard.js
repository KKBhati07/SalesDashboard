import React, { useEffect, useState } from 'react';
import AppLoadingComponent from "../app-loading/app-loading";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';

import 'ag-grid-community/styles/ag-theme-alpine.css';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Component for sales dashboard
export default function SalesDashboardComponent() {
    const [salesData, setSalesData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSalesData();
    }, []);
    const fetchSalesData = async () => {
        try {
            const response = await fetch('https://66b36ea07fba54a5b7eced26.mockapi.io/sales_data');
            const data = await response.json();
            console.warn(salesData)
            setSalesData(data);
            setTableData(data);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching sales data', error);
        }
    };

    const productLevelChart = {
        labels: salesData.map(data => data.productName),
        datasets: [
            {
                label: 'Sales Amount',
                data: salesData.map(data => data.salesAmount),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const categoryLevelChart = {
        labels: [...new Set(salesData.map(data => data.category))],
        datasets: [
            {
                label: 'Sales Amount',
                data: salesData.reduce((acc, data) => {
                    const idx = acc.findIndex(item => item.category === data.category);
                    if (idx > -1) {
                        acc[idx].salesAmount += data.salesAmount;
                    } else {
                        acc.push({ category: data.category, salesAmount: data.salesAmount });
                    }
                    return acc;
                }, []).map(item => item.salesAmount),
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
            },
        ],
    };

    const columns = [
        { headerName: 'Product Name', field: 'productName', sortable: true, filter: true },
        { headerName: 'Category', field: 'category', sortable: true, filter: true },
        { headerName: 'Quantity Sold', field: 'quantitySold', sortable: true, filter: true },
        { headerName: 'Sales Amount', field: 'salesAmount', sortable: true, filter: true },
    ];

    return (
        <div>
            {isLoading ? (
                <AppLoadingComponent />
            ) : (
                <>
                    <h1>Today's Sales Dashboard</h1>
                    <div>
                        <Bar data={productLevelChart} />
                    </div>
                    <div>
                        <Bar data={categoryLevelChart} />
                    </div>
                    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                        <AgGridReact
                            rowData={tableData}
                            columnDefs={columns}
                            pagination={true}
                            paginationPageSize={10}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
