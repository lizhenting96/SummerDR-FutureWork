import React from 'react';
import { ReactTerminal, ReactThemes } from 'react-terminal-component';
import {
   EmulatorState, 
   OutputFactory, 
   CommandMapping, 
   FileSystem,
   Outputs, 
   defaultCommandMapping
 } from 'javascript-terminal';

export default function Terminal() {
   const customState = EmulatorState.create({
      'fs': FileSystem.create({
        '/home': { },
        '/home/README': {content: 'This is a text file'},
        '/home/nested/directory': {},
        '/home/nested/directory/file': {content: 'End of nested directory!'}
      }),
      'commandMapping': CommandMapping.create({
         ...defaultCommandMapping,
         'help': {
            'function':(state, opts) => {
               const input = [
                  'This is a simple help:',
                  ' ',
                  'ls -- list the contents of a directory',
                  'cd -- change the current working directory',
                  'head -- output the first part of files',
                  'cat -- read files sequentially and write them to standard output',
                  'echo -- output the strings it is being passed as arguments',
                  'rm -- delete one or more files',
                  ' ',
               ].join('\n')

               return{
                  output: OutputFactory.makeTextOutput(input)
               };
            },
            'optDef': {}
         }
      })
   });

   const defaultOutputs = customState.getOutputs();
   const newOutputs = Outputs.addRecord(
      defaultOutputs,
      OutputFactory.makeTextOutput(`Type help to see basic commands`)
   )
   const emulatorState = customState.setOutputs(newOutputs)

   return (
         <ReactTerminal emulatorState={emulatorState} theme={{...ReactThemes.light, height: '580px'}} clickToFocus/>
   )
}
