let creditosTotales = 0;

function contarFOFUs() {
  return Array.from(document.querySelectorAll('.ramo.fundamental'))
    .filter(r => r.classList.contains('aprobado')).length;
}

function contarOptativos() {
  return Array.from(document.querySelectorAll('.ramo.optativo'))
    .filter(r => r.classList.contains('aprobado')).length;
}

function contarCreditosMallaPrincipal() {
  return Array.from(document.querySelectorAll('.ramo'))
    .filter(r => !r.classList.contains('fundamental') && !r.classList.contains('optativo'))
    .filter(r => r.classList.contains('aprobado'))
    .reduce((acc, r) => acc + (parseInt(r.dataset.creditos) || 0), 0);
}

function prerrequisitosCumplidos(listaIDs) {
  return listaIDs.every(id => {
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
      const prereqs = datos.split(',').map(id => id.trim());
      if (!prerrequisitosCumplidos(prereqs)) habilitado = false;
    }

    if (creditosMin && contarCreditosMallaPrincipal() < parseInt(creditosMin)) habilitado = false;
    if (fofusMin && contarFOFUs() < parseInt(fofusMin)) habilitado = false;
    if (optativosMin && contarOptativos() < parseInt(optativosMin)) habilitado = false;

    if (boton.id === "DER1100") {
      const memoria = document.getElementById("DER1096");
      if (!memoria || !memoria.classList.contains("aprobado")) habilitado = false;
    }

    const tieneCondicion = datos || creditosMin || fofusMin || optativosMin || boton.id === "DER1100";
    const esLibre = boton.classList.contains("fundamental") || boton.classList.contains("optativo");
    if (!tieneCondicion && !esLibre) habilitado = false;

    boton.disabled = !habilitado;
    boton.setAttribute('data-bloqueado', (!habilitado).toString());
  });
}

function lanzarFuegosArtificiales() {
  for (let i = 0; i < 25; i++) {
    const estallido = document.createElement('div');
    estallido.classList.add('fuego-artificial');
    const size = Math.random() * 12 + 8;
    estallido.style.width = `${size}px`;
    estallido.style.height = `${size}px`;
    estallido.style.left = `${Math.random() * window.innerWidth}px`;
    estallido.style.top = `${Math.random() * window.innerHeight}px`;
    document.body.appendChild(estallido);
    setTimeout(() => estallido.remove(), 900);
  }
}

function aprobarRamo(boton) {
  if (!boton.classList.contains('aprobado')) {
    boton.classList.add('aprobado', 'destacado');
    const creditos = parseInt(boton.dataset.creditos) || 0;
    creditosTotales += creditos;
    setTimeout(() => boton.classList.remove('destacado'), 1000);
    lanzarFuegosArtificiales();
    setTimeout(() => actualizarEstadoRamos(), 50);
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
