import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'orderBy',
    // setting pure to false causes the the array to resort
    pure: true
})
export class OrderByPipe implements PipeTransform {
    transform(array: any[], field: string): any[] {
        if (!Array.isArray(array)) {
            return array;
        }
        console.log("Sorting...");

        return array.sort((x, y) => 
            x[field] > y[field] 
            ? 1 
            : x[field] < y[field] 
                ? -1 
                : 0);
            
    }
}