import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Category, { CategoryRequestInterface } from '../models/category';
import HttpError from '../models/http-error';
import { stringToSlug } from '../utils/slug';

export const createCategories = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const categories: CategoryRequestInterface[] = req.body.categories;
  // TODO: Add error handling
  // TODO: Protect this controller (JWT) and ONLY ADMIN
  if (!categories || categories.length === 0) {
    return next(new HttpError('Bad Request. Include valid Body', 400));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const newCategories = categories.map(({ name, description }) => {
      return new Category({
        date: new Date(),
        slug: stringToSlug(name),
        name,
        description,
        children: [],
      });
    });

    categories.forEach(async ({ parent }, i: number) => {
      // Update Parent Categories with new childs
      if (parent) {
        const parentCategory = await Category.findById(parent);
        const childId = newCategories[i]._id;
        if (!parentCategory.children.includes(childId.toString())) {
          parentCategory.children.push(newCategories[i]._id);
          await parentCategory.save();
        }
      }
    });
    const createdCategories = await Category.insertMany(newCategories);
    await session.commitTransaction();
    res.status(201).json({ categories: createdCategories });
  } catch (e) {
    return next(new HttpError('Something went wrong, could not create categories', 500));
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { categoriesIds } = req.body;

  try {
    let categories;
    if (!categoriesIds) {
      categories = await Category.find().populate({ path: 'children', populate: { path: 'children' } });
    } else {
      categories = await Category.find()
        .where('_id')
        .in(categoriesIds)
        .populate({ path: 'children', populate: { path: 'children' } });
    }
    res.json({ categories: categories.map(category => category.toObject({ getters: true })) });
  } catch (e) {
    return next(new HttpError('Something went wrong, could not find categories', 500));
  }
};
