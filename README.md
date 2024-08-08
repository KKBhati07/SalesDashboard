# Sales Dashboard Application

## Overview

The Sales Dashboard application provides an interactive platform for visualizing and analyzing sales data. It includes features for comparing sales across different dates, viewing sales data for today, and presenting detailed data in both graphical and tabular formats.

## Features

- **Sales Comparison Dashboard**: Compare sales data between two selected dates with visual charts and a data grid.
- **Today's Sales Dashboard**: View and analyze sales data for the current date.
- **Bar Charts**: Visualize sales data for products and categories using Bar charts.
- **Data Grid**: Display detailed sales data in a sortable and filterable table.
- **Date Selection**: Allows users to select date ranges for sales comparison.

## Technology Stack

- **Frontend**: React, Chart.js, ag-Grid, React DatePicker
- **Styling**: CSS Modules
- **Data Handling**: Fetch API
- **State Management**: React's `useState` and `useEffect` hooks

## Installation

### Prerequisites

- Node.js
- npm

### Clone the Repository

```bash
git clone git@github.com:KKBhati07/SalesDashboard.git
cd sales-dashboard-app
npm install
npm start
````

# Project Documentation

## Components

### 1. `AppHeaderComponent`

**Purpose**: Displays the header with navigation links.

### 2. `AppHomeComponent`

**Purpose**: Provides a welcome message and navigation options.

### 3. `ComparisonDashboardComponent`

**Purpose**: Displays sales data comparison between two selected dates.

## State

- **`startDate`**: Selected start date.
- **`endDate`**: Selected end date.
- **`comparisonData`**: Data fetched from the API.
- **`filteredData`**: Data filtered based on the selected date range.
- **`isLoading`**: Loading state to show or hide the spinner.

## Data Fetching

Data is fetched from a mock API and processed for charts and grid data.


### 3. `SalesDashboardComponent`

**Purpose**: Displays today's sales data.

## State

- **`productLevelChart`**: Chart data for products.
- **`categoryLevelChart`**: Chart data for categories.
- **`tableData`**: Data for the grid.
- **`columns`**: Column definitions for the grid.
- **`isLoading`**: Loading state to show or hide the spinner.

## Data Fetching

Data is fetched from a mock API and processed for charts and grid data.

