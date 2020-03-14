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
    handler:function(argv)
        {
            notes.addNote(argv.title,argv.body);
        }
});

yargs.command({
    command:'remove',
    describe:'Remove a note.',
    handler:function()
        {
            console.log('Removing a note!!!');        
        }
});

yargs.command({
    command:'read',
    describe:'Read a notes.',
    handler:function()
        {
            console.log('Reading a note!!!');        
        }
});

yargs.command({
    command:'list',
    describe:'List out all note.',
    handler:function()
        {
            console.log('Listing out all notes!!!');        
        }
});



yargs.parse(); //OR console.log(yargs.argv);