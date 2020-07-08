import React, { useState, useEffect, createRef } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const newRepository = createRef();
  const newTechs = createRef();
  const newURL = createRef();

  useEffect(() => {
    api.get("/repositories").then((result) => setRepositories(result.data));
  }, []);

  async function handleAddRepository() {
    let title = newRepository.current.value;
    let techs = newTechs.current.value;
    let url = newURL.current.value;

    const response = await api.post("/repositories", {
      title,
      techs,
      url,
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      api.delete(`repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => {
          return repository.id !== id ? true : false;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <br />
      <input
        type="text"
        ref={newRepository}
        placeholder="Nome do Repositorio"
      />
      <br />
      <input type="text" ref={newTechs} placeholder="Tecnologias usadas" />
      <br />
      <input type="text" ref={newURL} placeholder="Endereço do Repositório" />
      <br />
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
