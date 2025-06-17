import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  tabActivo: string = 'usuarios';
  usuarios: any[] = [];
  usuarioEditando: any = {};
  editIndex: number | null = null;

  constructor(private authService: AuthService) {}


  ngOnInit() {
    this.cargarUsuarios();
  }
  activarTab(tab: string) {
    this.tabActivo = tab;
  }


  cargarUsuarios() {
    const resultado = this.authService.getAllUsers();
    if (Array.isArray(resultado)) {
      this.usuarios = resultado;
    } else if ('subscribe' in resultado) {
      resultado.subscribe((data: any[]) => {
        this.usuarios = data;
      });
    }
  }
  guardarCambios() {
    if (this.editIndex !== null) {
      this.usuarios[this.editIndex] = { ...this.usuarioEditando };
      this.editIndex = null;
    }
    const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('modalEditarUsuario')!);
    modal?.hide();
  }

  eliminarUsuario(index: number) {
    this.usuarios.splice(index, 1);
  }
  editarUsuario(index: number) {
    this.editIndex = index;
    this.usuarioEditando = { ...this.usuarios[index] };
    const modal = new (window as any).bootstrap.Modal(document.getElementById('modalEditarUsuario')!);
    modal.show();
  }
}
