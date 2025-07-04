import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroisService } from '../../services/herois.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Herois } from '../../interfaces/herois'
import { MatSelectModule } from '@angular/material/select';
import { SuperpoderesService } from '../../services/superpoderes.service';
import { Superpoderes } from '../../interfaces/superpoderes';
import { ToastService } from '../toast/toast.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-herois-form',
  imports: [[ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatButton, MatInputModule, MatSelectModule,
    MatOptionModule, CommonModule, MatDatepickerModule]],
  templateUrl: './herois-form.component.html',
  styleUrl: './herois-form.component.css',
  providers: [provideNativeDateAdapter()]
})
export class HeroisFormComponent {
  formConfig: FormGroup;
  listaSuperpoderes: Superpoderes[] = [];

  constructor(private fb: FormBuilder, private router: Router, private heroiService: HeroisService, private superpoderesService: SuperpoderesService, private toastService: ToastService,) {
    this.formConfig = this.fb.group({
      nome: ['', Validators.required],
      nomeHeroi: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      peso: [null, [Validators.required, Validators.min(1)]],
      altura: [null, [Validators.required, Validators.min(1)]],
      superpoderes: [[], Validators.required],
    });
  }
  ngOnInit() {
    this.carregarSuperpoderes();
  }

  async carregarSuperpoderes() {
    this.listaSuperpoderes = await this.superpoderesService.getSuperpoderes();

  }

  async onSubmit(): Promise<void> {
    try {
      if (this.formConfig.valid) {
        const formValue = this.formConfig.value;

        const heroi: Herois = {
          nome: formValue.nome,
          nomeHeroi: formValue.nomeHeroi,
          dataNascimento: formValue.dataNascimento,
          peso: formValue.peso,
          altura: formValue.altura,
          superpoderIds: formValue.superpoderes
        };
        await this.heroiService.salvarHeroi(heroi)
        this.toastService.callSuccessToast("Herói salvo com sucesso!")
        this.router.navigate(['/heroi']);
      }
    } catch(ex: any) {
      this.toastService.callErrorToast(ex.error.message)
  }
}

}
