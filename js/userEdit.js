const { createApp } = Vue;

createApp({
  data() {
    return {
      user: {
        id: null,
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        email: '',
        username: '',
        password: '',
        confirm_password: '',
        image: '',
        imageFile: null // Añade esta línea para manejar el archivo de imagen
      },
      isEditable: false
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        let usuarioJSON = localStorage.getItem('usuario');
        let usuario = JSON.parse(usuarioJSON);

        let response = await fetch(`https://grupo15cac.pythonanywhere.com/api/users/${usuario.id}`);

        if (!response.ok) {
          throw new Error('Error al obtener datos del usuario');
        }

        let data = await response.json();

        this.user = data;
      } catch (error) {
        console.error('Error en fetchUserData:', error);
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.user.image = URL.createObjectURL(file);
      this.user.imageFile = file; // Guarda el archivo para enviarlo al servidor
    },
    async saveChanges() {
      const formData = new FormData();
      for (let key in this.user) {
        if (this.user[key] && key !== 'imageFile') {
          formData.append(key, this.user[key]);
        }
      }
      if (this.user.imageFile) {
        formData.append('image', this.user.imageFile);
      }

      try {
        const response = await fetch(`https://grupo15cac.pythonanywhere.com/api/users/${this.user.id}`, {
          method: 'PUT',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Error al guardar los cambios');
        }
        const data = await response.json();
        alert(data.Mensaje);
        delete this.user.imageFile;
        this.isEditable = false;
        await this.fetchUserData(); // Obtener los datos actualizados del usuario (opcional)
        localStorage.setItem('usuario', JSON.stringify(this.user));
        updateHeaderImage(this.user); // Actualizar la imagen del encabezado (opcional)
      } catch (error) {
        console.error('Error:', error);
      }
    },
    toggleEdit() {
      this.isEditable = !this.isEditable;
    }
  }
}).mount('#app');
