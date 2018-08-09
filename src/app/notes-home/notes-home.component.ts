
import { NoteService } from './../note.service';
import { Note } from './../note';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-home',
  templateUrl: './notes-home.component.html',
  styleUrls: ['./notes-home.component.css'],
  providers: [NoteService]
})
export class NotesHomeComponent implements OnInit {

  notes: Array<Note>;

  selectedNote: Note;
  private hidenewNote: boolean = true;

  constructor(private _noteService: NoteService) { }

  ngOnInit() {
    this._noteService.getNotes().subscribe(resNoteData => this.notes = resNoteData);
  }

  onSelectNote(note:any){
    this.selectedNote = note;
    this.hidenewNote = true;
    console.log("selecte note = "+ this.selectedNote );
  }
  
  onSubmitAddNote(note:Note){
    this._noteService.addNotes(note)
    .subscribe(resNewNote => {
      this.notes.push(resNewNote);
      this.hidenewNote = true;
      this.selectedNote = resNewNote;
    })
  }

  onUpdateNoteEvent(note:any){
    this._noteService.updateNotes(note).subscribe(resUpdatedNote => note = resUpdatedNote);
    this.hidenewNote = true;
    this.selectedNote = note;
  }

  onDeleteNoteEvent(note:any){
    let noteArray = this.notes;
    this._noteService.deleteNotes(note)
    .subscribe(resDeletedNote => {
      for(let i=0; i < noteArray.length; i++)
        {
          if(noteArray[i]._id === note._id)
            {
              noteArray.splice(i,1);
            }
        }
    });
      this.selectedNote = null;
  }

  newNote(){
    this.hidenewNote = false;
  }

}
