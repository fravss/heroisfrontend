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
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-herois-form',
  imports: [[ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatButton, MatInputModule, MatSelectModule,
    MatOptionModule, CommonModule, MatDatepickerModule]],
  templateUrl: './herois-form.component.html',
  styleUrl: './herois-form.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class HeroisFormComponent {
  formConfig: FormGroup;
  listaSuperpoderes: Superpoderes[] = [];
  heroiId?: number;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private heroiService: HeroisService, private superpoderesService: SuperpoderesService, private toastService: ToastService,) {
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
    this.heroiId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.heroiId) {
      this.onEdit(this.heroiId);
    }
    
  }

  async onEdit(id: number): Promise<void> {
    try {
    const heroiData = await this.heroiService.getHeroiPorId(id);
   
    
    const superpoderes = (heroiData as any).superpoderes as { id: number }[];
    const superpoderesIds = superpoderes.map(sp => sp.id);

    this.formConfig.patchValue({
      nome: heroiData.nome,
      nomeHeroi: heroiData.nomeHeroi,
      dataNascimento: heroiData.dataNascimento,
      peso: heroiData.peso,
      altura: heroiData.altura,
      superpoderes: superpoderesIds
    });
     } catch( ex: any) {
      this.toastService.callErrorToast(ex.error.message)
    }

  }

  async carregarSuperpoderes() {
    this.listaSuperpoderes = await this.superpoderesService.getSuperpoderes();

  }

  async onSubmit(): Promise<void> {
    try {
      const formValue = this.formConfig.value;

        const heroi: Herois = {
          nome: formValue.nome,
          nomeHeroi: formValue.nomeHeroi,
          dataNascimento: formValue.dataNascimento,
          peso: formValue.peso,
          altura: formValue.altura,
          superpoderIds: formValue.superpoderes
        };
      if (!this.heroiId) {
        await this.heroiService.salvarHeroi(heroi)
        this.toastService.callSuccessToast("Herói salvo com sucesso!")
        this.router.navigate(['/heroi']);
      } else {
        await this.heroiService.alterarHeroi(heroi, this.heroiId);
        this.toastService.callSuccessToast("Herói alterado com sucesso!")
        this.router.navigate(['/heroi']);
      }
    } catch (ex: any) {
      this.toastService.callErrorToast(ex.error.message)
    }
  }

}
