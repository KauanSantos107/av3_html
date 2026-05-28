const regioes = {

    "Florianópolis": {
  
      terminal: "Terminal Central",
  
      mapa:
        "https://www.openstreetmap.org/export/embed.html?bbox=-48.60%2C-27.61%2C-48.50%2C-27.55&layer=mapnik"
    },
  
    "São José": {
  
      terminal: "Terminal Kobrasol",
  
      mapa:
        "https://www.openstreetmap.org/export/embed.html?bbox=-48.67%2C-27.62%2C-48.58%2C-27.57&layer=mapnik"
    },
  
    "Palhoça": {
  
      terminal: "Terminal Palhoça",
  
      mapa:
        "https://www.openstreetmap.org/export/embed.html?bbox=-48.70%2C-27.67%2C-48.60%2C-27.60&layer=mapnik"
    },
  
    "Joinville": {
  
      terminal: "Terminal Norte",
  
      mapa:
        "https://www.openstreetmap.org/export/embed.html?bbox=-48.90%2C-26.35%2C-48.75%2C-26.25&layer=mapnik"
    },
  
    "Blumenau": {
  
      terminal: "Terminal Proeb",
  
      mapa:
        "https://www.openstreetmap.org/export/embed.html?bbox=-49.15%2C-26.95%2C-49.05%2C-26.85&layer=mapnik"
    }
  };
  
  function gerarListaHorarios() {
  
    let horarios = [];
  
    for (
      let hora = 6;
      hora <= 23;
      hora++
    ) {
  
      // Horários de pico
      if (
  
        (hora >= 6 && hora <= 8) ||
  
        (hora >= 17 && hora <= 19)
  
      ) {
  
        horarios.push(
          `${hora
            .toString()
            .padStart(2, '0')}:00`
        );
  
        horarios.push(
          `${hora
            .toString()
            .padStart(2, '0')}:20`
        );
  
        horarios.push(
          `${hora
            .toString()
            .padStart(2, '0')}:40`
        );
      }
  
      // Horários normais
      else {
  
        horarios.push(
          `${hora
            .toString()
            .padStart(2, '0')}:00`
        );
  
        horarios.push(
          `${hora
            .toString()
            .padStart(2, '0')}:30`
        );
      }
    }
  
    return horarios;
  }
  
  function verificarPico(horario) {
  
    const hora =
      parseInt(
        horario.split(':')[0]
      );
  
    return (
  
      (hora >= 6 && hora <= 8) ||
  
      (hora >= 17 && hora <= 19)
    );
  }
  
  function abrirMapa(regiao, horario) {
  
    document
      .getElementById('modalMapa')
      .style.display = 'block';
  
    document
      .getElementById('tituloMapa')
      .innerHTML = `
        ${regiao}
        - Horário ${horario}
      `;
  
    document
      .getElementById('mapaFrame')
      .src = regioes[regiao].mapa;
  }
  
  function fecharMapa() {
  
    document
      .getElementById('modalMapa')
      .style.display = 'none';
  }
  
  function gerarHorarios() {
  
    const regiao =
      document
        .getElementById('regiao')
        .value;
  
    const resultado =
      document
        .getElementById('resultado');
  
    if (!regiao) {
  
      resultado.innerHTML = `
  
        <div class="card">
  
          <h2>
            Selecione uma região
          </h2>
  
        </div>
      `;
  
      return;
    }
  
    const horarios =
      gerarListaHorarios();
  
    let html = `
  
      <div class="card">
  
        <h2>
          ${regiao}
        </h2>
  
        <p>
  
          <strong>
            Terminal principal:
          </strong>
  
          ${regioes[regiao].terminal}
  
        </p>
  
        <p>
  
          <strong>
            Funcionamento:
          </strong>
  
          06:00 às 23:00
  
        </p>
  
        <div class="horarios">
    `;
  
    horarios.forEach(horario => {
  
      html += `
  
        <div
  
          class="
            horario
            ${verificarPico(horario)
              ? 'pico'
              : ''
            }
          "
  
          onclick="
            abrirMapa(
              '${regiao}',
              '${horario}'
            )
          "
  
        >
  
          ${horario}
  
        </div>
      `;
    });
  
    html += `
  
        </div>
  
      </div>
    `;
  
    resultado.innerHTML = html;
  }