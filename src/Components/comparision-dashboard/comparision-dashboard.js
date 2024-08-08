import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AppLoadingComponent from "../app-loading/app-loading";

// Component for comparison dashboard
export default function ComparisonDashboardComponent() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [comparisonData, setComparisonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [startDate, endDate, comparisonData]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `https://66b36ea07fba54a5b7eced26.mockapi.io/comparision_data`
            );
            const data = await response.json();
            console.log('Fetched Data:', data);
            setComparisonData(data);
            setFilteredData(data);
            setIsLoading(false);
        } catch (e) {
            console.error('Error fetching data', e);
        }
    };
    const filterData = () => {
        console.log('Filtering Data with Start Date:', startDate, 'and End Date:', endDate);
        const filtered = comparisonData.filter(data => {
            const date1 = new Date(data?.date1);
            const date2 = new Date(data?.date2);

            const startDateOnly = new Date(startDate.toDateString());
            const endDateOnly = new Date(endDate.toDateString());
            const date1Only = new Date(date1.toDateString());
            const date2Only = new Date(date2.toDateString());


            return (
                date1Only >= startDateOnly && date1Only <= endDateOnly &&
                date2Only >= startDateOnly && date2Only <= endDateOnly
            );
        });
        console.log('Filtered Data:', filtered);
        setFilteredData(filtered);
    };

    const productLevelComparisonChart = {
        labels: filteredData.map(data => data.productName),
        datasets: [
            {
                label: `Sales on ${startDate.toISOString().split('T')[0]}`,
                data: filteredData.map(data => data.date1SalesAmount),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
            {
                label: `Sales on ${endDate.toISOString().split('T')[0]}`,
                data: filteredData.map(data => data.date2SalesAmount),
                backgroundColor: 'rgba(153,102,255,0.4)',
                borderColor: 'rgba(153,102,255,1)',
                borderWidth: 1,
            },
        ],
    };

    const columns = [
        { headerName: 'Product Name', field: 'productName', sortable: true, filter: true },
        { headerName: 'Category', field: 'category', sortable: true, filter: true },
        { headerName: `Sales on ${startDate.toISOString().split('T')[0]}`, field: 'date1SalesAmount', sortable: true, filter: true },
        { headerName: `Sales on ${endDate.toISOString().split('T')[0]}`, field: 'date2SalesAmount', sortable: true, filter: true },
        { headerName: 'Difference', field: 'difference', sortable: true, filter: true },
    ];

    return (
        <div>
            {isLoading ? (
                <AppLoadingComponent />
            ) : (
                <>
                    <h1>Sales Comparison Dashboard</h1>
                    <div>
                        <label>Select Start Date: </label>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        <label>Select End Date: </label>
                        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
                    </div>
                    <div>
                        <Bar data={productLevelComparisonChart} />
                    </div>
                    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                        <AgGridReact
                            rowData={filteredData}
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
