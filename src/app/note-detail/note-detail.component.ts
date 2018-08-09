import { Note } from './../note';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
  inputs: ["note"],
  outputs: ["updateNoteEvent", "deleteNoteEvent"]
})
export class NoteDetailComponent implements OnInit {
  note: any;

  private editNote: boolean = false;
  private updateNoteEvent = new EventEmitter();
  private deleteNoteEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(){
    this.editNote = false;
  }

  onEditClick(){
    this.editNote = true;
  }

  updateNote(){
    this.updateNoteEvent.emit(this.note);
    this.editNote = false;
  }

  deleteNote(){
    this.deleteNoteEvent.emit(this.note);
    this.editNote = false;
  }

}
