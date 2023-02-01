import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Router } from '@angular/router';
import { ListaProductosI } from 'src/app/modelos/listaproductos.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { Producto } from 'src/app/modelos/producto.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  //crea una lista de tipo any
  productos: Producto []= [];



  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.getAllProductos().subscribe(data => {
      console.log(data);
      let response: ListaProductosI = data;
      this.productos = response.response;
    })
  }

  editarProducto(producto: Producto){
    this.router.navigate(['editar', producto.idProducto]);
  }

  agregarProducto(){
    this.router.navigate(['nuevo']);
  }

}
