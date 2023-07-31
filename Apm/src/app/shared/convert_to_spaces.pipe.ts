import {Pipe, PipeTransform } from "@angular/core";
// declare pipe name here in the decoratior
@Pipe({
    name:'convertToSpaces'
})
export class convertToSpacesPipe implements PipeTransform{

    transform(value:string,character:string):string{
         return value.replace(character,' ');
    }
}