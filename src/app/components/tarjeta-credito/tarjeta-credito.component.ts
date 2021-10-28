import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { Tarjeta } from './tarjetas.model';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjetas:Tarjeta[]=[];

  form:FormGroup;

  accion:string = 'agregar';

  id:number|undefined;

 

  constructor(private fb:FormBuilder,
              private toastr: ToastrService,
              private _tarjetaService:TarjetaService) {

    this.form = this.fb.group({
      titular: ['',Validators.required],
      numeroTarjeta:['',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]],
      fechaExpiracion:['',[Validators.required,Validators.maxLength(5),Validators.minLength(5)]],
      cvv:['',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]]
    })
   }

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  guardarTarjeta(){

    
    const tarjeta:Tarjeta = {
      id:0,
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
      
    }

    if(this.id === undefined){
      // Agregamos una nueva tarjeta
      this._tarjetaService.saveTarjeta(tarjeta)
                        .subscribe(data => {
                          this.toastr.success('La tarjeta fue registrada con éxito.','Tarjeta Registrada');
                          this.obtenerTarjetas();
                          this.form.reset();
                        },error => {
                          this.toastr.error(error.statusText, 'tarjeta error')
                        });
    }else {
      // Editamos una tarjeta
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id,tarjeta)
                          .subscribe(data => {
                            this.form.reset();
                            this.accion = 'agregar';
                            this.id = undefined;
                            this.toastr.info('La tarjeta fue actualiza con éxito.','Tarjeta Actualizada ');
                            this.obtenerTarjetas();
                          }, error => {
                            this.toastr.error(error.statusText,'tarjeta error');  
                          })
    }
    
    
  }

  eliminarTarjeta(id:number){
      
    this._tarjetaService.deleteTarjeta(id)
                        .subscribe(data => {
                          this.toastr.error('La tarjeta fue eliminada con éxito.','Eliminar Registrada');
                          this.obtenerTarjetas();
                        }, error =>{
                          this.toastr.error(error.statusText,'tarjeta error');
                        });

  }

  obtenerTarjetas(){
    this._tarjetaService.getListTarjetas()
                        .subscribe(data => {
                          this.listTarjetas = data;
                        },error => {
                          console.log(error)
                        });
  }

  editartarjeta(tarjeta:Tarjeta){
    this.accion = 'editar';
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv

    })
   
  }

}
