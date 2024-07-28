const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "tododb",
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: "127.0.0.1",
    dialect: "postgres",
  }
);
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const Todo = sequelize.define("Todo", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelize.sync();

// Routes

// Create a new todo
app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single todo by ID
app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      await todo.update(req.body);
      res.json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      await todo.destroy();
      res.json({ message: "Todo deleted" });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
