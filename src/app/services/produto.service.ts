import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../domain/produto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:3000/produtos'

  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API)
  }

  // Simulando uma chamada a uma API ou banco de dados
  // getProductsData(): Produto[] {
  //   return [
  //     {
  //       id: 1,
  //       codigo: 'f230fh0g3',
  //       nome: 'Pulseira de Couro',
  //       preco: 650.00,
  //       quantidade: 24,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2023-10-05')
  //     },

  //     {
  //       id: 2,
  //       codigo: 'g28sjg23k',
  //       nome: 'Óculos de Sol',
  //       preco: 199.99,
  //       quantidade: 50,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2023-10-07')
  //     },

  //     {
  //       id: 3,
  //       codigo: 'h92kjn54l',
  //       nome: 'Relógio de Pulso',
  //       preco: 299.50,
  //       quantidade: 18,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2023-10-10')
  //     },

  //     {
  //       id: 4,
  //       codigo: 'd41kdh82e',
  //       nome: 'Bolsa de Couro',
  //       preco: 450.00,
  //       quantidade: 10,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2023-10-15')
  //     },

  //     {
  //       id: 5,
  //       codigo: 'e73mlp9x1',
  //       nome: 'Camiseta de Algodão',
  //       preco: 35.99,
  //       quantidade: 100,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2023-10-20')
  //     },

  //     {
  //       id: 6,
  //       codigo: 'a16zpn7q5',
  //       nome: 'Tênis Esportivo',
  //       preco: 120.00,
  //       quantidade: 30,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Calçados',
  //       dataEntrega: new Date('2023-10-25')
  //     },

  //     {
  //       id: 7,
  //       codigo: 'b39ljm5t2',
  //       nome: 'Brinco de Prata',
  //       preco: 45.50,
  //       quantidade: 40,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2023-10-28')
  //     },

  //     {
  //       id: 8,
  //       codigo: 'c87hps3k8',
  //       nome: 'Vestido de Festa',
  //       preco: 189.99,
  //       quantidade: 12,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2023-11-02')
  //     },

  //     {
  //       id: 9,
  //       codigo: 'f24nxs6m1',
  //       nome: 'Mala de Viagem',
  //       preco: 99.00,
  //       quantidade: 20,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2023-11-05')
  //     },

  //     {
  //       id: 10,
  //       codigo: 'g55sfd8h4',
  //       nome: 'Boné de Baseball',
  //       preco: 19.99,
  //       quantidade: 80,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2023-11-10')
  //     },
  //     {
  //       id: 11,
  //       codigo: 'k42nsh7e3',
  //       nome: 'Cinto de Couro',
  //       preco: 79.99,
  //       quantidade: 15,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2023-11-15')
  //     },

  //     {
  //       id: 12,
  //       codigo: 'm73lwp9x7',
  //       nome: 'Jaqueta de Couro',
  //       preco: 299.00,
  //       quantidade: 8,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2023-11-20')
  //     },

  //     {
  //       id: 13,
  //       codigo: 'n16zpn7q2',
  //       nome: 'Mochila Esportiva',
  //       preco: 89.99,
  //       quantidade: 25,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2023-11-25')
  //     },

  //     {
  //       id: 14,
  //       codigo: 'p39tjm5t8',
  //       nome: 'Calça Jeans',
  //       preco: 59.50,
  //       quantidade: 35,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2023-12-01')
  //     },

  //     {
  //       id: 15,
  //       codigo: 'q87bps3k4',
  //       nome: 'Sapatos de Salto',
  //       preco: 129.99,
  //       quantidade: 20,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Calçados',
  //       dataEntrega: new Date('2023-12-05')
  //     },

  //     {
  //       id: 16,
  //       codigo: 'r24pxs6m5',
  //       nome: 'Pulseira de Prata',
  //       preco: 39.99,
  //       quantidade: 50,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2023-12-10')
  //     },

  //     {
  //       id: 17,
  //       codigo: 's55sfd8h8',
  //       nome: 'Blusa de Malha',
  //       preco: 29.99,
  //       quantidade: 60,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2023-12-15')
  //     },

  //     {
  //       id: 18,
  //       codigo: 't22dxs1a2',
  //       nome: 'Bolsa de Viagem',
  //       preco: 149.00,
  //       quantidade: 12,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2023-12-20')
  //     },

  //     {
  //       id: 19,
  //       codigo: 'u77plz9o5',
  //       nome: 'Chapéu de Palha',
  //       preco: 19.99,
  //       quantidade: 30,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2023-12-25')
  //     },

  //     {
  //       id: 20,
  //       codigo: 'v90nss2z8',
  //       nome: 'Calça de Yoga',
  //       preco: 45.00,
  //       quantidade: 20,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-01-02')
  //     },
  //     {
  //       id: 21,
  //       codigo: 'w31dfk6o7',
  //       nome: 'Bermuda de Praia',
  //       preco: 29.99,
  //       quantidade: 40,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-01-10')
  //     },

  //     {
  //       id: 22,
  //       codigo: 'x44mpq9i2',
  //       nome: 'Tênis de Corrida',
  //       preco: 149.99,
  //       quantidade: 15,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Calçados',
  //       dataEntrega: new Date('2024-01-15')
  //     },

  //     {
  //       id: 23,
  //       codigo: 'y09gfr8z5',
  //       nome: 'Bracelete de Ouro',
  //       preco: 249.00,
  //       quantidade: 10,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2024-01-20')
  //     },

  //     {
  //       id: 24,
  //       codigo: 'z72plm3x1',
  //       nome: 'Vestido de Verão',
  //       preco: 79.99,
  //       quantidade: 25,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-01-25')
  //     },

  //     {
  //       id: 25,
  //       codigo: 'a33lpv7o9',
  //       nome: 'Bolsa de Couro Vintage',
  //       preco: 199.00,
  //       quantidade: 8,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2024-02-01')
  //     },

  //     {
  //       id: 26,
  //       codigo: 'b11rpxs4m8',
  //       nome: 'Colar de Pérolas',
  //       preco: 69.99,
  //       quantidade: 30,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2024-02-05')
  //     },

  //     {
  //       id: 27,
  //       codigo: 'c98tsa8l5',
  //       nome: 'Blazer Clássico',
  //       preco: 129.00,
  //       quantidade: 20,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-02-10')
  //     },

  //     {
  //       id: 28,
  //       codigo: 'd61pqz2s9',
  //       nome: 'Mala de Rodinhas',
  //       preco: 79.00,
  //       quantidade: 15,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2024-02-15')
  //     },

  //     {
  //       id: 29,
  //       codigo: 'e27opn4h8',
  //       nome: 'Lenço de Seda',
  //       preco: 24.99,
  //       quantidade: 50,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2024-02-20')
  //     },

  //     {
  //       id: 30,
  //       codigo: 'f15kio3l7',
  //       nome: 'Shorts Esportivos',
  //       preco: 34.50,
  //       quantidade: 40,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-02-25')
  //     },
  //     {
  //       id: 31,
  //       codigo: 'g23vnt7m6',
  //       nome: 'Bota de Inverno',
  //       preco: 79.99,
  //       quantidade: 20,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Calçados',
  //       dataEntrega: new Date('2024-03-01')
  //     },

  //     {
  //       id: 32,
  //       codigo: 'h78lmk1w3',
  //       nome: 'Relógio de Luxo',
  //       preco: 999.00,
  //       quantidade: 5,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2024-03-05')
  //     },

  //     {
  //       id: 33,
  //       codigo: 'i45ntx9p8',
  //       nome: 'Saia Midi',
  //       preco: 49.99,
  //       quantidade: 30,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-03-10')
  //     },

  //     {
  //       id: 34,
  //       codigo: 'j92hsd6g5',
  //       nome: 'Mochila Vintage',
  //       preco: 129.00,
  //       quantidade: 10,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2024-03-15')
  //     },

  //     {
  //       id: 35,
  //       codigo: 'k57svf8h9',
  //       nome: 'Pulseira de Diamantes',
  //       preco: 399.00,
  //       quantidade: 7,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2024-03-20')
  //     },

  //     {
  //       id: 36,
  //       codigo: 'l14pnt5z2',
  //       nome: 'Vestido de Noite',
  //       preco: 179.99,
  //       quantidade: 12,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-03-25')
  //     },

  //     {
  //       id: 37,
  //       codigo: 'm33lmo9k1',
  //       nome: 'Mala de Viagem Grande',
  //       preco: 149.00,
  //       quantidade: 8,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2024-04-01')
  //     },
  //     {
  //       id: 38,
  //       codigo: 'n89cpl7d4',
  //       nome: 'Colar de Prata',
  //       preco: 59.99,
  //       quantidade: 25,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2024-04-05')
  //     },
  //     {
  //       id: 39,
  //       codigo: 'o72rdc2x8',
  //       nome: 'Calça de Linho',
  //       preco: 69.50,
  //       quantidade: 20,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-04-10')
  //     },

  //     {
  //       id: 40,
  //       codigo: 'p14wsa6v5',
  //       nome: 'Bolsa de Ombro',
  //       preco: 89.00,
  //       quantidade: 15,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2024-04-15')
  //     },
  //     {
  //       id: 41,
  //       codigo: 'q23kft7m2',
  //       nome: 'Sapatos de Salto Alto',
  //       preco: 79.99,
  //       quantidade: 10,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Calçados',
  //       dataEntrega: new Date('2024-04-20')
  //     },
  //     {
  //       id: 42,
  //       codigo: 'r86plk1w9',
  //       nome: 'Óculos de Designer',
  //       preco: 349.00,
  //       quantidade: 8,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2024-04-25')
  //     },
  //     {
  //       id: 43,
  //       codigo: 's45ntx9p3',
  //       nome: 'Blusa Floral',
  //       preco: 39.99,
  //       quantidade: 25,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-05-01')
  //     },
  //     {
  //       id: 44,
  //       codigo: 't92hsd6g7',
  //       nome: 'Mochila Esportiva Resistente à Água',
  //       preco: 89.00,
  //       quantidade: 15,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2024-05-05')
  //     },
  //     {
  //       id: 45,
  //       codigo: 'u57svf8h2',
  //       nome: 'Pulseira de Safira',
  //       preco: 299.00,
  //       quantidade: 5,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2024-05-10')
  //     },
  //     {
  //       id: 46,
  //       codigo: 'v14pnt5z7',
  //       nome: 'Vestido de Coquetel',
  //       preco: 129.99,
  //       quantidade: 12,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-05-15')
  //     },
  //     {
  //       id: 47,
  //       codigo: 'w33lmo9k3',
  //       nome: 'Mala de Viagem Pequena',
  //       preco: 79.00,
  //       quantidade: 20,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2024-05-20')
  //     },
  //     {
  //       id: 48,
  //       codigo: 'x89cpl7d8',
  //       nome: 'Anel de Ouro',
  //       preco: 149.99,
  //       quantidade: 10,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Acessórios',
  //       dataEntrega: new Date('2024-05-25')
  //     },
  //     {
  //       id: 49,
  //       codigo: 'y72rdc2x3',
  //       nome: 'Shorts de Praia',
  //       preco: 34.50,
  //       quantidade: 30,
  //       inventoryStatus: 'Em Estoque',
  //       categoria: 'Roupas',
  //       dataEntrega: new Date('2024-06-01')
  //     },
  //     {
  //       id: 50,
  //       codigo: 'z14wsa6v8',
  //       nome: 'Mochila de Viagem Grande',
  //       preco: 109.00,
  //       quantidade: 8,
  //       inventoryStatus: 'Fora de Estoque',
  //       categoria: 'Bolsas',
  //       dataEntrega: new Date('2024-06-05')
  //     },
  //   ]
  // }
  // getProducts() {
  //   return Promise.resolve(this.getProductsData());
  // }
}
