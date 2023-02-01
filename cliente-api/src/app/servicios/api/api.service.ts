import { Injectable } from '@angular/core';
import { LoginI } from 'src/app/modelos/login.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListaProductosI } from 'src/app/modelos/listaproductos.interface';
import { Producto } from 'src/app/modelos/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

url = 'http://localhost:5000/api';

  constructor(private http:HttpClient) { }

  loginByEmail(form: LoginI):Observable<ResponseI>{
    let direccion = this.url + '/Autenticacion/validar';
    return this.http.post<ResponseI>(direccion, form);
}


//get listaproductos
getAllProductos():Observable<ListaProductosI>{
  let direccion = this.url + '/Producto/lista';
  return this.http.get<ListaProductosI>(direccion);

}

getSingleProducto(id:any):Observable<ListaProductosI>{
  let direccion = this.url + '/Producto/obtener/' + id;
  return  this.http.get<ListaProductosI>(direccion);
}

}
