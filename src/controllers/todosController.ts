import { Request, Response } from "express";
import { todos_status } from "@prisma/client";

import prisma from "../lib/prisma";

const parseStatus = (status?: string): todos_status | null => {
    if (!status) {
        return null;
    }

    const normalized = status.trim().toLowerCase();

    if (status === todos_status.DONE || normalized === "done" || normalized === "เสร็จแล้ว") {
        return todos_status.DONE;
    }

    if (status === todos_status.PENDING || normalized === "pending" || normalized === "ยังไม่เสร็จ") {
        return todos_status.PENDING;
    }

    return null;
};

// สร้าง Todo ใหม่
export const createTodo = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            status
        }: {
            title?: string;
            description?: string;
            status?: string;
        } = req.body;

        if (!title?.trim() || !description?.trim()) {
            return res.status(400).json({ message: "Title and Description are required" });
        }

        const validStatus = status ? parseStatus(status) : null;

        if (status && !validStatus) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const newTodo = await prisma.todos.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                status: validStatus ?? todos_status.PENDING
            }
        });

        res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todos.findMany({
            orderBy: {
                created_at: "desc"
            }
        });

        res.status(200).json({ todos });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const todoId = Number(req.params.id);

        if (!Number.isInteger(todoId) || todoId <= 0) {
            return res.status(400).json({ message: "Invalid todo id" });
        }

        const { title, description, status }: { title?: string; description?: string; status?: string } = req.body;

        if (title === undefined && description === undefined && status === undefined) {
            return res.status(400).json({ message: "At least one field (title, description, status) is required" });
        }

        const existingTodo = await prisma.todos.findUnique({
            where: { id: todoId }
        });

        if (!existingTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        const data: {
            title?: string;
            description?: string | null;
            status?: todos_status;
        } = {};

        if (title !== undefined) {
            if (typeof title !== "string" || !title.trim()) {
                return res.status(400).json({ message: "Title must be a non-empty string" });
            }
            data.title = title.trim();
        }

        if (description !== undefined) {
            if (typeof description !== "string" || !description.trim()) {
                return res.status(400).json({ message: "Description must be a non-empty string" });
            }
            data.description = description.trim();
        }

        if (status !== undefined) {
            const validStatus = parseStatus(status);

            if (!validStatus) {
                return res.status(400).json({ message: "Invalid status value" });
            }

            data.status = validStatus;
        }

        const updatedTodo = await prisma.todos.update({
            where: { id: todoId },
            data
        });

        res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
