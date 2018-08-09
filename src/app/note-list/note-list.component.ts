import { Note } from './../note';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  inputs: ["notes" ],
  outputs: ["SelectNote"]
})
export class NoteListComponent implements OnInit {

  public SelectNote = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(note: Note){
    this.SelectNote.emit(note);
  }

}
