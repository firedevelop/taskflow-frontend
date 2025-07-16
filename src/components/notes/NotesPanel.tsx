import { Task } from "../../types";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
    notes: Task['notes']
}

const NotesPanel = ({ notes }: NotesPanelProps) => {
    return (
        <>
            <AddNoteForm />

            <div className="divide-y divide-gray-100 mt-10">
                {notes.length ? (
                    <>
                        <p className="font-bold text-2xl text-slate-600 my-5">Notas: </p>
                        {notes.map(note => (
                            <NoteDetail 
                                key={note._id} 
                                note={note} 
                            />
                        ))}
                    </>
                ) : <p>No hay notas</p>}
            </div>
        </>
    )
}

export default NotesPanel;