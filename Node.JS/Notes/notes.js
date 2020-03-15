const fs=require('fs');
const chalk=require('chalk');


const addNote=(title,body)=>
{
    var notes=loadNotes();
    //const duplicateNotes=notes.filter((note)=>note.title===title);        
    const duplicateNote=notes.find((note)=>note.title===title);

    if(!duplicateNote)
    {
        notes.push({
            title:title,
            body:body
        });
    
        saveNotes(notes);
        console.log(chalk.green('Note has been added!'));
    }
    else
    {
        console.log(chalk.red('Note title has been taken!'));
    }
}

const removeNote=(title)=>
{
    var notes=loadNotes();
    const duplicateNotes=notes.filter((note)=>note.title===title);

    if(duplicateNotes.length!==0)
    {
        notes=notes.filter(x=>x.title!==title);
        saveNotes(notes);
        console.log(chalk.green('Note has been removed!'));
    }
    else
    {        
        console.log(chalk.red('No Note found!'));
    }
}

const readNote=(title)=>
{
    var notes=loadNotes();
    const note=notes.find((note)=>note.title===title);

    if(note)
    {
        console.log(chalk.green('Title:'+note.title)+'\nBody: '+note.body);
    }
    else
    {
        console.log(chalk.red('No Note Found'));
    }
}


const listNotes=()=>
{
    var notes=loadNotes();
    console.log(chalk.green('Your Notes...'));
    notes.forEach(note => {
        console.log('Title: '+note.title);
    });
}

const saveNotes=(notes)=>
{
    const dataJSON=JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes=()=>
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
    listNotes:listNotes,
    addNote:addNote,
    removeNote:removeNote,
    readNote:readNote
};