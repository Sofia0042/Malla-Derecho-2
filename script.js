// ✅ Verifica si todos los prerrequisitos están aprobados
function prerrequisitosCumplidos(prerrequisitos) {
  return prerrequisitos.every(id => {
    const ramo = document.getElementById(id);
    return ramo && ramo.classList.contains('aprobado');
  });
}

// 🔁 Actualiza el estado de todos los ramos según sus prerrequisitos
function actualizarEstadoRamos() {
  const todosLosRamos = document.querySelectorAll('.ramo');

  todosLosRamos.forEach(boton => {
    if (boton.classList.contains('aprobado')) {
      boton.disabled = false;
      boton.setAttribute('data-bloqueado', 'false');
      return;
    }

    const datos = boton.dataset.prerrequisitos;
    if (datos) {
      const prerrequisitos = datos.split(',').map(p => p.trim());
      const habilitado = prerrequisitosCumplidos(prerrequisitos);
      boton.disabled = !habilitado;
      boton.setAttribute('data-bloqueado', habilitado ? 'false' : 'true');
    } else {
      boton.disabled = false;
      boton.setAttribute('data-bloqueado', 'false');
    }
  });
}

// 🚀 Aprueba un ramo con animación y challa digital
function aprobarRamo(boton) {
  boton.classList.add('aprobado', 'destacado');
  boton.disabled = false;
  boton.setAttribute('data-bloqueado', 'false');

  // 🌟 Brillo visual
  setTimeout(() => {
    boton.classList.remove('destacado');
  }, 1000);

  // 🎉 Crea challa flotante
  const challa = document.createElement('div');
  challa.classList.add('challa');
  challa.textContent = '🎉';
  document.body.appendChild(challa);

  const rect = boton.getBoundingClientRect();
  challa.style.left = `${rect.left + rect.width / 2}px`;
  challa.style.top = `${rect.top + window.scrollY}px`;

  setTimeout(() => {
    challa.remove();
  }, 1200);

  actualizarEstadoRamos();
}

// 📦 Inicializa el sistema
document.addEventListener('DOMContentLoaded', () => {
  actualizarEstadoRamos();

  const todosLosRamos = document.querySelectorAll('.ramo');
  todosLosRamos.forEach(boton => {
    boton.addEventListener('click', () => {
      if (boton.getAttribute('data-bloqueado') !== 'true') {
        aprobarRamo(boton);
      }
    });
  });
});
