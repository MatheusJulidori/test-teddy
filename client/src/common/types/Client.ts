export class Client {
  id: number;
  name: string;
  salary: number;
  companyValue: number;
  isSelected: boolean;

  constructor(
    id: number,
    name: string,
    salary: number,
    companyValue: number,
    isSelected: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.salary = salary;
    this.companyValue = companyValue;
    this.isSelected = isSelected;
  }

  toggleSelected(): void {
    this.isSelected = !this.isSelected;
  }

  get formattedSalary(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.salary);
  }

  get formattedCompanyValue(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.companyValue);
  }
}
