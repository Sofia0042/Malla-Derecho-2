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
  const todosLosRamos = document.querySelectorAll('.ramo');
  todosLosRamos.forEach(boton => {
    const datos = boton.dataset.prerrequisitos;
    const creditosMin = boton.dataset.requiereCreditos;
    const fofusMin = boton.dataset.requiereFofus;
    const optativosMin = boton.dataset.requiereOptativos;

    let habilitado = true;

    // Verifica prerrequisitos por ID
    if (datos) {
      const prereqs = datos.split(',').map(p => p.trim());
      if (!prerrequisitosCumplidos(prereqs)) habilitado = false;
    }

    // Verifica requisitos por créditos totales
    if (creditosMin && creditosTotales < parseInt(creditosMin)) habilitado = false;

    // Verifica FOFUs
    if (fofusMin && contarFOFUs() < parseInt(fofusMin)) habilitado = false;

    // Verifica Optativos
    if (optativosMin && contarOptativos() < parseInt(optativosMin)) habilitado = false;

    // Aplica bloqueo
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
