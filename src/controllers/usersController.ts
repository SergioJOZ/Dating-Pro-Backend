import { Request, Response } from "express";
import { db } from "../config/db.ts";
import { UsersTable } from "../schema/users.ts";
import { eq } from "drizzle-orm";

//Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { id, name, role } = req.body;
    const newUser = await db.insert(UsersTable).values({
      id,
      name,
      role,
    });

    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.select().from(UsersTable);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.id, id));

    if (user) {
      res.status(200).json(user[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by role
export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.params;
    if (role == "client") {
      const users = await db
        .select()
        .from(UsersTable)
        .where(eq(UsersTable.role, "client"));

      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "Users not found" });
      }
    } else if (role == "server") {
      const users = await db
        .select()
        .from(UsersTable)
        .where(eq(UsersTable.role, "server"));

      if (users) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "Users not found" });
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { bio } = req.body;
    const profilePic = req.file;

    if (profilePic && !bio) {
      const updatedUser = await db
        .update(UsersTable)
        .set({
          profilePic: profilePic.path,
        })
        .where(eq(UsersTable.id, id));
      res.status(200).json(updatedUser);
    }

    if (profilePic && bio) {
      const updatedUser = await db
        .update(UsersTable)
        .set({
          profilePic: profilePic.path,
          bio,
        })
        .where(eq(UsersTable.id, id));
      res.status(200).json(updatedUser);
    }

    if (!profilePic && bio) {
      const updatedUser = await db
        .update(UsersTable)
        .set({
          bio,
        })
        .where(eq(UsersTable.id, id));
      res.status(200).json(updatedUser);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { balance } = req.body;
    const updatedUser = await db
      .update(UsersTable)
      .set({ balance })
      .where(eq(UsersTable.id, id));
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserPrice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    const updatedUser = await db
      .update(UsersTable)
      .set({ price })
      .where(eq(UsersTable.id, id));
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserPendingContract = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { pendingContract } = req.body;
    const updatedUser = await db
      .update(UsersTable)
      .set({ pendingContract })
      .where(eq(UsersTable.id, id));
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

//Update user direction
export const updateUserDirection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { address } = req.body;
    const updatedUser = await db
      .update(UsersTable)
      .set({ address })
      .where(eq(UsersTable.id, id));
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
