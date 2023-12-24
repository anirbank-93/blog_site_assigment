import { Validator } from 'node-input-validator';

import db from '../models/index.js';

const Post = db.post;

export const createPost = async (req, res) => {
  // console.log(req.body, 'body');
  const V = new Validator(req.body, {
    userId: 'required',
    username: 'required',
    title: 'required',
    description: 'required',
    category: 'required',
    image: 'required',
  });
  let matched = await V.check().then((val) => val);

  if (!matched) {
    return res.status(400).send({ status: false, errors: V.errors });
  }

  let saveData = {
    userId: req.body.userId,
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    image: req.body.image,
  };

  try {
    await Post.create(saveData);

    res.status(200).send({ message: 'Post created successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    let posts;
    console.log(req.query.category, 'query');
    if (req.query.category) {
      posts = await Post.findAll({ where: { category: req.query.category } });
    } else {
      posts = await Post.findAll();
    }

    // console.log(posts.every((post) => post instanceof Post));
    res
      .status(200)
      .json({ status: true, message: 'Data successfully get', data: posts });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    console.log(req.params.id, 'id');
    let post = await Post.findByPk(req.params.id);

    res
      .status(200)
      .json({ status: true, message: 'Data successfully get', data: post });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  console.log(req.body);
  const V = new Validator(req.body, {
    userId: 'required',
    username: 'required',
    title: 'required',
    description: 'required',
    category: 'required',
    image: 'required',
  });
  let matched = await V.check().then((val) => val);

  if (!matched) {
    return res.status(400).send({ status: false, errors: V.errors });
  }

  const id = req.params.id;

  try {
    await Post.update(req.body, {
      where: { id }
    })

    res.status(200).send({ message: 'Post updated successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

export const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    await Post.destroy({ where: { id } });

    res.status(200).send({ message: 'Post deleted successfully!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}