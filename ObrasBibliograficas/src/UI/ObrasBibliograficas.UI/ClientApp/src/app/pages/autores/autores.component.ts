import { Component, OnInit } from '@angular/core';
import { AutorService } from 'src/app/core/services/autor/autor.service';
import { AutorViewModel } from 'src/app/core/models/autor-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { stringify } from 'querystring';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalEdicaoComponent } from './modal-edicao/modal-edicao.component';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit {

  autores : AutorViewModel [] = [];
  formAutor : FormGroup;

  constructor(
    private _autorService : AutorService,
    private formBuilder : FormBuilder,
    private modalService : NgbModal
  ) { }

  ngOnInit() {
    this.getAutores();
    this.initializeForm();
  }

  getAutores(){
    this._autorService.getAutores().subscribe((resp:AutorViewModel[]) => {
      this.autores = resp;
    });
  }

  initializeForm(){
    let autor = new AutorViewModel();
    this.formAutor = this.formBuilder.group({
      Id : [autor.Id],
      Nome : [autor.Nome]
    })
  }

  insertAutor(autor : AutorViewModel){
    autor.Id = 0;
    this._autorService.postAutor(autor).subscribe((resp:any) => {
      this.formAutor.reset();
      this.getAutores();
    })
  }

  updateAutor(autor:AutorViewModel){
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
    }
    const modal = this.modalService.open(ModalEdicaoComponent, ngbModalOptions);

    modal.componentInstance.autor = autor;

    modal.componentInstance.autorEditado.subscribe((resp:any) => {
      this.autores = null;
      this.getAutores();
    });
  }

  deleteAutor(id:number){
    this._autorService.deleteAutor(id).subscribe((resp:any) => {
      this.autores = null;
      this.getAutores();
    });
  }

  nomeFormatado(nome:string) : string{
    let primeiroNome : string;
    let sobrenome : string;
    let geracao : string;
    let retorno : string;
    let nomeSeparado = nome.split(" ");
    
    //Se houver apenas o primeiro nome
    if(nomeSeparado.length === 1){
      return nome.toLocaleUpperCase();
    }

    primeiroNome = nomeSeparado[0].toLocaleLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toLocaleUpperCase(); });

    //Verifica se existe geracao no nome
    nomeSeparado.forEach(e => {
      if(e.toLocaleUpperCase() === "NETO" ||
         e.toLocaleUpperCase() === "NETA" ||
         e.toLocaleUpperCase() === "JUNIOR" ||
         e.toLocaleUpperCase() === "FILHO" ||
         e.toLocaleUpperCase() === "FILHA" ||
         e.toLocaleUpperCase() === "SOBRINHO" ||
         e.toLocaleUpperCase() === "SOBRINHA"){

        geracao = e.toLocaleUpperCase();

      }

      if(e.toLocaleLowerCase() === "da" ||
         e.toLocaleLowerCase() === "de" ||
         e.toLocaleLowerCase() === "do" ||
         e.toLocaleLowerCase() === "das" ||
         e.toLocaleLowerCase() === "dos"){
        primeiroNome = primeiroNome + " " + e.toLocaleLowerCase();
      }
    });

    //Se houver geracao o sobrenome pega a penultima posicao do array, se nao pega a ultima
    if(geracao != null && geracao != ""){
      sobrenome = nomeSeparado[nomeSeparado.length - 2] ? nomeSeparado[nomeSeparado.length - 2].toLocaleUpperCase() : "";
    }else{
      sobrenome = nomeSeparado[nomeSeparado.length - 1] ? nomeSeparado[nomeSeparado.length - 1].toLocaleUpperCase() : "";
    }

    if(geracao != null && geracao != ""){
      if(sobrenome == "" ||
         sobrenome.toLocaleLowerCase() == primeiroNome.toLocaleLowerCase()||
         sobrenome.toLocaleLowerCase() === "da" ||
         sobrenome.toLocaleLowerCase() === "de" ||
         sobrenome.toLocaleLowerCase() === "do" ||
         sobrenome.toLocaleLowerCase() === "das" ||
         sobrenome.toLocaleLowerCase() === "dos"){
        retorno = geracao + ", " + primeiroNome;
      }else{
        retorno = sobrenome + " " + geracao + ", " + primeiroNome;
      }
    }else{
      retorno = sobrenome + ", " + primeiroNome;
    }

    return retorno;
  }

}
