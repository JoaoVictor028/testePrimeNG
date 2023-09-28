import { Component, Input, OnInit, } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Produto } from 'src/app/domain/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { formatDate } from '@angular/common';



interface ExportColumn {
  title: string;
  dataKey: string;
}


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
    dataEntrega: ''
  }

  cols!: any[];

  _selectedColumns!: any[];

  exportColumns!: ExportColumn[];


  constructor(private service: ProdutoService) { }

  produtos!: Produto[];

  statuses!: any[];

  categorias!: any[];

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
      
    })

    // this.service.getProducts().then((data) => {
    //   this.produtos = data;
    //   this.statuses = this.getInventoryStatus()
    //   this.categorias = this.getCategorias()
    // });


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


  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

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

  exportPdf() {
    console.log(this.produtos)
    const customColumns = this.selectedColumns.map(col => ({
      title: col.header,
      dataKey: col.field
    }));

    const header = function (doc: jsPDF) {
      const tamanhoDoTexto = 25;


      doc.setFontSize(tamanhoDoTexto); //12
      doc.setTextColor(40);


      // Adicione a imagem no cabeçalho
      const imgData = 'assets/images/max.png';
      const imgLargura = 30;
      const imgAltura = 30;
      doc.addImage(imgData, 'PNG', 5, 5, imgLargura, imgAltura);



      const headerText = 'Tabela de Produtos';
      const larguraTexto = doc.getTextWidth(headerText);
      const yTexto = 25;
      const larguraPagina = doc.internal.pageSize.getWidth();
      const xTexto = (larguraPagina - larguraTexto) / 2;

      doc.text(headerText, xTexto, yTexto);
    };


    const addWatermarkAsync = async (doc: jsPDF) => {
      const marcaDagua = 'assets/images/star.png';

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



    const footer = function (doc: jsPDF, pageNumber: any,) {
      doc.setFontSize(14);
      doc.setTextColor(40);
      doc.text(`Rodapé do PDF - Pagina ${pageNumber} - `, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, {
        align: 'center'
      });
    };

    const doc = new jsPDF('l', 'px', 'a4');
    
    (doc as any).autoTable({
      columns: customColumns,
      body: this.produtos,
      didDrawPage: function (data: any) {
        header(doc);
        const pageNumber = data.pageNumber;
        addWatermarkAsync(doc);
        footer(doc, pageNumber);
      },
    });

    doc.save('produtos.pdf');
    //
  }
}

