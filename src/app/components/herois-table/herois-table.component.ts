import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Herois } from '../../interfaces/herois';
import { HeroisService } from '../../services/herois.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastService } from '../toast/toast.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-herois-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './herois-table.component.html',
  styleUrl: './herois-table.component.scss',
  providers: [DatePipe]
})
export class HeroisTableComponent implements OnInit {
  heroisData: Herois[] = [];
  colunas: string[] = ['Id', 'Nome Real', 'Nome de Herói', 'Data de Nascimento', 'Peso', 'Altura', 'Acoes'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
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
  try {
    const data: Herois[] = await this.heroiService.getHerois();
    
    this.heroisData = data.map(heroisData => ({
      ...heroisData,
      dataNascimento: this.datePipe.transform(heroisData.dataNascimento, 'dd/MM/yyyy') || '',
    }));

    this.dataSource = new MatTableDataSource(this.heroisData);
    this.dataSource.paginator = this.paginator;

  } catch (error) {
    this.toastService.callErrorToast('Erro ao buscar heróis.');
  }
}
  alterarHeroi(id: number): void {
    this.router.navigate([`cadastrar/${id}`]);
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
