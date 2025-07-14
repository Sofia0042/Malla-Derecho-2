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
    // Si el ramo ya fue aprobado, no lo bloqueamos
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
      // Si no tiene prerrequisitos, está habilitado desde el inicio
      boton.disabled = false;
      boton.setAttribute('data-bloqueado', 'false');
    }
  });
}

// 🚀 Aprueba un ramo al hacer clic
function aprobarRamo(boton) {
  boton.classList.add('aprobado');
  boton.disabled = false;
  boton.setAttribute('data-bloqueado', 'false');
  actualizarEstadoRamos(); // Actualiza el resto después de aprobar
}

// 📦 Inicializa el sistema una vez que la página está lista
document.addEventListener('DOMContentLoaded', () => {
  actualizarEstadoRamos(); // Estado inicial

  // Escucha los clics en los ramos
  const todosLosRamos = document.querySelectorAll('.ramo');
  todosLosRamos.forEach(boton => {
    boton.addEventListener('click', () => {
      // Solo permite aprobar si no está bloqueado
      if (boton.getAttribute('data-bloqueado') !== 'true') {
        aprobarRamo(boton);
      }
    });
  });
});
