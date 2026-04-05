const express = require('express');
const mysql = require('mysql2');

const app = express();

const connectWithRetry = () => {
  const connection = mysql.createConnection({
    host: "db",
    user: "root",
    password: "123456",
    database: "testdb",
  });

  connection.connect((err) => {
    if (err) {
      console.log("⏳ MySQL chưa sẵn sàng, retry sau 3s...");
      setTimeout(connectWithRetry, 3000);
    } else {
      console.log("✅ Kết nối MySQL thành công!");
    }
  });
};

connectWithRetry();