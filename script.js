<script>
  function lanzarChalla() {
    for (let i = 0; i < 1200; i++) {
      const papelito = document.createElement('div');
      papelito.classList.add('challa-papelito');

      const startX = Math.random() * window.innerWidth;
      const startY = -(Math.random() * 150 + 50);

      const colores = ['#fff000', '#0000ff', '#00ff40', '#ff00ff', '#ff9d00'];
      papelito.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
      papelito.style.width = `${Math.random() * 10 + 6}px`;
      papelito.style.height = `${Math.random() * 14 + 8}px`;
      papelito.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
      papelito.style.left = `${startX}px`;
      papelito.style.top = `${startY}px`;
      papelito.style.animation = `caer-challa ${2 + Math.random() * 3}s ease-out forwards`;

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
</script>
