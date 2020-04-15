import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import Category, { CategoryRequestInterface } from '../models/category';
import HttpError from '../models/http-error';
import { stringToSlug } from '../utils/slug';
import { validationResult } from 'express-validator';

export const createCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const categories: CategoryRequestInterface[] = req.body.categories;
  // TODO: ONLY ADMIN
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
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

        if (!parentCategory?.children.includes(childId.toString())) {
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

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const { ids } = req.query;

  try {
    let categories;
    if (!ids) {
      categories = await Category.find().populate({
        path: 'children',
        populate: { path: 'children' },
      });
    } else {
      categories = await Category.find()
        .where('_id')
        .in((ids as string).split(','))
        .populate({ path: 'children', populate: { path: 'children' } });
    }
    res.json({ categories: categories.map((category) => category.toObject({ getters: true })) });
  } catch (e) {
    return next(new HttpError('Something went wrong, could not find categories', 500));
  }
};
