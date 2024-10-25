Here is the complete `README.md` file for your project in one single, easy-to-read format. This file is ready for GitHub, so anyone accessing your repository can follow it for setup, usage, and API details.

```markdown
# EzyMetrics API

EzyMetrics is a powerful Node.js and Express API designed for eCommerce analytics and campaign management. It handles customer and campaign data, provides detailed metrics, generates PDF and CSV reports, and supports email notifications for threshold breaches in average product price.

## Features

- **Customer Management**: Perform CRUD operations for customers.
- **Campaign Management**: Manage campaigns with full CRUD capabilities.
- **Metrics Generation**: Automatically calculates average product price, top-rated products, customer locations, and most demanding product categories.
- **Reports**: Generate downloadable PDF and CSV reports based on metrics.
- **Email Notifications**: Automatic email alerts when the average product price exceeds a predefined threshold.
- **ETL Process**: Extracts, transforms, and loads customer and campaign data, storing metrics for analysis.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose for schema management)
- **APIs**: Axios for data fetching
- **Libraries**:
  - Nodemailer for sending notifications
  - PDFKit for generating PDF reports
  - csv-writer for generating CSV reports

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Customer APIs](#customer-apis)
  - [Campaign APIs](#campaign-apis)
  - [Metrics APIs](#metrics-apis)
  - [Report APIs](#report-apis)
  - [Email Notification Test](#email-notification-test)
- [ETL Process and Metrics Generation](#etl-process-and-metrics-generation)
- [MongoDB Data Storage](#mongodb-data-storage)
- [Folder Structure](#folder-structure)
- [Author](#author)

## Installation

### Prerequisites

- Node.js and MongoDB installed
- MongoDB setup locally or via MongoDB Atlas
- A Gmail account for email notifications

### Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/username/ezymetrics.git
   cd ezymetrics
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory with the following values:

   ```bash
   MONGO_URI=<Your MongoDB URI>
   EMAIL_USER=<Your email address>
   EMAIL_PASS=<Your email password or app-specific password>
   PORT=4000
   ```

4. **Run the server**:

   ```bash
   npm start
   ```

   The server should be running on `http://localhost:4000`.

## Environment Variables

Ensure the `.env` file contains the following:

- **MONGO_URI**: MongoDB connection string.
- **EMAIL_USER**: Your email address for notifications.
- **EMAIL_PASS**: Password or app-specific password for Gmail.
- **PORT**: Port number for the server (default: 4000).

## API Endpoints

### Customer APIs

The Customer APIs allow CRUD operations on customer data. Customer data is stored in the `Lead` model in MongoDB.

#### 1. Get All Customers

- **URL**: `/api/customers`
- **Method**: `GET`
- **Description**: Fetches customer data from the FakeStore API and stores it in MongoDB.
- **Response**: A list of customers stored in MongoDB.

```bash
GET http://localhost:4000/api/customers
```

#### 2. Add New Customer

- **URL**: `/api/customers`
- **Method**: `POST`
- **Body**: JSON data for a new customer.
- **Response**: Newly added customer record.

```bash
POST http://localhost:4000/api/customers
```

#### 3. Update Customer by ID

- **URL**: `/api/customers/:id`
- **Method**: `PUT`
- **Body**: Updated customer data.
- **Response**: Updated customer record.

```bash
PUT http://localhost:4000/api/customers/:id
```

#### 4. Delete Customer by ID

- **URL**: `/api/customers/:id`
- **Method**: `DELETE`
- **Response**: Success message confirming deletion.

```bash
DELETE http://localhost:4000/api/customers/:id
```

### Campaign APIs

The Campaign APIs enable CRUD operations on product data, treated as campaigns. Campaign data is stored in the `Campaign` model in MongoDB.

#### 1. Get All Campaigns

- **URL**: `/api/products`
- **Method**: `GET`
- **Description**: Fetches campaign data from FakeStore API and stores it in MongoDB.
- **Response**: List of campaigns.

```bash
GET http://localhost:4000/api/products
```

#### 2. Add New Campaign

- **URL**: `/api/products`
- **Method**: `POST`
- **Body**: JSON data for a new campaign.
- **Response**: Newly added campaign record.

```bash
POST http://localhost:4000/api/products
```

#### 3. Update Campaign by ID

- **URL**: `/api/products/:id`
- **Method**: `PUT`
- **Body**: Updated campaign data.
- **Response**: Updated campaign record.

```bash
PUT http://localhost:4000/api/products/:id
```

#### 4. Delete Campaign by ID

- **URL**: `/api/products/:id`
- **Method**: `DELETE`
- **Response**: Success message confirming deletion.

```bash
DELETE http://localhost:4000/api/products/:id
```

### Metrics APIs

Metrics APIs calculate and store analytical metrics in the MongoDB `Metrics` collection. Metrics include average product price, top-rated products, and customer location breakdowns.

#### 1. Generate Metrics

- **URL**: `/api/metrics`
- **Method**: `GET`
- **Description**: Extracts customer and campaign data, calculates metrics, and stores them in MongoDB.
- **Response**: Generated metrics data.

```bash
GET http://localhost:4000/api/metrics
```

If the average product price exceeds 30, an alert email is sent.

### Report APIs

The Report APIs allow you to download PDF and CSV reports based on the latest metrics.

#### 1. Generate PDF Report

- **URL**: `/api/reports/pdf`
- **Method**: `GET`
- **Description**: Downloads a PDF report of the latest metrics.
- **Response**: PDF file download.

```bash
GET http://localhost:4000/api/reports/pdf
```

#### 2. Generate CSV Report

- **URL**: `/api/reports/csv`
- **Method**: `GET`
- **Description**: Downloads a CSV report of the latest metrics.
- **Response**: CSV file download.

```bash
GET http://localhost:4000/api/reports/csv
```

### Email Notification Test

#### 1. Test Email Notification

- **URL**: `/api/test-email`
- **Method**: `GET`
- **Description**: Sends a test email to verify email configuration.
- **Response**: Confirmation of email sent or error message.

```bash
GET http://localhost:4000/api/test-email
```

## ETL Process and Metrics Generation

The **ETL (Extract, Transform, Load)** process is activated through the `/api/metrics` endpoint. It performs the following steps:

1. **Extract**: Fetches customer and product data from MongoDB.
2. **Transform**: Calculates metrics:
   - **Average Product Price**
   - **Top-Rated Products**: Products with ratings above 4.5.
   - **Customer Location Breakdown**: Counts customers by city.
   - **Most Demanding Category**: Category with the most products.
3. **Load**: Saves the metrics in the `Metrics` collection in MongoDB.

This process ensures data integrity and automates metrics calculation for analytics.

## MongoDB Data Storage

The application uses three main collections in MongoDB:

- **Leads** (`Lead` model): Stores customer data with fields like `email`, `username`, `name`, `address`, and `phone`.
- **Campaigns** (`Campaign` model): Stores campaign (product) data with fields like `title`, `price`, `description`, `category`, `image`, and `rating`.
- **Metrics** (`Metrics` model): Stores analytical data, including average product price, top-rated products, customer location breakdowns, and the most demanding category.

### MongoDB Schema

```javascript
// Lead Schema
const customerSchema = new mongoose.Schema({
  email: String,
  username: String,
  name: { firstname: String, lastname: String },
  address: { city: String, street: String, number: Number, zipcode: String },
  phone: String,
});

// Campaign Schema
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: { rate: Number, count: Number },
});

// Metrics Schema
const metricsSchema = new mongoose.Schema({
  averageProductPrice: Number,
  topRatedProducts: [{ title: String, rating: { rate: Number, count: Number } }],
  customerLocationBreakdown: Object

,
  mostDemandingCategory: { category: String, count: Number },
  createdAt: { type: Date, default: Date.now },
});
```

## Folder Structure

```plaintext
/project-root
│
├── /routes
│   ├── customerRoutes.js      # Routes for customer APIs
│   ├── productRoutes.js       # Routes for campaign APIs
│   ├── metricsRoutes.js       # Routes for metrics APIs
│   ├── reportRoutes.js        # Routes for PDF/CSV report generation
│
├── /controllers
│   ├── customerController.js  # Customer logic
│   ├── productController.js   # Campaign logic
│   ├── metricsController.js   # ETL and metrics logic
│   ├── reportController.js    # PDF/CSV generation logic
│
├── /services
│   ├── emailService.js        # Email notification logic
│   ├── pdfService.js          # PDF generation logic
│   ├── csvService.js          # CSV generation logic
│
├── /models
│   ├── Lead.js                # MongoDB schema for customers
│   ├── Campaign.js            # MongoDB schema for campaigns
│   ├── Metrics.js             # MongoDB schema for metrics
│
├── .env                       # Environment variables
├── server.js                  # Server setup and main configuration
├── package.json               # Project dependencies
```

## Author

**Ashish Ranjan**  
[LinkedIn Profile]()  
Email: ashishranjan9904@gmail.com  
Phone: 7870533708
```

This single `README.md` file provides all necessary documentation to set up, configure, and use the API, with clear route explanations, MongoDB schema details, and a comprehensive folder structure. This structure will be helpful for anyone accessing your GitHub project.