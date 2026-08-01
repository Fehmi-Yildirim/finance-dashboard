![React](https://img.shields.io/badge/React-2026-blue)
![Vite](https://img.shields.io/badge/Vite-fast-purple)
![License](https://img.shields.io/badge/license-All%20rights%20reserved-red)

# Finance Dashboard

A modern React application for managing personal finances. Track your income and expenses, visualize your financial data with interactive reports, and import or export your transactions with ease.

---

## Highlights

* Modern React + Vite architecture
* Fully responsive finance dashboard
* Multi-language support (English / Dutch)
* Dark mode support
* Persistent local storage
* Interactive financial charts
* CSV and PDF export

---

## Screenshots

![Dashboard](screenshots/dashboard-darkmode.png)

![Transactions](screenshots/transactions-darkmode.png)

![Reports](screenshots/reports-darkmode.png)

![Settings](screenshots/settings-darkmode.png)

---

# ✨ Features

## Dashboard

* Financial overview
* Income, expenses and balance cards
* Key financial statistics
* Income vs expense chart
* Expense summary by category
* Recent transactions

## Transactions

* Create, edit and delete transactions
* Drawer-based create/edit form
* Search transactions
* Filter by transaction type
* Date range filtering (Today, Month, Year, Custom)
* Sorting
* Pagination

## Reports

* Financial statistics
* Expense distribution by category
* Monthly cashflow chart
* Interactive charts powered by Recharts

## Import & Export

* ING CSV import
* CSV export
* PDF export

## Settings

* Dark / Light mode
* Dutch / English language support
* Clear all application data

## General

* Automatic transaction categorization
* Responsive design
* Local storage persistence

## About App

* Application information page
* Version information
* Developer information
* Technologies overview
* License information

---

# Built With

## Frontend

* React
* Vite
* React Router
* React Bootstrap
* Material UI (Drawer)

## Data & Visualization

* Recharts
* Chart.js
* date-fns

## Utilities

* PapaParse
* jsPDF
* react-datepicker
* react-i18next

---

# Installation

```bash
git clone https://github.com/Fehmi-Yildirim/finance-dashboard.git

cd finance-dashboard

npm install

npm run dev
```

---

# Roadmap

## Finance Features

* Budget management
* Goal tracking
* Multiple accounts
* Recurring transactions
* Currency support

## Analytics

* Advanced reports
* Improved analytics
* Financial trends

## Data Management

* Data backup & restore
* Additional import formats
* Cloud synchronization

## User Experience

* User profiles
* Budget notifications

---

# Project Structure

FINANCE-DASHBOARD
public/
│
screenshots/
│
src/
└──  assets
│
└──  components
│   ├── ActionsDropdown.jsx
│   ├── AddTransaction.jsx
|   |
|   ├── budgets/
│   │   ├── BudgetCard.jsx
│   │   ├── BudgetDrawer.jsx
│   │   ├── BudgetForm.jsx
│   │   ├── BudgetList.jsx
│   │   └── BudgetProgress.jsx
|   |
|   └── charts/
|   |   ├── IncomeExpenseChart.jsx
|   |   ├── MonthlyCashflowChart.jsx
|   |   └── ExpenseCategoryChart.jsx
|   |
|   ├── layout/
│   |   ├── Header.jsx
│   |   ├── Header.css
│   |   ├── Sidebar.jsx
│   |   ├── Sidebar.css
│   |   └── Footer.jsx
|   |
|   ├── transactions/
|   │   ├── TransactionsList.jsx
|   │   ├── TransactionDrawer.jsx
|   │   ├── TransactionsToolbar.jsx
|   │   └── SortableHeader.jsx
│   |
│   ├── Card.jsx
│   ├── Cards.jsx
│   ├── CategorySummary.jsx
│   ├── ComfirmationDialog.jsx
│   ├── CSVImport.jsx
│   ├── Footer.jsx
│   ├── Header.css
│   ├── Header.jsx
│   ├── ReportSection.jsx
│   ├── Sidebar.css
│   ├── Sidebar.jsx
│   ├── StatisticsCards.jsx
│
├── config
│   └── appConfig.js
│
├── css
│   ├── components.css
│   ├── darkmode.css
│   ├── layout.css
│   └── variables.css
│
├── data
│   ├── categories.js
│   └── demoBudgets.js
│   └── demoTransactions.js
│   └── categoryDefinitions.js 
│
├── hooks
│   └── useTransactions.js
│   └── useBudgets.js
│
├── layouts
│   └── MainLayout.jsx
│
├── locales
│   ├── en.json
│   └── nl.json
│
├── pages
│   ├── Dashboard.jsx
│   ├── Transactions.jsx
│   ├── Reports.jsx
│   ├── Settings.jsx
│   ├── Budgets.jsx
│   └── AboutApp.jsx
│
└── services/
|    ├── categoryDetector.js
|    ├── transactionKey.js
│    ├── categoryService.js         
│    ├── categoryMigration.js       
│    └── budgetMigration.js        
|    │
|    └── import/
|    |   ├── index.js
|    |   ├── runImportTest.js
|    |   ├── runPipelineTrace.js
|    |   |
|    |   ├── analyzer/
|    |   |   ├── analyzer.js
|    |   |   ├── constants.js
|    |   |   └── helpers.js
|    |   | 
|    |   |── definitions/
|    |   |   ├── account.js
|    |   |   ├── amount.js
|    |   |   ├── balance.js
|    |   |   ├── date.js
|    |   |   ├── description.js
|    |   |   ├── direction.js
|    |   |   ├── index.js
|    |   |   ├── name.js
|    |   |  └── notes.js
|    |   |
|    |   |── engine/
|    |   |   ├── ImportContext.js
|    |   |   ├── ImportEngine.js
|    |   |   ├── Pipeline.js
|    |   |   ├── PipelineBuilder.js
|    |   |   ├── Stage.js
|    |   |   └── stages/
|    |   |       ├── AnalyzerStage.js 
|    |   |       ├── MappingStage.js
|    |   |       ├── NormalizerStage.js 
|    |   |       ├── ProfileStage.js
|    |   |       ├── ReaderStage.js
|    |   |       └── ValidationStage.js
|    |   |
|        ├── mapper/
|    |   |   ├── autoMapper.js
|    |   |   ├── columnProfiler.js 
|    |   |   ├── headerMatcher.js
|    |   |   ├── helpers.js
|    |   |   ├── profileMatcher.js
|    |   |   ├── profileRegistry.js 
|    |   |   └── scoreEngine.js
|    |   |
|    |   |── normalizer/
|    |   |   ├── converters.js 
|    |   |   ├── index.js 
|    |   |   ├── normalizer.js
|    |   |   └── transactionFactory.js
|    |   |   └── valueExtractors.js
|    |   |
|    |   |── profiles/
|    |   |   ├── ABNAMRO.js 
|    |   |   ├── Generic.js
|    |   |   ├── ING.js
|    |   |   ├── Rabobank.js
|    |   |
|    |   |── readers/
|    |   |   └── csvReader.js
|    |   |
|    |   |── tests/
|    |   |   └── import.test.js
|    |   |   |
|    |   └── validators/
|    |       └── AmountValidator.js 
|    |       └── DateValidator.js
|    |       └── DuplicateValidator.js 
|    |       └── RequiredValidator.js
|    |       └── ValidationEngine.js
|    |       └── ValidationResult.js
|    |       └── Validator.js
|    |   
├── utils
│   ├── addMissingData.js
│   └── calculateBudgetProgress.js 
│   ├── calculateBudgetTotals.js
│   ├── calculateStatistics.js
│   ├── chartUtils.js
│   ├── createBudgetCategories.js
│   ├── createTranactionKey.js
│   ├── exportToCSV.js
│   ├── formatCurrency.js
│   ├── formatDate.js
│   ├── formatters.js
│   └── sortTransactions.js
│
├── App.jsx
├── i18n.js
├── index.css
├── main.jsx

├── package.json
├── vite.config.js
├── eslint.config.js
├── .gitignore
└── README.md

---

# Version

Current version: **1.0.0**

Release year: **2026**

---

# License

Copyright © 2026 Fehmi Yildirim

All rights reserved.

This software and source code may not be copied, modified, distributed, or used without explicit permission from the author.