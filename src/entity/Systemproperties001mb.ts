import { SystempropertiesDTO } from "src/dto/Systemproperties.dto";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("systemproperties001mb", { schema: "trims" })
export class Systemproperties001mb {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("varchar", { name: "name", length: 50 })
  name: string;

  @Column("varchar", { name: "description", length: 60 })
  description: string;

  @Column("varchar", { name: "type", length: 20 })
  type: string;

  @Column("char", { name: "status", length: 1 })
  status: string;

  setProperties(systempropertiesDTO: SystempropertiesDTO) {
    this.id = systempropertiesDTO.id;
    this.name = systempropertiesDTO.name;
    this.description = systempropertiesDTO.description;
    this.type = systempropertiesDTO.type;
    this.status = systempropertiesDTO.status;
  }
}
