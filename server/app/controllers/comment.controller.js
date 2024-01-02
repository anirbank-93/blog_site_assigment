import { Validator } from 'node-input-validator';

import db from '../models/index.js';

const commentModel = db.comments;

export const newComment = async (req, res) => {
    // console.log("body", req.body);
    const V = new Validator(req.body, {
        name: 'required',
        comment: 'required',
    });

    let matched = await V.check().then(val => val);

    if (!matched) {
        return res.status(401).send({ status: false, errors: V.errors })
    }

    try {
        await commentModel.create(req.body)

        return res.status(201).json({ status: true, message: "Comment added successfully " });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Failed to add comment.", error: error.message });
    }
}

export const getAllPostComments = async (req, res) => {
    // console.log("postId", req.params.postId);

    try {
        let comments = await db.sequelize.query(
            `SELECT "comments"."id", "comments"."userId", "comments"."name", "comments"."postId", "comments"."comment", "comments"."createdAt", "users"."username" FROM public.comments AS comments LEFT JOIN public.users AS users ON "comments"."userId"="users"."id" WHERE "comments"."postId"=${req.params.postId}`,
            { type: db.sequelize.QueryTypes.SELECT }
        );
        // console.log("comments", comments);
        // comments = comments.map(comment => {
        //     let update = JSON.parse(JSON.stringify(comment));

        //     // Create a new object without 'username' and 'password'
        //     const { password, ...rest } = update;

        //     return rest;
        // });

        res.status(200).json({ status: true, message: "Data get successfully.", data: comments });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to get data. Server error.", error: error.message });
    }
}

export const deleteComment = async (req, res) => {
    console.log(req.params.commentId);
    try {
        await commentModel.destroy({ where: { id: req.params.commentId } });

        res.status(200).json({ status: true, message: "Comment delete successfully." });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to delete comment.", error: error.message });
    }
}