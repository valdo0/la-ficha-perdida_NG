import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import {Chart,BarController,BarElement,CategoryScale,LinearScale,Title,Tooltip,Legend,ArcElement,DoughnutController,PieController} from 'chart.js';
Chart.register(BarController,BarElement,CategoryScale,LinearScale,Title,Tooltip,Legend,ArcElement,DoughnutController,PieController);
/**
 * @description 
 * Componente para el panel de administración, que permite gestionar usuarios.
 * Incluye funcionalidades para agregar, editar y eliminar usuarios,
 * así como cambiar entre diferentes pestañas de administración.
 */


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
/**
 * @class AdminPanelComponent
 * @implements OnInit
 */
export class AdminPanelComponent implements OnInit {
  /**
   * @description
   * Identificador de la pestaña activa en el panel de administración.
   * Por defecto, se establece en 'usuarios', lo que significa que la pestaña de usuarios está activa al iniciar el componente.
   */
  tabActivo: string = 'usuarios';
  /**
   * @description
   * Lista de usuarios que se gestionan en el panel de administración.
   * Esta propiedad se inicializa como un array vacío y se llenará con los datos de los usuarios.
   */
  usuarios: any[] = [];
  /**
   * @description
   * Índice del usuario que se está editando en el panel de administración.
   * Se utiliza para identificar qué usuario se está modificando cuando se abre el modal de edición.
   * Inicialmente es null, lo que indica que no hay ningún usuario en edición.
   */
  editIndex: number | null = null;
  /**
   * @description
   * Gráfico de ventas que se renderiza en la pestaña de métricas del panel de administración.
   * Esta propiedad se inicializa como 'any' para permitir cualquier tipo de gráfico de Chart.js.
   */
  chart: any;
  /**
   * @description
   * Gráfico de productos más vendidos que se renderiza en la pestaña de métricas del panel de administración.
   * Esta propiedad se inicializa como 'any' para permitir cualquier tipo de gráfico de Chart.js.
   */
  chartProductos: any;
  /**
   * @description
   * Formulario reactivo para gestionar los datos del usuario que se está creando o editando.
   * Utiliza FormBuilder para definir los controles y validaciones del formulario.
   */
  usuarioForm!: FormGroup;
/**
 * @description
 * Constructor del componente AdminPanelComponent.
 * @param authService - Servicio de autenticación para gestionar usuarios.
 * @param fb - FormBuilder para crear formularios reactivos.
 */
  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}
/**
 * @description
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 */
  ngOnInit() {
    this.cargarUsuarios();
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      tipo: ['usuario', Validators.required]
    });
  }

  /**
   * Activa una pestaña específica en el panel de administración estableciendo el identificador de la pestaña activa.
   *
   * @param tab - El identificador de la pestaña que se desea activar.
   */
  activarTab(tab: string) {
    this.tabActivo = tab;
    if (tab === 'metricas') {
      setTimeout(() => {
        this.renderizarGraficoVentas();
        this.renderizarGraficoProductos();
      }, 100);
    }
  }
  

  /**
   * Carga la lista de usuarios desde el servicio de autenticación.
   * 
   * Este método utiliza el servicio `authService` para obtener todos los usuarios.
   * Si el resultado es un array, se asigna directamente a la propiedad `usuarios`.
   * Si el resultado es un observable, se suscribe a él y asigna los datos recibidos
   * a la propiedad `usuarios`.
   * 
   * @remarks
   * Este método maneja tanto resultados síncronos como asíncronos del servicio.
   * 
   * @example
   * // Ejemplo de uso:
   * this.cargarUsuarios();
   * console.log(this.usuarios); // Muestra la lista de usuarios cargados.
   */
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

  /**
   * Abre un modal para editar un usuario específico.
   * 
   * @param index - El índice del usuario en la lista de usuarios que se desea editar.
   * 
   * Este método establece el índice del usuario que se está editando, 
   * obtiene los datos del usuario correspondiente de la lista `usuarios` 
   * y actualiza el formulario `usuarioForm` con los valores del usuario seleccionado.
   * Luego, muestra un modal de edición utilizando Bootstrap.
   */
  editarUsuario(index: number) {
    this.editIndex = index;
    const usuario = this.usuarios[index];
    this.usuarioForm.patchValue({
      nombre: usuario.nombre,
      email: usuario.email,
      username: usuario.username,
      tipo: usuario.role || usuario.tipo
    });

    const modal = new (window as any).bootstrap.Modal(document.getElementById('modalEditarUsuario')!);
    modal.show();
  }

  /**
   * Maneja la acción de guardar los cambios realizados a un usuario en el panel de administración.
   * 
   * Este método se activa cuando el usuario confirma las ediciones en el modal de edición de usuario.
   * Valida el formulario, actualiza los datos del usuario en el array local y llama al servicio 
   * de autenticación para persistir los cambios. Finalmente, cierra el modal y reinicia el índice de edición.
   * 
   * @remarks
   * - El método asume que `this.editIndex` está configurado con el índice del usuario que se está editando.
   * - El formulario `usuarioForm` debe ser válido para que los cambios se guarden.
   * - La instancia del modal de Bootstrap se accede directamente a través del objeto global `window`.
   * 
   * @throws No lanza errores, pero depende de la validez de `usuarioForm` y de la presencia de 
   *         una instancia válida del modal.
   */
  guardarCambios() {
    if (this.editIndex !== null && this.usuarioForm.valid) {
      const updatedUser = this.usuarioForm.value;
      this.usuarios[this.editIndex] = updatedUser;
      this.authService.updateUser(this.editIndex, updatedUser);
      const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('modalEditarUsuario')!);
      modal?.hide();
      this.editIndex = null;
    }
  }
  

  /**
   * Elimina un usuario de la lista de usuarios basado en el índice proporcionado.
   *
   * @param index - El índice del usuario que se desea eliminar de la lista.
   */
  eliminarUsuario(index: number) {
    this.usuarios.splice(index, 1);
  }
/**
 * 
 * @returns void
 * @description
 * Renderiza un gráfico de ventas utilizando Chart.js.
 * Obtiene los datos de ventas del almacenamiento local, filtra por el año actual,
 * y agrupa las ventas por mes.
 * Muestra un gráfico de tipo "bar" con los meses del año y las ventas totales por mes.
 */
  renderizarGraficoVentas() {
    const ventasRaw = localStorage.getItem('ventas');
    const ventas = ventasRaw ? JSON.parse(ventasRaw) : [];
    const ventasPorMes = new Array(12).fill(0);
    const anioActual = new Date().getFullYear();

    ventas.forEach((venta: any) => {
      const fecha = new Date(venta.fecha);
      if (fecha.getFullYear() === anioActual) {
        const mes = fecha.getMonth(); // 0-11
        ventasPorMes[mes] += venta.total;
      }
    });

    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses,
        datasets: [{
          label: 'Ventas por mes',
          data: ventasPorMes,
          backgroundColor: '#0d6efd'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: `Ventas en ${anioActual}`
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (tickValue: string | number) => typeof tickValue === 'number' ? '$' + tickValue : tickValue
            }
          }
        }
      }
    });
  }
/**
 * @description
 * Renderiza un gráfico de productos más vendidos utilizando Chart.js.
 * Obtiene los datos de ventas del almacenamiento local, filtra por el año actual,
 * y cuenta la cantidad de cada producto vendido.
 * Muestra un gráfico de tipo "pie" con los productos y sus cantidades.
 */
  renderizarGraficoProductos() {
    const ventasRaw = localStorage.getItem('ventas');
    const ventas = ventasRaw ? JSON.parse(ventasRaw) : [];
    const anioActual = new Date().getFullYear();
  
    const conteoProductos: Record<string, number> = {};
  
    ventas.forEach((venta: any) => {
      const fecha = new Date(venta.fecha);
      if (fecha.getFullYear() === anioActual) {
        venta.productos.forEach((producto: any) => {
          const nombre = producto.nombre;
          if (!conteoProductos[nombre]) {
            conteoProductos[nombre] = 0;
          }
          conteoProductos[nombre] += producto.cantidad || 1;
        });
      }
    });
  
    const labels = Object.keys(conteoProductos);
    const data = Object.values(conteoProductos);
  
    // Colores base
    const backgroundColors = [
      '#0d6efd', '#6f42c1', '#20c997', '#ffc107', '#dc3545',
      '#198754', '#6610f2', '#fd7e14', '#0dcaf0', '#adb5bd'
    ];
  
    if (this.chartProductos) {
      this.chartProductos.destroy();
    }
  
    const ctx = document.getElementById('productsChart') as HTMLCanvasElement;
    if (!ctx) return;
  
    this.chartProductos = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors.slice(0, labels.length)
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Productos más vendidos'
          }
        }
      }
    });
  }
  
}
