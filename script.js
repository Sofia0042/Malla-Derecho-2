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

// 🚀 Aprueba un ramo al hacer clic, con animación
function aprobarRamo(boton) {
  boton.classList.add('aprobado', 'destacado');
  boton.disabled = false;
  boton.setAttribute('data-bloqueado', 'false');

  // 🌟 Remueve el efecto brillante después de 1 segundo
  setTimeout(() => {
    boton.classList.remove('destacado');
  }, 1000);

  actualizarEstadoRamos();
}

// 📦 Inicializa el sistema una vez que la página está lista
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
