import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
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
      email : ['',Validators.required],
      skills: this.fb.group({
        skillName : ['',Validators.required],
        expInYrs : ['',Validators.required],
        proficiency : ['',Validators.required]
      })
    });

    this.employeeForm.get('fullName').valueChanges.subscribe(value=>{
      console.log(value);
    });

    this.employeeForm.valueChanges.subscribe(value=>{
      this.displayValidationMessages(this.employeeForm);
    })
    
  }
  onSubmit():void{
    this.displayValidationMessages(this.employeeForm);
    this.logKeyValuePair(this.employeeForm);
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

  logKeyValuePair(group : FormGroup) : void{
    var data = Object.keys(group.controls);
    Object.keys(group.controls).forEach((key : string)=>{
       const abstractControl  = group.get(key);
       if(abstractControl instanceof FormGroup){
         this.logKeyValuePair(abstractControl);
       }
       else{
         console.log('Key ' + key + ',' + 'Value ' + abstractControl.value);
       }
    });
  }

  //This object contains all the validation messages displayed to the user
  formErrors = {
    'fullName' : '',
    'email' : '',
    'skillName' : '',
    'expInYrs' : '',
    'proficiency' : ''
  }

  //It contains all validation msz for the form.
  validationMessage = {
    'fullName' : {
      'required' : 'fullName is required',
      'minlength': 'Full Name must be greater than 2 characters.',
    'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  }

  //logic to display validation msz
  displayValidationMessages(group : FormGroup) : void{
    Object.keys(group.controls).forEach((key : string)=>{
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup){
        this.displayValidationMessages(abstractControl);
      }
      else{
        this.formErrors[key] = '';
        if(abstractControl && !abstractControl.valid){
          const message =  this.validationMessage[key];
            for(const errorKey in abstractControl.errors){
              this.formErrors[key] += message[errorKey];
            }
          };
        }
      
    })
  }

}
