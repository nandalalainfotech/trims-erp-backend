import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonDTO } from "src/dto/person.dto";
import { Person001mb } from "src/entity/Person001mb";
import { Repository } from "typeorm";

@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person001mb) private readonly personRepository: Repository<Person001mb>) {
    }

    async create(personDTO: PersonDTO): Promise<Person001mb> {
        const person001mb = new Person001mb();
        person001mb.setProperties(personDTO);
        return this.personRepository.save(person001mb);
    }

    async update(personDTO: PersonDTO): Promise<Person001mb> {
        const person001mb = new Person001mb();
        person001mb.setProperties(personDTO);
        await this.personRepository.update({ personId: person001mb.personId }, person001mb);
        return person001mb;
    }

    async findAll(): Promise<Person001mb[]> {
        return this.personRepository.find();
    }

    findOne(id: number): Promise<Person001mb> {
        return this.personRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.personRepository.delete(id);
    }
}