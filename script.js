let creditosTotales = 0;

function calcularCreditosTotales() {
  creditosTotales = 0;
  document.querySelectorAll('.ramo.aprobado').forEach(ramo => {
    creditosTotales += parseInt(ramo.dataset.creditos) || 0;
  });
}

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

function tieneCreditosMinimos(ramo) {
  const creditosMin = ramo.dataset.requiereCreditos;
  if (!creditosMin) return true;
  return creditosTotales >= parseInt(creditosMin);
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

    if (!tieneCreditosMinimos(boton)) habilitado = false;

    if (fofusMin && contarFOFUs() < parseInt(fofusMin)) habilitado = false;

    if (optativosMin && contarOptativos() < parseInt(optativosMin)) habilitado = false;

    if (boton.id === 'DER1100') {
      const prerreqs = datos ? datos.split(',').map(p => p.trim()) : [];
      const cumplePrerreqs = prerrequisitosCumplidos(prerreqs);
      const cumpleFofus = contarFOFUs() >= (parseInt(fofusMin) || 0);
      const cumpleOptativos = contarOptativos() >= (parseInt(optativosMin) || 0);
      if (!(cumplePrerreqs && cumpleFofus && cumpleOptativos)) habilitado = false;
    }

    boton.disabled = !habilitado;
    boton.setAttribute('data-bloqueado', (!habilitado).toString());
  });
}

function lanzarFuegosArtificiales() {
  for (let i = 0; i < 25; i++) {
    const estallido = document.createElement('div');
    estallido.classList.add('fuego-artificial');

    const size = Math.random() * 12 + 8;
    const left = Math.random() * window.innerWidth;
    const top = Math.random() * window.innerHeight;

    estallido.style.width = `${size}px`;
    estallido.style.height = `${size}px`;
    estallido.style.left = `${left}px`;
    estallido.style.top = `${top}px`;

    document.body.appendChild(estallido);
    setTimeout(() => estallido.remove(), 900);
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

    lanzarFuegosArtificiales();
    actualizarEstadoRamos();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  calcularCreditosTotales();
  actualizarEstadoRamos();
  document.querySelectorAll('.ramo').forEach(boton => {
    boton.addEventListener('click', () => {
      if (boton.getAttribute('data-bloqueado') !== 'true') {
        aprobarRamo(boton);
      }
    });
  });
});
