# Step 2: SQL Injection

In this step, we will explore SQL injection vulnerabilities in our web application. SQL injection occurs when an attacker is able to manipulate a SQL query by injecting malicious input. This can lead to unauthorized access to data, data manipulation, or even complete control over the database.

## Objective

The goal of this step is to demonstrate how SQL injection can be exploited and to understand the potential impact of such vulnerabilities.

## Setup

1. Ensure that your application is running and that you have access to the login and search functionalities.
2. Use the provided credentials to log in to the application.

## Exploiting SQL Injection

### Step 1: Identify the Vulnerable Input

Navigate to the search page of the application. You will find a search input field that allows you to query the database.

### Step 2: Test for SQL Injection

In the search input field, try entering the following payload:

```
' OR '1'='1
```

This input attempts to manipulate the SQL query by always returning true, potentially exposing all records in the database.

### Step 3: Analyze the Response

After submitting the search query, observe the response. If the application is vulnerable, you may see unexpected results, such as a list of all users or products in the database.

### Step 4: Extract Data

You can further refine your SQL injection to extract specific data. For example, try:

```
' UNION SELECT username, password FROM users --
```

This payload attempts to combine the results of the original query with the usernames and passwords from the users table.

### Step 5: Mitigation

Discuss with your peers how to mitigate SQL injection vulnerabilities. Common practices include:

- Using prepared statements or parameterized queries.
- Validating and sanitizing user inputs.
- Implementing proper error handling to avoid revealing database structure.

## Commands to Run

To test the SQL injection, you can use the following commands in your terminal:

1. Start the application:
   ```
   npm run dev
   ```

2. Access the application in your browser at `http://localhost:3000`.

3. Use the search functionality with the provided payloads.

## Conclusion

SQL injection is a powerful attack vector that can lead to severe consequences if not properly mitigated. Understanding how to exploit and defend against these vulnerabilities is crucial for developing secure applications.