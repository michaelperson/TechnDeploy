import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, map, of } from "rxjs";
import { JoueurService } from "../services/joueur.service";

export class CustomValidators {
    public static largerThan(otherControl: AbstractControl|null, fieldName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if(!control.value || !otherControl?.value) {
                return null;
            }
            if(control.value < otherControl.value) {
                return { largerThan: { otherFieldName: fieldName } }
            }
            return null;
        }
    }

    public static existsEmail(joueurService: JoueurService): AsyncValidatorFn {
        return (control: AbstractControl) : Observable<ValidationErrors | null> => {
            if(!control.value) {
                return of(null);
            }
            else {
                // la methode exists retourne un Observable<boolean>
                // on doit transformer cette valeur en null ou ValidationErrors
                // pour correspondre à la signature de la fonction asyncValidatorFn
                return joueurService.exists(control.value).pipe(
                    map(exists => {
                        if(!exists) {
                            return null;
                        } else {
                            return { existsEmail: true }
                        }
                    }))
            }
        }
    }
}