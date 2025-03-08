import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTooltipModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sorteio: number[] = [];
  aposta: number[] = [];
  acertos: number = 0;

  // Método para sortear números
  sortearNumeros() {
    this.sorteio = this.gerarNumerosAleatorios(6); // Sorteia 6 números
    this.verificarAcertos();
  }

  // Gera números aleatórios entre 1 e 60
  gerarNumerosAleatorios(quantidade: number): number[] {
    let numeros: Set<number> = new Set();
    while (numeros.size < quantidade) {
      numeros.add(Math.floor(Math.random() * 60) + 1); // Números entre 1 e 60
    }
    return Array.from(numeros).sort((a, b) => a - b); // Ordena os números
  }

  // Verifica os acertos
  verificarAcertos() {
    this.acertos = this.aposta.filter(num => this.sorteio.includes(num)).length;
  }

  // Atualiza a aposta
  atualizarAposta(event: any) {
    const valores: number[] = event.target.value
      .split(',')
      .map((num: string) => parseInt(num.trim(), 10))
      .filter((num: number) => !isNaN(num));

    this.aposta = [...new Set(valores)].filter(num => num >= 1 && num <= 60);

    // Validação da aposta
    if (this.aposta.length < 6 || this.aposta.length > 10) {
      alert('Aposta inválida! Escolha entre 6 e 10 números de 1 a 60.');
    } else {
      this.verificarAcertos();
    }
  }
}
