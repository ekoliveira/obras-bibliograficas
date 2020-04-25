import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AutorService } from 'src/app/core/services/autor/autor.service';
import { AutorViewModel } from 'src/app/core/models/autor-view-model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-edicao',
  templateUrl: './modal-edicao.component.html',
  styleUrls: ['./modal-edicao.component.css']
})
export class ModalEdicaoComponent implements OnInit {

  @Input() autor : AutorViewModel;
  @Output() autorEditado : EventEmitter<AutorViewModel> = new EventEmitter();
  formAutor : FormGroup;

  constructor(
    private _autorService : AutorService,
    private formBuilder : FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(){
    let autor = new AutorViewModel();
    this.formAutor = this.formBuilder.group({
      Id : [autor.Id],
      Nome : [autor.Nome]
    })
    this.formAutor.controls.Id.setValue(this.autor.Id);
    this.formAutor.controls.Nome.setValue(this.autor.Nome);
  }

  updateAutor(autor : AutorViewModel){
    this._autorService.putAutor(autor).subscribe((resp:any) => {
      this.autorEditado.emit(autor);
      this.activeModal.close();
    });
  }

}
