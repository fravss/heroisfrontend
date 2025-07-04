import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Herois } from '../../interfaces/herois';
import { HeroisService } from '../../services/herois.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-herois-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './herois-table.component.html',
  styleUrl: './herois-table.component.css',
  providers:[DatePipe]
})
export class HeroisTableComponent implements OnInit{
  heroisData: Herois[] = [];
  colunas: string[] = ['Id', 'Nome Real', 'Nome de Herói', 'Data de Nascimento', 'Peso', 'Altura', 'Acoes'];
  constructor(
    private heroiService: HeroisService, 
    private router: Router, 
    private toastService: ToastService,
    private datePipe: DatePipe,
  ) { }
  
  ngOnInit(): void {
       this.getTodosHerois();
  }

  async getTodosHerois(): Promise<void> {
    const data: Herois[] = await this.heroiService.getHerois();

    this.heroisData = data.map(heroisData => ({
        ...heroisData,
        dataNascimento: this.datePipe.transform(heroisData.dataNascimento, 'dd/MM/yyyy')  || '',
      }));

  }

  async deleteHeroi(id: number): Promise<void> {
    try {
      await this.heroiService.deleteHeroi(id);
      this.heroisData = this.heroisData.filter(heroisData => heroisData.id !== id);
      this.toastService.callSuccessToast('Heroi deletado com sucesso!')
    } catch (ex: any) {
      this.toastService.callErrorToast(ex.error.message)
    }
  }

}
