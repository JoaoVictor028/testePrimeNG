import { Component, Input, OnInit, } from '@angular/core';
import { Produto } from 'src/app/domain/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { formatDate } from '@angular/common';
import { Table, TableFilterEvent } from 'primeng/table';

import jsPDF from 'jspdf';
import 'jspdf-autotable'
import * as XLSX from 'xlsx';






@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {

  @Input() produto: Produto = {
    id: 0,
    codigo: '',
    nome: '',
    preco: 0,
    quantidade: 0,
    inventoryStatus: '',
    categoria: '',
    dataEntrega: '',
    selecionado: true
  }

  cols!: any[];

  rows!: any[];

  _selectedColumns!: any[];

  _selectedRows!: any[];

  produtos!: Produto[];

  statuses!: any[];

  categorias!: any[];

  constructor(private service: ProdutoService) { }


  private getInventoryStatus(): any[] {
    const statusUnicoSet = new Set<string>();
    const statusUnicoArray: any = [];

    statusUnicoArray.pus
    this.produtos.forEach((produto) => {
      const status = produto['inventoryStatus']

      if (status && !statusUnicoSet.has(status)) {
        statusUnicoSet.add(status);
        statusUnicoArray.push({
          value: status,
          label: status
        });
      }
    });
    return statusUnicoArray
  }

  private getCategorias(): any[] {
    const categoriaUnicoSet = new Set<string>();
    const categoriaUnicoArray: any[] = [];

    this.produtos.forEach((produto) => {
      const categoria = produto['categoria'];

      if (categoria && !categoriaUnicoSet.has(categoria)) {
        categoriaUnicoSet.add(categoria);
        categoriaUnicoArray.push({
          value: categoria,
          label: categoria
        });
      }
    });
    console.log(categoriaUnicoArray)
    return categoriaUnicoArray;
  }

  ngOnInit(): void {

    this.service.listar().subscribe((data: Produto[]) => {
      this.produtos = data
      this.statuses = this.getInventoryStatus()
      this.categorias = this.getCategorias()
      this.produtos.forEach((produto) => (produto.dataEntrega = new Date(<Date>produto.dataEntrega)));
      this._selectedRows = this.produtos;
    })

    this.cols = [
      { field: 'codigo', header: 'Codigo', visible: false },
      { field: 'nome', header: 'Nome', visible: true },
      { field: 'preco', header: 'Preço', visible: true },
      { field: 'quantidade', header: 'Quantidade', visible: true },
      { field: 'inventoryStatus', header: 'Status no Inventario', visible: true },
      { field: 'categoria', header: 'Categoria', visible: true },
      { field: 'dataEntrega', header: 'Data de Entrega', visible: true },
    ];

    this._selectedColumns = this.cols.filter((col) => col.visible);
  }

  //#region Columns
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }
  //#endregion

  //#region Rows
  @Input() get selectedRows(): any[] {
    return this._selectedRows;
  }

  set selectedRows(val: any[]) {
    this._selectedRows = this.rows.filter(row => val.includes(row));
  }

  onFilter(event: TableFilterEvent) {
    // `_selectedRows` será atualizado com as linhas filtradas
    this._selectedRows = event.filteredValue;
  }
  //#endregion

  getSeverity(status: string) {
    switch (status) {
      case 'Fora de Estoque':
        return 'danger';

      case 'Em Estoque':
        return 'success';

      case 'new':
        return 'info';

      case 'teste':
        return 'warning';

      default:
        return 'default';
    }
  }

  clear(table: Table) {
    table.clear();
  }

  exportPdf() {
    const customColumns = this.selectedColumns.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    //const customRows = this.selectedRows;

    const customRows = this.selectedRows.map((row) => {
      return {
        codigo: row.codigo,
        nome: row.nome,
        preco: `R$ ${row.preco.toFixed(2)}`,
        quantidade: row.quantidade,
        inventoryStatus: row.inventoryStatus,
        categoria: row.categoria,
        dataEntrega: formatDate(row.dataEntrega, 'dd/MM/yyyy', 'en-US'),
      };
    });

    //#region Header
    const header = function (doc: jsPDF) {
      const tamanhoDoTexto = 25;

      doc.setFontSize(tamanhoDoTexto); //12
      doc.setTextColor(40);


      // Adicione a imagem no cabeçalho
      const imgData = 'assets/images/star_net_logo.png';
      const imgLargura = 40;
      const imgAltura = 30;
      doc.addImage(imgData, 'PNG', 5, 5, imgLargura, imgAltura);



      const headerText = 'Tabela de Produtos';
      const larguraTexto = doc.getTextWidth(headerText);
      const yTexto = 25;
      const larguraPagina = doc.internal.pageSize.getWidth();
      const xTexto = (larguraPagina - larguraTexto) / 2;

      doc.text(headerText, xTexto, yTexto);
    };
    //#endregion 

    //#region MARCA D'AGUA
    const addWatermarkAsync = async (doc: jsPDF) => {
      const marcaDagua = 'assets/images/star_consulting_logo.png';

      const pageWidth = doc.internal.pageSize.getWidth(); //Largura da Pagina
      const pageHeight = doc.internal.pageSize.getHeight(); // Altura da Pagina

      const watermarkWidth = 200; // Largura da marca d'água (ajuste conforme necessário)
      const watermarkHeight = 150; // Altura da marca d'água (ajuste conforme necessário)

      const xPosition = (pageWidth - watermarkWidth) / 2;
      const yPosition = (pageHeight - watermarkHeight) / 2;

      const totalPages = doc.getNumberOfPages();
      console.log(totalPages)
      try {
        for (let i = 1; i <= totalPages; i++) {
          doc.setPage(i);
          doc.saveGraphicsState();
          doc.setGState(doc.GState({ opacity: 0.2 }));
          // doc.text('DRAFT', xPosition, yPosition, {align: 'center', baseline: 'middle'});
          doc.addImage(marcaDagua, xPosition, yPosition, watermarkWidth, watermarkHeight, undefined);
          doc.restoreGraphicsState();
        }

      } catch (err) {
        console.error(err);
      }
    };
    //#endregion

    //#region FOOTER
    const footer = function (doc: jsPDF, pageNumber: any,) {
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text(`Rodapé do PDF - Pagina ${pageNumber} - `, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, {
        align: 'center'
      });
    };
    //#endregion


    const doc = new jsPDF('l', 'px', 'a4');

    (doc as any).autoTable({
      columns: customColumns,
      body: customRows,
      didDrawPage: function (data: any) {
        header(doc);
        const pageNumber = data.pageNumber;
        addWatermarkAsync(doc);
        footer(doc, pageNumber);
      },
    });
    //console.log(customRows)
    doc.save('produtos.pdf');
    //
  }


  exportExcel() {
    const customColumns = this.selectedColumns.map(col => col.header);
    const customRows = this.selectedRows.map(row => this.selectedColumns.map(col => row[col.field]));

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([customColumns, ...customRows]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');

    // Salvar o arquivo Excel
    XLSX.writeFile(wb, 'produtos.xlsx');
  }
}

