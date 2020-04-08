const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);
  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const index = repositories.findIndex((row) => row.id === id);

  if (index < 0) {
    return response.status(400).json({});
  }

  const repository = { ...repositories[index], title, url, techs, id };

  repositories[index] = repository;

  return response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((row) => row.id === id);

  if (index < 0) {
    return response.status(400).json({});
  }

  repositories.splice(index, 1);
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((row) => row.id === id);

  if (index < 0) {
    return response.status(400).json({});
  }

  const repository = repositories[index];
  const updated = { ...repository, likes: repository.likes + 1 };

  repositories[index] = updated;

  return response.status(200).json(updated);
});

module.exports = app;
