import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Page, PageDocument } from "./entities/page.entity";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class PagesService {
  constructor(
    @InjectModel(Page.name)
    private pageModel: Model<PageDocument>
  ) {}

  async create(createPageDto: CreatePageDto, user: User): Promise<Page> {
    const createdPage = await this.pageModel.create({
      ...createPageDto,
      userId: user.id,
    });
    return createdPage;
  }

  async findAll(userId: string): Promise<Page[]> {
    return this.pageModel.find({ userId }).exec();
  }

  async findOne(id: string, userId: string): Promise<Page> {
    const page = await this.pageModel.findOne({ _id: id, userId }).exec();

    if (!page) {
      throw new NotFoundException("Page not found");
    }

    return page;
  }

  async update(id: string, updatePageDto: UpdatePageDto, userId: string): Promise<Page> {
    const page = await this.pageModel
      .findOneAndUpdate({ _id: id, userId }, updatePageDto, { new: true })
      .exec();

    if (!page) {
      throw new NotFoundException("Page not found");
    }

    return page;
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.pageModel.deleteOne({ _id: id, userId }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException("Page not found");
    }
  }
}
