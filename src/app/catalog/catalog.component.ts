// third party imports first
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

// blank line then project imports next to make them easier to find
import { IClass } from '../users/class.model';
import { CatalogRepositoryService } from './catalog-repository-service';
import { UserRepositoryService } from '../services/user-repository.service';
import { FilterClassesService } from './filter-classes.service';

@Component({
  styleUrls: ['./catalog.component.css'],
  templateUrl: './catalog.component.html',
  // only triggers when object reference changes, not individual properties
  // caused data in the table to not be rendered
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit, OnChanges {
  classes: IClass[] = [];
  visibleClasses: IClass[] = [];
  orderByField: string = "";
  
  // userRepository is public because it is referenced in the HTML file
  // not a best practice to reference a service directly in HTML
  constructor(
    public userRepository: UserRepositoryService,
    private catalogRepository: CatalogRepositoryService,
    private filterClassesService: FilterClassesService,
  ) { }
  
  ngOnInit() {
    this.catalogRepository.getCatalog()
    .subscribe(
      (classes: IClass[]) => { 
        this.classes = classes; 
        this.applyFilter('') 
      }
    );
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    
  }
    
  enroll(classToEnroll: IClass) {
      classToEnroll.processing = true;
      this.userRepository.enroll(classToEnroll.classId)
      .subscribe({
        error: (err) => { console.error(err); classToEnroll.processing = false },
        complete: () => { classToEnroll.processing = false; classToEnroll.enrolled = true; },
      });
    }
    
    drop(classToDrop: IClass) {
      classToDrop.processing = true;
      this.userRepository.drop(classToDrop.classId)
      .subscribe({
        error: (err) => { console.error(err); classToDrop.processing = false },
        complete: () => { classToDrop.processing = false; classToDrop.enrolled = false; }
      });
    }
    
    applyFilter(filter: string) {
      this.visibleClasses = this.filterClassesService.filterClasses(filter, this.classes);
    }
    
    mutateFirstProfessor() {
      // mutates the first professor's name
      // if rows are sorted by professor, doesn't resort the rows
      this.visibleClasses[0].professor = "Lucarion";
    }

    updateFirstProfessor() {
      // sets visibleClasses to a new array with the first class having a professor named "Lucarion"
      this.visibleClasses = [
        { ...this.visibleClasses[0], professor: "Lucarion" },
        ...this.visibleClasses.slice(1)
      ];
    }
  }
  