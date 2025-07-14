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

    .bloque-extra {
      margin-top: 40px;
    }

    .bloque-extra h2 {
      font-size: 20px;
      margin-bottom: 10px;
      color: #bd4829;
    }

    .challa-papelito {
      position: fixed;
      z-index: 9999;
      border-radius: 3px;
      animation: caer-challa linear forwards;
    }

    @keyframes caer-challa {
      0% {
        transform: translateX(0) translateY(0) rotate(0deg);
        opacity: 1;
      }
      50% {
        transform: translateX(-30px) translateY(50vh) rotate(180deg);
        opacity: 0.8;
      }
      100% {
        transform: translateX(30px) translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  </style>
</head>
<body>
  <h1 class="titulo">Malla Curricular Derecho</h1>
  <div class="grid-malla-wrapper">
    <div class="grid-malla">

      <!-- Aquí van todos los ramos de 1º a 10º semestre -->
      <!-- Para mantener este mensaje fluido, puedes copiar directamente los bloques que te envié anteriormente con todos los ramos estructurados -->
      <!-- Asegúrate de insertarlos dentro de este <div class="grid-malla"> -->

    </div>
  </div>

  <!-- FOFUs -->
  <div class="bloque-extra">
    <h2>Formación Fundamental (FOFUs)</h2>
    <button class="ramo fundamental" id="FOFU1" data-creditos="0">Antropología Cristiana</button>
    <button class="ramo fundamental" id="FOFU2" data-creditos="0">Ética Cristiana</button>
    <button class="ramo fundamental" id="FOFU3" data-creditos="0">FOFU 3</button>
    <button class="ramo fundamental" id="FOFU4" data-creditos="0">FOFU 4</button>
    <button class="ramo fundamental" id="FOFU5" data-creditos="0">FOFU 5</button>
  </div>

  <!-- Optativos -->
  <div class="bloque-extra">
    <h2>Cursos Optativos</h2>
    <button class="ramo optativo" id="OPT1" data-creditos="0">Optativo I</button>
    <button class="ramo optativo" id="OPT2" data-creditos="0">Optativo II</button>
    <button class="ramo optativo" id="OPT3" data-creditos="0">Optativo III</button>
    <button class="ramo optativo" id="OPT4" data-creditos="0">Optativo IV</button>
    <button class="ramo optativo" id="OPT5" data-creditos="0">Optativo V</button>
    <button class="ramo optativo" id="OPT6" data-creditos="0">Optativo VI</button>
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
      for (let i = 0; i < 1500; i++) {
        const papelito = document.createElement('div');
        papelito.classList.add('challa-papelito');
        papelito.style.left = `${Math.random() * window.innerWidth}px`;
        papelito.style.top = `-${Math.random() * 100 + 20}px`;
        papelito.style.transform = `rotate(${Math.random() * 360}deg)`;
        const colores = ['#f4a590', '#fae1ce', '#99c2c6', '#bd4829', '#e1c1d2'];
        papelito.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        papelito.style.width = `${Math.random() * 10 + 6}px`;
        papelito.style.height = `${Math.random() * 14 + 8}px`;
        papelito.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
        papelito.style.animationDuration = `${2 + Math.random() * 3}s`;
        document.body.appendChild(papelito);
        setTimeout(() => papelito.remove(), 5000);
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
