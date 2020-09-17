import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor() { }
  employeeForm : FormGroup;
  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName : new FormControl(),
      email : new FormControl(),
      skills: new FormGroup({
        skillName : new FormControl(),
        expInYrs : new FormControl(),
        proficiency : new FormControl()
      })
    });

    
  }
  onSubmit():void{
    console.log(this.employeeForm.value);
  }

  onLoadDataClick(): void{
    this.employeeForm.setValue({
      fullName : 'Amit Raghuvanshi',
      email : 'a@gmail.com',
      skills : {
        skillName : 'C#',
      expInYrs : 2,
      proficiency : 'beginner'
      }
      
    });
  }
}
