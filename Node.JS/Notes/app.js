const fs=require('fs');
const chalk=require('chalk');
const yargs=require('yargs');
const notes=require('./notes');


yargs.command({
    command:'add',
    describe:'Add a new note.',
    builder:{
        title:{
            describe:'Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:'Note body',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv)
        {
            notes.addNote(argv.title,argv.body);
        }
});

yargs.command({
    command:'remove',
    describe:'Remove a note.',
    builder:{
        title:{
            describe:'Title of a Note to be removed',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv)
        {
            notes.removeNote(argv.title);
            // console.log('Removing a note!!!');        
        }
});

yargs.command({
    command:'read',
    describe:'Read a notes.',
    builder:{
        title:{
            describe:'Title of a note to be read',
            demandOption:true,
            type:'string'
        }
    },
    handler(argv)
        {
            notes.readNote(argv.title);
            //console.log('Reading a note!!!');        
        }
});

yargs.command({
    command:'list',
    describe:'List out all note.',
    handler()
        {
            notes.listNotes();
            //console.log('Listing out all notes!!!');        
        }
});



yargs.parse(); //OR console.log(yargs.argv);