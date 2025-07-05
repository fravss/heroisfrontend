import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Herois } from '../../interfaces/herois';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-heroi-dialog',
   standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './superpoder-dialog.component.html',
  styleUrl: './superpoder-dialog.component.scss'
})
export class SuperpoderDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Herois,
    public dialogRef: MatDialogRef<SuperpoderDialogComponent>
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }

}
