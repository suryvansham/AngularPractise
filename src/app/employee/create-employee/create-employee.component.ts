import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validator } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private fb : FormBuilder) { }
  employeeForm : FormGroup;
  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email : [''],
      skills: this.fb.group({
        skillName : [''],
        expInYrs : [''],
        proficiency : ['']
      })
    });

    this.employeeForm.get('fullName').valueChanges.subscribe(value=>{
      console.log(value);
    });

    this.employeeForm.valueChanges.subscribe(value=>{
      console.log(JSON.stringify(value));
    })
    
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
