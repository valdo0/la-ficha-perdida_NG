import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    this.createAdmin();
  }

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

  getSesion():any{
    const data=localStorage.getItem('sesion');
    return data ? JSON.parse(data):null;
  }
  isAdmin():boolean{
    const user = this.getSesion();
    return user?.role === 'admin'
  }
  isLoggedIn():boolean{
    return !!this.getSesion();
  }
  logout(){
    localStorage.removeItem('sesion');
  }
  getAllUsers():any{
    const data =localStorage.getItem('usuarios');
    return data ? JSON.parse(data):null;
  }
}
