import { Systemproperties001mb } from "src/entity/Systemproperties001mb";


export class SystempropertiesDTO {
  id: number;
  name: string;
  description: string;
  type: string;
  status: string;

  setProperties(systemproperties001mb: Systemproperties001mb) {
    this.id = systemproperties001mb.id;
    this.name = systemproperties001mb.name;
    this.description = systemproperties001mb.description;
    this.type = systemproperties001mb.type;
    this.status = systemproperties001mb.status;
  }
}
