// 🌐 Función para verificar si todos los prerrequisitos están aprobados
function prerrequisitosCumplidos(prerrequisitos) {
  return prerrequisitos.every(id => document.getElementById(id).classList.contains('aprobado'));
}

// 🔁 Función para actualizar estado de los botones
function actualizarEstadoRamos() {
  document.querySelectorAll('.ramo').forEach(boton => {
    const datos = boton.dataset.prerrequisitos;
    if (datos) {
      const prerrequisitos = datos.split(',');
      const habilitado = prerrequisitosCumplidos(prerrequisitos);
      boton.setAttribute('data-bloqueado', !habilitado);
      boton.disabled = !habilitado;
    }
  });
}

// ✅ Al hacer clic, se aprueba el ramo
function aprobarRamo(boton) {
  boton.classList.add('aprobado');
  boton.disabled = true;
  actualizarEstadoRamos();
}

// 🚀 Inicializador
document.addEventListener('DOMContentLoaded', () => {
  // 👆 Bloquear todos los que tienen prerrequisitos
  actualizarEstadoRamos();

  // 🔊 Escuchar clic en cada ramo
  document.querySelectorAll('.ramo').forEach(boton => {
    boton.addEventListener('click', () => {
      if (boton.getAttribute('data-bloqueado') !== 'true') {
        aprobarRamo(boton);
      }
    });
  });
});
