<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Malla Curricular Derecho</title>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Rosario&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: #faf4ea;
      font-family: 'Rosario', sans-serif;
      color: #49241f;
      margin: 0;
      padding: 30px;
      position: relative;
      overflow-x: auto;
    }

    .titulo {
      font-family: 'Dancing Script', cursive;
      font-size: 48px;
      text-align: center;
      color: #bd4829;
      margin-bottom: 40px;
    }

    .grid-malla-wrapper {
      max-width: 100%;
      overflow-x: auto;
      padding-bottom: 10px;
    }

    .grid-malla {
      display: grid;
      grid-template-columns: repeat(10, 180px);
      gap: 16px;
      margin-bottom: 30px;
      padding-bottom: 10px;
      width: max-content;
    }

    .columna {
      background-color: #99c2c6;
      padding: 15px;
      border-radius: 10px;
      box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
    }

    .columna h2 {
      text-align: center;
      font-size: 18px;
      color: #49241f;
      margin-bottom: 10px;
    }

    .ramo {
      background-color: #fae1ce;
      color: #49241f;
      border: none;
      border-radius: 6px;
      padding: 10px;
      margin: 6px 0;
      font-size: 16px;
      cursor: pointer;
      font-family: 'Rosario', sans-serif;
      transition: transform 0.2s ease;
      width: 100%;
    }

    .ramo.aprobado {
      background-color: #f4a590;
      color: white;
      font-weight: bold;
    }

    .ramo[data-bloqueado="true"] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .ramo:hover:not([data-bloqueado="true"]) {
      transform: scale(1.03);
    }

    .ramo.destacado {
      box-shadow: 0 0 10px #f4a590;
      transform: scale(1.05);
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    .challa-papelito {
      position: fixed;
      top: -20px;
      background-color: #f4a590;
      opacity: 0.85;
      border-radius: 3px;
      animation: caer-challa 3.5s ease-out forwards;
      z-index: 9999;
    }

    @keyframes caer-challa {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
  </style>
</head>
<body>
  <h1 class="titulo">Malla Curricular Derecho</h1>
  <div class="grid-malla-wrapper">
    <div class="grid-malla">

      <!-- 🧠 Tu grilla de semestres va aquí -->
      <!-- Puedes insertar los bloques que ya hemos generado para 1º al 10º semestre -->

    </div>
  </div>

  <div class="bloque-extra">
    <h2>Formación Fundamental (FOFUs)</h2>
    <button class="ramo fundamental" id="FOFU1">Antropología Cristiana</button>
    <button class="ramo fundamental" id="FOFU2">Ética Cristiana</button>
    <button class="ramo fundamental" id="FOFU3">FOFU 3</button>
    <button class="ramo fundamental" id="FOFU4">FOFU 4</button>
    <button class="ramo fundamental" id="FOFU5">FOFU 5</button>
  </div>

  <div class="bloque-extra">
    <h2>Cursos Optativos</h2>
    <button class="ramo optativo" id="OPT1">Optativo I</button>
    <button class="ramo optativo" id="OPT2">Optativo II</button>
    <button class="ramo optativo" id="OPT3">Optativo III</button>
    <button class="ramo optativo" id="OPT4">Optativo IV</button>
    <button class="ramo optativo" id="OPT5">Optativo V</button>
    <button class="ramo optativo" id="OPT6">Optativo VI</button>
  </div>

  <script>
    let creditosTotales = 0;

    function contarFOFUs() {
      return Array.from(document.querySelectorAll('.ramo.fundamental'))
        .filter(r => r.classList.contains('aprobado')).length;
    }

    function contarOptativos() {
      return Array.from(document.querySelectorAll('.ramo.optativo'))
        .filter(r => r.classList.contains('aprobado')).length;
    }

    function prerrequisitosCumplidos(prerrequisitos) {
      return prerrequisitos.every(id => {
        const ramo = document.getElementById(id);
        return ramo && ramo.classList.contains('aprobado');
      });
    }

    function actualizarEstadoRamos() {
      document.querySelectorAll('.ramo').forEach(boton => {
        const datos = boton.dataset.prerrequisitos;
        const creditosMin = boton.dataset.requiereCreditos;
        const fofusMin = boton.dataset.requiereFofus;
        const optativosMin = boton.dataset.requiereOptativos;

        let habilitado = true;

        if (datos) {
          const prereqs = datos.split(',').map(p => p.trim());
          if (!prerrequisitosCumplidos(prereqs)) habilitado = false;
        }

        if (creditosMin && creditosTotales < parseInt(creditosMin)) habilitado = false;
        if (fofusMin && contarFOFUs() < parseInt(fofusMin)) habilitado = false;
        if (optativosMin && contarOptativos() < parseInt(optativosMin)) habilitado = false;

        boton.disabled = !habilitado;
        boton.setAttribute('data-bloqueado', (!habilitado).toString());
      });
    }

    function lanzarChalla() {
      for (let i = 0; i < 100; i++) {
        const papelito = document.createElement('div');
        papelito.classList.add('challa-papelito');
        papelito.style.left = `${Math.random() * window.innerWidth}px`;
        papelito.style.transform = `rotate(${Math.random() * 360}deg)`;
        const colores = ['#f4a590', '#fae1ce', '#99c2c6', '#bd4829', '#e1c1d2'];
        papelito.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        papelito.style.width = `${Math.random() * 10 + 6}px`;
        papelito.style.height = `${Math.random() * 14 + 8}px`;
        papelito.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
        document.body.appendChild(papelito);
        setTimeout(() => papelito.remove(), 3500);
      }
    }

    function aprobarRamo(boton) {
      if (!boton.classList.contains('aprobado')) {
        boton.classList.add('aprobado', 'destacado');

        const creditos = parseInt(boton.dataset.creditos) || 0;
        creditosTotales += creditos;

        setTimeout(() => {
          boton.classList.remove('destacado');
        }, 1000);

        lanzarChalla();
        actualizarEstadoRamos();
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      actualizarEstadoRamos();
      document.querySelectorAll('.ramo').forEach(boton => {
        boton.addEventListener('click', () => {
          if (boton.getAttribute('data-bloqueado') !== 'true') {
            aprobarRamo(boton);
          }
        });
      });
    });
  </script>
</body>
</html>
