const factibilidadData = {
  metal: [],
  concreto: []
};
let proyectoCount = 0;

function actualizarSuma() {
  const factorResistencia = parseFloat(document.getElementById('factor-resistencia').value) || 0;
  const factorCosto = parseFloat(document.getElementById('factor-costo').value) || 0;
  const factorTiempo = parseFloat(document.getElementById('factor-tiempo').value) || 0;
  const factorVida = parseFloat(document.getElementById('factor-vida').value) || 0;
  
  const suma = factorResistencia + factorCosto + factorTiempo + factorVida;
  document.getElementById('suma-factores').innerText = `Suma actual: ${suma}%`;
  
  if (suma !== 100) {
      document.getElementById('suma-factores').style.color = 'red';
  } else {
      document.getElementById('suma-factores').style.color = 'black';
  }
}

function calcularFactibilidad() {
  const factorResistencia = parseFloat(document.getElementById('factor-resistencia').value) || 0;
  const factorCosto = parseFloat(document.getElementById('factor-costo').value) || 0;
  const factorTiempo = parseFloat(document.getElementById('factor-tiempo').value) || 0;
  const factorVida = parseFloat(document.getElementById('factor-vida').value) || 0;

  const suma = factorResistencia + factorCosto + factorTiempo + factorVida;
  if (suma !== 100) {
      alert("La suma de las casillas debe ser igual a 100.");
      return;
  }

  const metalResistencia = parseFloat(document.getElementById('metal-resistencia').value) || 0;
  const metalCosto = parseFloat(document.getElementById('metal-costo').value) || 0;
  const metalTiempo = parseFloat(document.getElementById('metal-tiempo').value) || 0;
  const metalVida = parseFloat(document.getElementById('metal-vida').value) || 0;

  const concretoResistencia = parseFloat(document.getElementById('concreto-resistencia').value) || 0;
  const concretoCosto = parseFloat(document.getElementById('concreto-costo').value) || 0;
  const concretoTiempo = parseFloat(document.getElementById('concreto-tiempo').value) || 0;
  const concretoVida = parseFloat(document.getElementById('concreto-vida').value) || 0;

  const factibilidadMetal = (metalResistencia * factorResistencia / 100) - (metalCosto * factorCosto / 100) - (metalTiempo * factorTiempo / 100) + (metalVida * factorVida / 100);
  const factibilidadConcreto = (concretoResistencia * factorResistencia / 100) - (concretoCosto * factorCosto / 100) - (concretoTiempo * factorTiempo / 100) + (concretoVida * factorVida / 100);

  factibilidadData.metal.push(factibilidadMetal);
  factibilidadData.concreto.push(factibilidadConcreto);
  proyectoCount++;

  // Cálculo de factibilidad simplificado
  let factibilidadDiferencia = factibilidadMetal - factibilidadConcreto;

  let resultadoText = "";

  if (factibilidadDiferencia > 0) {
      resultadoText = "Es factible usar estructuras metálicas";
      document.getElementById('resultado').style.color = "green";
  } else if (factibilidadDiferencia < 0) {
      resultadoText = "No es factible usar estructuras metálicas";
      document.getElementById('resultado').style.color = "red";
  } else {
      resultadoText = "Ambas se pueden usar";
      document.getElementById('resultado').style.color = "black";
  }

  document.getElementById('resultado').innerText = `Factibilidad Metal: ${factibilidadMetal.toFixed(2)}, Factibilidad Concreto: ${factibilidadConcreto.toFixed(2)}. ${resultadoText}`;

  renderChart();
}

function renderChart() {
  const dataPointsMetal = factibilidadData.metal.map((value, index) => ({ label: `Proyecto ${index + 1}`, y: value }));
  const dataPointsConcreto = factibilidadData.concreto.map((value, index) => ({ label: `Proyecto ${index + 1}`, y: value }));

  const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
          text: "Comparación de Factibilidad"
      },
      axisX: {
          title: "Proyectos"
      },
      axisY: {
          title: "Factibilidad"
      },
      data: [{
          type: "column",
          name: "Metal",
          showInLegend: true,
          dataPoints: dataPointsMetal,
          color: "#ff6666"
      }, {
          type: "column",
          name: "Concreto",
          showInLegend: true,
          dataPoints: dataPointsConcreto,
          color: "#666666"
      }],
      renderAtPixelRatio: window.devicePixelRatio || 1 // Mejora la nitidez del gráfico
  });

  chart.render();
}


function resetDatos() {
  factibilidadData.metal = [];
  factibilidadData.concreto = [];
  proyectoCount = 0;
  document.getElementById('resultado').innerText = '';
  renderChart();
}

function descargarDatos() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Proyecto,Factibilidad Metal,Factibilidad Concreto\n";
  factibilidadData.metal.forEach((metalValue, index) => {
      const concretoValue = factibilidadData.concreto[index];
      csvContent += `Proyecto ${index + 1},${metalValue},${concretoValue}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "factibilidad_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


function mostrarCalculadora() {
  document.getElementById('calculadoraContainer').style.display = 'block';
  document.querySelector('.btn-inicio').style.display = 'none'; 
}









