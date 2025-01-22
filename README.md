# Portfolio360

Managing your investments and tracking their performance is critical for achieving your financial goals. The **Portfolio360** helps users effectively monitor their stock investments, analyze performance, and make informed decisions. Designed for investors, this tool simplifies tracking portfolio value, identifying top-performing stocks, and visualizing portfolio distribution through intuitive charts.

![home](https://github.com/user-attachments/assets/cffc593f-9ee3-4302-bac3-d410841c0d79)


---

## How to Run the Application Locally

### Prerequisites
Ensure you have **XAMPP** installed and running. Start the **MySQL** and **Apache** services.

---

### 1. Install Dependencies
Before running the application, install the required dependencies:

```bash
npm install
```
---
### 2. Start the Frontend

1. Open the terminal.  
2. Navigate to the frontend folder:  
```bash
cd frontend 
```
3.Run the following command to start the frontend:
```bash
npm start
```
### 4. Start the Backend
1. Open a new terminal or split the terminal window.
2. Navigate to the backend folder:
```bash
cd backend
```
3.Run the following command to start the backend:
```bash
node server.js
```

### Frontend Quick Start

If you're already in the frontend directory, use these commands to launch the frontend:
```bash
cd frontend
npm start
```

## Limitations

- **API Rate Limiting**: 
  The Finnhub API has a rate limit of 30 requests per second. Due to this limitation, the application cannot display separate portfolios for each user simultaneously. Instead, all portfolios are aggregated and shown together, ensuring that the number of requests does not exceed the allowed limit.

![currentstocks](https://github.com/user-attachments/assets/5473e4d5-f060-4945-bcfd-4e604806522f)


## Database Schema Design

This database schema is designed to manage user portfolios, stocks, and the relationship between them. It consists of the following tables:

## **Users Table**
This table stores user information.

| Column       | Type    | Description                                    |
|--------------|---------|------------------------------------------------|
| `User_Id`    | INT     | Unique identifier for each user               |
| `Name`       | VARCHAR | Name of the user                              |
| `Email`      | VARCHAR | Email of the user                             |
| `Password`   | VARCHAR | Password for user authentication              |
| `created_at` | DATETIME| Timestamp when the user account was created   |

## **Portfolios Table**
This table stores the portfolios for each user. A user can have multiple portfolios.

| Column        | Type    | Description                                        |
|---------------|---------|----------------------------------------------------|
| `Portfolio_Id`| INT     | Unique identifier for each portfolio              |
| `U_Id`        | INT     | Foreign key referencing `User_Id` in the `Users` table |
| `portfolio_name` | VARCHAR | Name of the portfolio                          |
| `created_date` | DATETIME | Timestamp when the portfolio was created         |

## **Portfolio_Stocks Table**
This table stores the relationship between portfolios and stocks, including the quantity of each stock in the portfolio.

| Column       | Type    | Description                                         |
|--------------|---------|-----------------------------------------------------|
| `Id`         | INT     | Unique identifier for each record                  |
| `Portfolio_Id` | INT    | Foreign key referencing `Portfolio_Id` in the `Portfolios` table |
| `Stock_Id`   | INT     | Foreign key referencing `Stock_Id` in the `Stocks` table |
| `Quantity`   | INT     | Quantity of the stock in the portfolio             |

## **Stocks Table**
This table stores the details of stocks, including the quantity owned by the user.

| Column         | Type    | Description                                         |
|----------------|---------|-----------------------------------------------------|
| `Stock_Id`     | INT     | Unique identifier for each stock                   |
| `U_Id`         | INT     | Foreign key referencing `User_Id` in the `Users` table |
| `stock_name`   | VARCHAR | Name of the stock                                  |
| `ticker`       | VARCHAR | Stock ticker symbol                                |
| `quantity`     | INT     | Total quantity of the stock owned by the user     |
| `buy_price`    | DECIMAL | Purchase price of the stock                        |
| `purchase_date`| DATETIME| Date when the stock was purchased                  |
| `created_date` | DATETIME| Timestamp when the stock record was created       |

---

This design provides an efficient way to manage users, their portfolios, and the stocks within those portfolios. The use of foreign keys ensures data integrity, and indexing on frequently queried fields (such as `User_Id`, `Portfolio_Id`, and `Stock_Id`) improves performance for large datasets.

## Links to Deployed Application

I have successfully deployed the frontend of my application on Vercel. However, I encountered difficulties deploying the backend as each platform requires card details for the process. As a result, I have recorded a demonstration of my web application and uploaded it for your review. If it is acceptable, you can use the link below to access the demonstration.

Frontend Deployment: https://portfolio-tracker-euoi774o4-devikas-projects-478a0364.vercel.app/home.

Application Demonstration: https://drive.google.com/file/d/1kf6iT6o3kykiMXlGC9xQy7290pYN0DAW/view?usp=sharing.

GitHub Repository Link: https://github.com/Harshani00/Portfolio_Tracker.git.


