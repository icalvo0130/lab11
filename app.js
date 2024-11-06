
class Agente {
    constructor(nombre, rol, habilidades, imagen) {
      this.nombre = nombre;
      this.rol = rol;
      this.habilidades = habilidades;
      this.imagen = imagen;
    }
  }
  
  // para tener agentes
  async function getAgents() {
    try {
      const response = await fetch("https://valorant-api.com/v1/agents");
      const data = await response.json();
      
      // mapeo de datos de agente
      return data.data.map(agent => new Agente(
        agent.displayName,
        agent.role?.displayName || "Sin rol",
        agent.abilities.map(ability => ability.displayName),
        agent.displayIcon
      ));
    } catch (error) {
      console.error("Error al obtener agentes:", error);
      return [];
    }
  }
  
  // para renderizar los agentes 
  function renderAgents(agents) {
    const container = document.getElementById("agents-container");
    container.innerHTML = ""; 
  
    agents.forEach(agent => {
      const agentElement = document.createElement("div");
      agentElement.classList.add("agent");
  
      agentElement.innerHTML = `
        <img src="${agent.imagen}" alt="${agent.nombre}" class="agent-image" />
        <h2>${agent.nombre}</h2>
        <p><strong>Rol:</strong> ${agent.rol}</p>
        <p><strong>Habilidades:</strong> ${agent.habilidades.join(", ")}</p>
      `;
  
      container.appendChild(agentElement);
    });
  }
  
  // para la búsqueda (filtros)
  function filterAgents(agents, searchTerm) {
    return agents.filter(agent =>
      agent.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  //inicialización de la aplicación
  async function init() {
    const agents = await getAgents();
    renderAgents(agents);
  
    //busqueda tiempo real
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value;
      const filteredAgents = filterAgents(agents, searchTerm);
      renderAgents(filteredAgents);
    });
  }
  
  init();
  