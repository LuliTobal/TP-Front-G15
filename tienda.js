const { createApp } = Vue

createApp({
  data() {
    return {
      url: "https://cac-24176-tp-grupo15-default-rtdb.firebaseio.com/products.json",
      products: [],
      carrito: [],
      filtrados: [],
      filtros: [],
      error: false,
      carritoVisible: false,
      precioMinimo: '',
      precioMaximo: '',
      paginaActual: 1,
      productosPorPagina: 10,
      dropdowns: {
        categoria: false,
        genero: false,
        talle: false,
        precio: false
      }
    }
  },
  computed: {
    totalCarrito() {
      return this.carrito.reduce((total, item) => total + item.cantidad, 0);
    },
    subtotal() {
      return this.carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);
    },
    total() {
      return this.subtotal;
    },
    totalPaginas() {
      return Math.ceil(this.filtrados.length / this.productosPorPagina);
    },
    productosPaginados() {
      const inicio = (this.paginaActual - 1) * this.productosPorPagina;
      const fin = inicio + this.productosPorPagina;
      return this.filtrados.slice(inicio, fin);
    },
    paginasVisibles() {
      const paginas = [];
      if (this.totalPaginas <= 5) {
        for (let i = 1; i <= this.totalPaginas; i++) {
          paginas.push(i);
        }
      } else {
        if (this.paginaActual <= 3) {
          paginas.push(1, 2, 3, '...', this.totalPaginas);
        } else if (this.paginaActual >= this.totalPaginas - 2) {
          paginas.push(1, '...', this.totalPaginas - 2, this.totalPaginas - 1, this.totalPaginas);
        } else {
          paginas.push(1, '...', this.paginaActual, '...', this.totalPaginas);
        }
      }
      return paginas;
    }
  },
  methods: {
    async fetchData(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.products = data;
        this.productosAlIniciar();
      } catch (error) {
        this.error = true;
      }
    },
    productosAlIniciar() {
      this.filtrados = [...this.products];
    },
    addToCart(product) {
      let encontrado = this.carrito.find(item => item.id === product.id);

      if (encontrado) {
        encontrado.cantidad++;
      } else {
        this.carrito.push({ ...product, cantidad: 1 });
      }
      this.guardarCarrito();
    },
    guardarCarrito() {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    },
    recuperarCarrito() {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado);
      }
    },
    mostrarCarrito() {
      this.carritoVisible = true;
    },
    cerrarCarrito() {
      this.carritoVisible = false;
    },
    limpiarCarrito() {
      this.carrito = [];
      this.guardarCarrito();
    },
    removeFromCart(index) {
      this.carrito.splice(index, 1);
      this.guardarCarrito();
    },
    cambiarCantidad(index, opcion) {
      const item = this.carrito[index];
      if (opcion === 'incrementar') {
        item.cantidad++;
      } else if (opcion === 'decrementar' && item.cantidad > 0) {
        item.cantidad--;
      }
      this.guardarCarrito();
    },
    comprar() {
      this.carritoVisible = false;
      Swal.fire({
        title: 'Procesando compra...',
        timer: 3000,
        background: '#222222',
        customClass: {
          title: 'swal2-personalizar-texto',
        },
        didOpen: () => {
          Swal.showLoading();
        }
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Compra realizada',
          text: '¡Gracias por tu compra!',
          confirmButtonText: 'Aceptar',
          background: '#222222',
          customClass: {
            title: 'swal2-personalizar-texto',
            confirmButton: 'swal2-personalizar-boton'
          }
        });
      });
      this.limpiarCarrito();
    },
    handleFilterClick(tipo, valor) {     
      const filtroExistente = this.filtros.find(filtro => filtro.tipo === tipo && filtro.valor === valor);

      if (!filtroExistente) {
        this.filtros.push({ tipo, valor });
        this.paginaActual = 1;
      }
    },
    handlePriceChange() {
      const precioMin = Number(this.precioMinimo);
      const precioMax = Number(this.precioMaximo);

      const filtroMin = this.filtros.find(filtro => filtro.tipo === 'mayor');
      if (filtroMin) {
        filtroMin.valor = precioMin ? precioMin : '';
      } else if (precioMin) {
        this.filtros.push({ tipo: 'mayor', valor: precioMin });
      }

      const filtroMax = this.filtros.find(filtro => filtro.tipo === 'menor');
      if (filtroMax) {
        filtroMax.valor = precioMax ? precioMax : '';
      } else if (precioMax) {
        this.filtros.push({ tipo: 'menor', valor: precioMax });
      }
      this.paginaActual = 1;
    },
    removeFilter(index) {
      if (this.filtros[index].tipo === 'mayor') {
        this.precioMinimo = '';
        this.$refs.precioMinimoInput.value = '';
      } else if (this.filtros[index].tipo === 'menor') {
        this.precioMaximo = '';
        this.$refs.precioMaximoInput.value = '';
      }
      this.filtros.splice(index, 1);
      this.paginaActual = 1;
    },
    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina;
      }
    },
    toggleDropdown(filterType) {
      if (window.innerWidth >= 993) {
        this.dropdowns[filterType] = true;
      } else {
        this.dropdowns[filterType] = !this.dropdowns[filterType];
      }
    }
  },
  watch: {
    filtros: {
      deep: true,
      handler() {
        this.filtrados = this.products.filter(producto => {
          return this.filtros.every(filtro => {
            if(filtro.tipo === 'categoria'){
              return producto.category === filtro.valor;
            }
            if(filtro.tipo === 'genero'){
              return producto.gender === filtro.valor;
            }
            if(filtro.tipo === 'talle'){
              return producto.size.includes(filtro.valor);
            }
            if(filtro.tipo === 'menor'){
              return producto.price <= Number(filtro.valor);
            }
            if(filtro.tipo === 'mayor'){
              return producto.price >= Number(filtro.valor);
            }
            return true;
          });
        });
        this.paginaActual = 1;
      }
    },
  },
  created() {
    this.fetchData(this.url);
    this.recuperarCarrito();
    if (window.innerWidth >= 993) {
      this.dropdowns = {
        categoria: true,
        genero: true,
        talle: true,
        precio: true
      };
    }
  }
}).mount('#app');
