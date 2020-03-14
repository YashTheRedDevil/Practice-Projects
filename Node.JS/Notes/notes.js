const fs=require('fs');

function getNotes()
{
    console.log('Your Notes...');
}

function addNote(title,body)
{
    var notes=loadNotes();
    const duplicateNotes=notes.filter(function(note){
        return note.title===title?true:false;
    });

    if(duplicateNotes.length===0)
    {
        notes.push({
            title:title,
            body:body
        });
    
        saveNotes(notes);
        console.log('Note has been added!');
    }
    else
    {
        console.log('Note title has been taken!');
    }
}


const saveNotes=function(notes)
{
    const dataJSON=JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes=function()
{
    try{
        var data=fs.readFileSync('notes.json');
        var dataJSON=data.toString();
        return JSON.parse(dataJSON);
    }
    catch(e)
    {
        return [];
    }     
}

module.exports={
    getNotes:getNotes,
    addNote:addNote
};