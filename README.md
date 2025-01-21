# Portfolio360

Managing your investments and tracking their performance is critical for achieving your financial goals. The **Portfolio Tracker** helps users effectively monitor their stock investments, analyze performance, and make informed decisions. Designed for investors, this tool simplifies tracking portfolio value, identifying top-performing stocks, and visualizing portfolio distribution through intuitive charts.

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


