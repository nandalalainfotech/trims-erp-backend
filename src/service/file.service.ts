import { Injectable, Req, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createReadStream } from "fs";
import { Response } from "express";
import { Request } from "supertest"
import { Repository } from "typeorm";
import { File001mb } from "src/entity/File001mb";
import { FileDTO } from "src/dto/file.dto";

@Injectable()
export class FileMangerService {
    constructor(
        @InjectRepository(File001mb) private readonly fileRepository: Repository<File001mb>) {
    }

    async create(fileDTO: FileDTO): Promise<File001mb> {
        const file001mb = new File001mb();
        file001mb.setProperties(fileDTO);
        return this.fileRepository.save(file001mb);
    }

    async update(fileDTO: FileDTO): Promise<File001mb> {
        const file001mb = new File001mb();
        file001mb.setProperties(fileDTO);
        await this.fileRepository.update({ slNo: file001mb.slNo }, file001mb);
        return file001mb;
    }

    async findAll(): Promise<File001mb[]> {
        return this.fileRepository.find({order: { slNo: "DESC" },});
    }

    findOne(id: number): Promise<File001mb> {
        return this.fileRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
		await this.fileRepository.delete(id);
	}
}