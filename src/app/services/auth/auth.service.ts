import { Injectable } from '@angular/core';

/**
 * @description
 * Servicio de autenticación para manejar el registro, inicio de sesión,
 * y gestión de usuarios en la aplicación.
 * Incluye funcionalidades para crear un usuario administrador por defecto,
 * validar credenciales de usuario, registrar nuevos usuarios,
 * y gestionar la sesión del usuario.
 */
@Injectable({
  providedIn: 'root'
})
/**
 * @description
 * Servicio de autenticación que maneja el registro, inicio de sesión,
 * y gestión de usuarios en la aplicación.
 * Incluye funcionalidades para crear un usuario administrador por defecto,
 * validar credenciales de usuario, registrar nuevos usuarios,
 * y gestionar la sesión del usuario.
 * También permite verificar si un usuario es administrador,
 * si está logueado, y obtener información del perfil del usuario.
 * Además, permite actualizar usuarios y cambiar contraseñas.
 * Los datos de los usuarios se almacenan en localStorage.
 * Este servicio es esencial para la seguridad y gestión de usuarios en la aplicación.  
 */
export class AuthService {
/**
 * @description
 * Constructor del servicio de autenticación.
 * Inicializa el servicio creando un usuario administrador por defecto
 * si no existe en localStorage.
 * Esto asegura que siempre haya un usuario administrador disponible
 * para gestionar la aplicación.
 */
  constructor() { 
    this.createAdmin();
  }
/**
 * @description
 * Método para crear un usuario administrador por defecto.
 * Verifica si ya existe un usuario con el nombre de usuario "admin".
 * Si no existe, crea un nuevo usuario administrador con credenciales predeterminadas
 * y lo guarda en localStorage.
 */
  private createAdmin() {
    const usuariosLS = localStorage.getItem("usuarios");
    let usuarios: any[] = [];
  
    if (usuariosLS) {
      usuarios = JSON.parse(usuariosLS);
    }
  
    const adminExist = usuarios.some(user => user.username === "admin");
  
    if (!adminExist) {
      const admin = {
        username: "admin",
        password: "admin123",
        role: "admin"
      };
      usuarios.push(admin);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      console.log("Usuario admin creado");
    }
  }

  /**
   * @description
   * Método para iniciar sesión de un usuario.
   * Verifica las credenciales y, si son correctas,
   * guarda la sesión del usuario en localStorage.
   * @param username Nombre de usuario
   * @param password Contraseña del usuario
   * @returns true si el inicio de sesión es exitoso, false en caso contrario
   */
  login(username:string,password:string): boolean {
    const usuariosLS = localStorage.getItem('usuarios');
    if(!usuariosLS) return false;

    const usuarios = JSON.parse(usuariosLS);
    const usuario = usuarios.find((u: any) => u.username === username && u.password === password);
    if(usuario){
      const sesion ={
        nombre:usuario.name,
        usuario:usuario.username,
        email:usuario.correo,
        role:usuario.role,
        logueado:true
      }
      console.log(sesion)
      localStorage.setItem('sesion', JSON.stringify(sesion))
      return true;
    }
    return false;
  }
  /**
   * @description
   * Método para registrar un nuevo usuario.
   * Verifica si el nombre de usuario o el correo electrónico ya están en uso.
   * Si no, agrega el nuevo usuario a la lista de usuarios y lo guarda en localStorage.
   * @param username Nombre de usuario
   * @param nombre Nombre completo del usuario
   * @param fecNacimiento Fecha de nacimiento del usuario
   * @param direccion Dirección del usuario
   * @param email Correo electrónico del usuario
   * @param pw Contraseña del usuario
   * @returns true si el registro es exitoso, false si el usuario ya existe
   */
  registrarUsuario(username:string,nombre:string,fecNacimiento:string,direccion:string,email:string,pw:string){
    const usuariosLS = localStorage.getItem('usuarios');
    if(!usuariosLS) return false;
    const usuarios = JSON.parse(usuariosLS);
    const usuario = usuarios.find((u:any)=>u.username===username || u.email===email);
    if(usuario){
      return false;
    }
    const newUsuario ={
      username:username,
      nombre:nombre,
      fecNacimiento:fecNacimiento,
      direccion:direccion,
      email:email,
      password:pw,
      role:'usuario'
    }
    usuarios.push(newUsuario);
    localStorage.setItem("usuarios",JSON.stringify(usuarios))
    return true;
  }
  /**
   * @description
   * Método para validar si un usuario existe.
   * Busca en la lista de usuarios si el nombre de usuario ya está registrado.
   * @param username Nombre de usuario a validar
   * @returns true si el usuario existe, false en caso contrario
   */
  getSesion():any{
    const data=localStorage.getItem('sesion');
    return data ? JSON.parse(data):null;
  }
  /**
   * @description
   * Método para verificar si un usuario es administrador.
   * Comprueba el rol del usuario almacenado en la sesión.
   * @returns true si el usuario es administrador, false en caso contrario
   */
  isAdmin():boolean{
    const user = this.getSesion();
    return user?.role === 'admin'
  }
  /**
   * @description
   * Método para verificar si un usuario está logueado.
   * Comprueba si hay una sesión activa en localStorage.
   * @returns true si el usuario está logueado, false en caso contrario
   */
  isLoggedIn():boolean{
    return !!this.getSesion();
  }
  /**
   * @description
   * Método para cerrar sesión del usuario.
   * Elimina la sesión del usuario de localStorage.
   */
  logout(){
    localStorage.removeItem('sesion');
  }
  /**
   * @description
   * Método para obtener todos los usuarios registrados.
   * Devuelve un array de usuarios o null si no hay usuarios.
   * @returns Array de usuarios o null
   */
  getAllUsers():any{
    const data =localStorage.getItem('usuarios');
    return data ? JSON.parse(data):null;
  }
  /**
   * @description
   * Método para actualizar un usuario específico.
   * Busca el usuario por su índice en la lista de usuarios y lo actualiza.
   * @param index Índice del usuario a actualizar
   * @param updatedUser Objeto con los datos actualizados del usuario
   */
  updateUser(index: number, updatedUser: any): void {
    const users = this.getAllUsers();
    if (index >= 0 && index < users.length) {
      users[index] = updatedUser;
      localStorage.setItem('usuarios', JSON.stringify(users));
    }
  }
  /**
   * @description
   * Método para cambiar la contraseña de un usuario.
   * Busca al usuario por su nombre de usuario y actualiza su contraseña.
   * @param username Nombre de usuario del usuario cuyo password se desea cambiar
   * @param newPassword Nueva contraseña para el usuario
   * @returns true si el cambio es exitoso, false si el usuario no existe
   */
  changePassword(username: string, newPassword: string): boolean {
    const usuariosLS = localStorage.getItem('usuarios');
    if (!usuariosLS) return false;
  
    const usuarios = JSON.parse(usuariosLS);
    const index = usuarios.findIndex((u: any) => u.username === username);
  
    if (index !== -1) {
      usuarios[index].password = newPassword;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      return true;
    }
  
    return false; 
  }
  /**
   * @description
   * Método para obtener el perfil del usuario actual.
   * Busca al usuario en la lista de usuarios utilizando el nombre de usuario almacenado en la sesión.
   * @returns Objeto con los datos del perfil del usuario o null si no se encuentra
   */
  getPerfil(): any {
    const sesion = this.getSesion();
    if (sesion) {
      const usuarios = this.getAllUsers();
      return usuarios.find((u: any) => u.username === sesion.usuario);
    }
    return null;
  }
}
